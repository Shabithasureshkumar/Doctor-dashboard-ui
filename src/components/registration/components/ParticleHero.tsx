import { useEffect, useRef } from 'react';
import { useDelight } from '../context/DelightContext';
import { SHAPE_PATHS, type Shape } from '../data/content';
import { fitCanvas, prefersReducedMotion } from '../lib/motion';
import logoWhite from '../assets/logo-white.png';
import logoIcon from '../assets/logo-icon.png';
import { Icon } from './Icon';

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  z: number;
  size: number;
  alpha: number;
  twinkle: number;
}
type Point = [number, number];

interface Props {
  shape: Shape;
  kicker: string;
  title: string;
  text: string;
  /** Number of the 5 progress bars to fill. */
  filled: number;
  /** Shows a check icon in the kicker chip instead of the blinking dot. */
  complete: boolean;
  /** Changes per screen so the headline animates in. */
  textKey: number;
}

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/** Shuffles points and maps alpha pixels of a drawn shape into normalised [-0.5, 0.5] coordinates. */
function samplePixels(draw: (c: CanvasRenderingContext2D, size: number) => void): Point[] {
  const S = 200;
  const off = document.createElement('canvas');
  off.width = off.height = S;
  const c = off.getContext('2d');
  if (!c) return [];
  draw(c, S);
  const data = c.getImageData(0, 0, S, S).data;
  const pts: Point[] = [];
  for (let y = 0; y < S; y += 2) for (let x = 0; x < S; x += 2) if (data[(y * S + x) * 4 + 3] > 130) pts.push([x / S - 0.5, y / S - 0.5]);
  for (let i = pts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pts[i], pts[j]] = [pts[j], pts[i]];
  }
  return pts;
}

