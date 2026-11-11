import { useEffect, useRef } from 'react';
import { useDelight } from '../context/DelightContext';
import { fitCanvas, prefersReducedMotion } from '../lib/motion';

interface Bit {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  vr: number;
  w: number;
  h: number;
  c: string;
  life: number;
}

const COLORS = ['#5C24FF', '#9A6AFB', '#C9B8FF', '#A13CF5', '#FFFFFF', '#7B4DFF'];

/** Full-screen confetti layer in the brand purples. Driven through the Delight context. */
export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { registerConfetti } = useDelight();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx = fitCanvas(canvas, window.innerWidth, window.innerHeight);
    let W = window.innerWidth;
    let H = window.innerHeight;
    let bits: Bit[] = [];
    let running = false;
    let raf = 0;
    const reduce = prefersReducedMotion();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      ctx = fitCanvas(canvas, W, H);
    };
    window.addEventListener('resize', onResize);

    const add = (x: number, y: number, vx: number, vy: number) =>
      bits.push({
        x, y, vx, vy,
        r: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        w: 4 + Math.random() * 5,
        h: 6 + Math.random() * 7,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1,
      });

    const loop = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (const b of bits) {
        b.vy += 0.12;
        b.vx *= 0.99;
        b.x += b.vx;
        b.y += b.vy;
        b.r += b.vr;
        if (b.y > H * 0.6) b.life -= 0.012;
        ctx.save();
        ctx.globalAlpha = Math.max(0, b.life);
        ctx.translate(b.x, b.y);
        ctx.rotate(b.r);
        ctx.fillStyle = b.c;
        ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h * Math.abs(Math.cos(b.r * 2)));
        ctx.restore();
      }
      bits = bits.filter((b) => b.life > 0 && b.y < H + 40);
      if (bits.length) raf = requestAnimationFrame(loop);
      else {
        running = false;
        ctx.clearRect(0, 0, W, H);
      }
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    registerConfetti({
      burst(x, y, count) {
        if (reduce) return;
        for (let i = 0; i < count; i++) {
          const a = Math.random() * Math.PI * 2;
          const s = 2 + Math.random() * 5;
          add(x, y, Math.cos(a) * s, Math.sin(a) * s - 3);
        }
        start();
      },
      rain(count) {
        if (reduce) return;
        for (let i = 0; i < count; i++) add(Math.random() * W, -20 - Math.random() * H * 0.4, (Math.random() - 0.5) * 2, 2 + Math.random() * 3);
        start();
      },
    });

    return () => {
      registerConfetti(null);
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [registerConfetti]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] h-full w-full" />;
}
