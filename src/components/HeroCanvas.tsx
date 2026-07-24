"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fundo de "luz viva" do hero — um shader fullscreen (Three.js) que flui
 * suavemente e reage ao cursor, evocando a luz da Zona da Mata.
 *
 * Guardas (o site roda em evento, celular, Wi-Fi compartilhado):
 * - `prefers-reduced-motion` e Save-Data → não monta (o gradiente CSS atrás
 *   já é o fallback bonito).
 * - Three.js entra por import dinâmico, fora do bundle inicial e do LCP.
 * - Pausa quando o hero sai da viewport ou a aba fica oculta.
 * - devicePixelRatio limitado; render encerra e libera a GPU ao desmontar.
 */
export default function HeroCanvas() {
  const holder = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;

    // 1) Respeita quem prefere menos movimento ou economia de dados.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as { connection?: { saveData?: boolean } })
      .connection?.saveData;
    if (reduce || saveData) return;

    let disposed = false;
    let cleanup = () => {};

    // 2) Three.js só depois da montagem — code-split, não pesa no LCP.
    import("three")
      .then((THREE) => {
        if (disposed || !el) return;

        let renderer: import("three").WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
          });
        } catch {
          return; // sem WebGL → segue o gradiente CSS
        }

        const scene = new THREE.Scene();
        const camera = new THREE.Camera();

        const uniforms = {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.55) },
          uRes: { value: new THREE.Vector2(1, 1) },
        };

        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader: /* glsl */ `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = vec4(position.xy, 0.0, 1.0);
            }
          `,
          fragmentShader: /* glsl */ `
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;
            uniform vec2 uMouse;
            uniform vec2 uRes;

            float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
            float noise(vec2 p){
              vec2 i = floor(p); vec2 f = fract(p);
              vec2 u = f * f * (3.0 - 2.0 * f);
              return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                         mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
            }
            float fbm(vec2 p){
              float v = 0.0; float a = 0.5;
              for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
              return v;
            }

            void main(){
              vec2 uv = vUv;
              float aspect = uRes.x / max(uRes.y, 1.0);
              vec2 auv = vec2(uv.x * aspect, uv.y);

              // Base: verde profundo da marca, do topo (mais claro) à base (mais escuro).
              vec3 top = vec3(0.082, 0.216, 0.153);   // #153727
              vec3 bot = vec3(0.039, 0.078, 0.058);   // ~#0A1410
              vec3 base = mix(top, bot, smoothstep(0.0, 1.0, uv.y));

              // Luz que flui (aurora) — bandas orgânicas de verde mais claro.
              float t = uTime * 0.045;
              vec2 q = auv * 2.2;
              float n  = fbm(q + vec2(t, -t * 0.6));
              float n2 = fbm(q * 1.7 + vec2(-t * 0.8, t * 0.5));
              float band = smoothstep(0.32, 0.8, n) * (0.35 + 0.65 * n2);
              vec3 glow = vec3(0.153, 0.451, 0.325);  // verde-folha
              vec3 col = base + glow * band * 0.55;

              // Facho quente seguindo o cursor — a "luz" que o visitante move.
              vec2 m = vec2(uMouse.x * aspect, uMouse.y);
              float d = distance(auv, m);
              float warm = exp(-d * d * 3.2);
              col += vec3(1.0, 0.42, 0.21) * warm * 0.32;  // brand-orange

              // Vinheta suave para concentrar o olhar.
              float vig = smoothstep(1.25, 0.25, distance(uv, vec2(0.5, 0.42)));
              col *= mix(0.72, 1.06, vig);

              gl_FragColor = vec4(col, 1.0);
            }
          `,
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const quad = new THREE.Mesh(geometry, material);
        scene.add(quad);

        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        renderer.domElement.style.display = "block";
        el.appendChild(renderer.domElement);
        setReady(true);

        const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        renderer.setPixelRatio(dpr);

        const resize = () => {
          const w = el.clientWidth || 1;
          const h = el.clientHeight || 1;
          renderer.setSize(w, h, false);
          uniforms.uRes.value.set(w, h);
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(el);

        // Cursor (com y invertido p/ bater com o UV) e suavização por lerp.
        const target = new THREE.Vector2(0.5, 0.55);
        const onMove = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
        };
        window.addEventListener("pointermove", onMove, { passive: true });

        // Pausa fora da tela e com aba oculta.
        let onScreen = true;
        const io = new IntersectionObserver(
          ([entry]) => {
            onScreen = entry.isIntersecting;
            if (onScreen) loop();
          },
          { threshold: 0.01 }
        );
        io.observe(el);

        let raf = 0;
        const clock = new THREE.Clock();
        const render = () => {
          uniforms.uTime.value += clock.getDelta();
          uniforms.uMouse.value.lerp(target, 0.05);
          renderer.render(scene, camera);
        };
        const loop = () => {
          cancelAnimationFrame(raf);
          const tick = () => {
            if (disposed || !onScreen || document.hidden) return;
            render();
            raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        };
        const onVis = () => {
          if (!document.hidden && onScreen) loop();
        };
        document.addEventListener("visibilitychange", onVis);
        loop();

        cleanup = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("pointermove", onMove);
          document.removeEventListener("visibilitychange", onVis);
          ro.disconnect();
          io.disconnect();
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {});

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={holder}
      aria-hidden="true"
      className={`absolute inset-0 transition-opacity duration-1000 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