/** Left purple panel: ~950 glowing particles that morph into a new shape on every step. */
export default function ParticleHero({ shape, kicker, title, text, filled, complete, textKey }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef<{ setShape: (s: Shape) => void } | null>(null);
  const { registerPoke } = useDelight();

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    const reduce = prefersReducedMotion();
    const N = window.innerWidth < 700 ? 520 : 950;
    let W = 0;
    let H = 0;
    let ctx: CanvasRenderingContext2D | null = null;
    let current: Shape = 'sphere';
    let rot = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const cache: Partial<Record<Shape, Point[]>> = {};
    const P: Particle[] = Array.from({ length: N }, () => ({
      x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0, z: 0,
      size: Math.random() * 1.4 + 0.7,
      alpha: Math.random() * 0.5 + 0.5,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const cx = () => W / 2;
    const cy = () => H * (W < 960 ? 0.42 : 0.38);
    const scale = () => Math.min(W, H) * (W < 700 ? 0.28 : 0.34);

    const samplePaths = (paths: string[]) =>
      samplePixels((c, S) => {
        c.scale(S / 24, S / 24);
        c.lineWidth = 1.25;
        c.lineCap = 'round';
        c.lineJoin = 'round';
        c.strokeStyle = '#000';
        paths.forEach((d) => c.stroke(new Path2D(d)));
      });

    const setTargets = (name: Shape, jump: boolean) => {
      current = name;
      if (name === 'sphere') return;
      const key: Shape = name === 'logo' && !cache.logo ? 'check' : name;
      const pts = cache[key] ?? (cache[key] = samplePaths(SHAPE_PATHS[key] ?? []));
      if (!pts.length) return;
      const s = scale() * 2.1;
      P.forEach((p, i) => {
        const q = pts[i % pts.length];
        const jitter = i >= pts.length ? 6 : 1.2;
        p.tx = cx() + q[0] * s + (Math.random() - 0.5) * jitter;
        p.ty = cy() + q[1] * s + (Math.random() - 0.5) * jitter;
        if (jump) {
          p.x = p.tx;
          p.y = p.ty;
        } else {
          p.vx += (Math.random() - 0.5) * 14;
          p.vy += (Math.random() - 0.5) * 14;
        }
      });
    };

    const sphereTargets = (t: number) => {
      const R = scale();
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const th = GOLDEN * i + t;
        const x = Math.cos(th) * r;
        const z = Math.sin(th) * r;
        const tilt = 0.35;
        P[i].tx = cx() + x * R;
        P[i].ty = cy() + (y * Math.cos(tilt) - z * Math.sin(tilt)) * R;
        P[i].z = y * Math.sin(tilt) + z * Math.cos(tilt);
      }
    };

    const resize = () => {
      const r = hero.getBoundingClientRect();
      const first = W === 0;
      W = r.width;
      H = r.height;
      ctx = fitCanvas(canvas, W, H);
      if (first) P.forEach((p) => { p.x = Math.random() * W; p.y = Math.random() * H; });
      setTargets(current, !first);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(hero);
    resize();

    // The Mednevo logo icon becomes the particle shape on the final screen.
    const img = new Image();
    img.onload = () => {
      cache.logo = samplePixels((c, S) => {
        const k = Math.min(S / img.width, S / img.height);
        c.drawImage(img, (S - img.width * k) / 2, (S - img.height * k) / 2, img.width * k, img.height * k);
      });
      if (current === 'logo') setTargets('logo', false);
    };
    img.src = logoIcon;

    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);

    const frame = (t: number) => {
      rot += reduce ? 0 : 0.0035;
      if (current === 'sphere') sphereTargets(rot);
      if (ctx) {
        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';
        const breathe = 1 + Math.sin(t / 900) * 0.012;
        const sphere = current === 'sphere';
        for (const p of P) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000) {
            const f = ((9000 - d2) / 9000) * 2.2;
            const d = Math.sqrt(d2) || 1;
            p.vx += (dx / d) * f;
            p.vy += (dy / d) * f;
          }
          const gx = cx() + (p.tx - cx()) * breathe;
          const gy = cy() + (p.ty - cy()) * breathe;
          p.vx = (p.vx + (gx - p.x) * 0.06) * 0.78;
          p.vy = (p.vy + (gy - p.y) * 0.06) * 0.78;
          p.x += p.vx;
          p.y += p.vy;
          const depth = sphere ? (p.z + 1) / 2 : 1;
          const tw = 0.75 + Math.sin(t / 500 + p.twinkle) * 0.25;
          ctx.globalAlpha = Math.max(0.12, p.alpha * tw * (sphere ? 0.35 + depth * 0.65 : 1));
          ctx.fillStyle = depth > 0.55 || !sphere ? '#FFFFFF' : '#D9C8FF';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (sphere ? 0.6 + depth * 0.6 : 1), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    engine.current = { setShape: (s) => setTargets(s, false) };
    registerPoke((amount) => {
      for (let i = 0; i < amount; i++) {
        const p = P[Math.floor(Math.random() * P.length)];
        p.vx += (Math.random() - 0.5) * 7;
        p.vy += (Math.random() - 0.5) * 7;
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
      registerPoke(null);
      engine.current = null;
    };
  }, [registerPoke]);

  useEffect(() => {
    engine.current?.setShape(shape);
  }, [shape]);

  return (
    <aside
      ref={heroRef}
      className="hero-bg relative flex min-h-[340px] flex-col overflow-hidden rounded-[24px] border border-white/35 p-[22px] text-white lg:sticky lg:top-12 lg:h-[calc(100vh-96px)] lg:min-h-[640px] lg:self-start lg:rounded-[30px] lg:px-10 lg:pt-9 lg:pb-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute top-[46%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.16),transparent_65%)]" />
      <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0" />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />

      <img src={logoWhite} alt="Mednevo" width={150} height={49} className="relative z-[2] h-[46px] w-auto self-start animate-text-in" />

      <div className="relative z-[2] mt-auto max-w-[460px]">
        <span className="inline-flex h-[30px] items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 text-xs font-semibold tracking-[0.04em]">
          {complete ? <Icon name="check" size={13} strokeWidth={3} /> : <i className="h-1.5 w-1.5 animate-blink rounded-full bg-white" />}
          {kicker}
        </span>
        <h2 key={`t${textKey}`} className="mt-4 mb-3 animate-text-in font-display text-[28px] leading-[1.08] font-extrabold tracking-[-0.03em] lg:text-[clamp(30px,3.4vw,46px)]">
          {title}
        </h2>
        <p key={`p${textKey}`} className="m-0 animate-text-in text-base leading-relaxed text-white/85 [animation-delay:80ms]">
          {text}
        </p>
        <div aria-hidden="true" className="mt-7 flex gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} className="relative h-1 flex-1 overflow-hidden rounded bg-white/20">
              <span className={`absolute inset-0 origin-left bg-white transition-transform duration-700 ease-expo ${i < filled ? 'scale-x-100' : 'scale-x-0'}`} />
            </i>
          ))}
        </div>
      </div>
    </aside>
  );
}
