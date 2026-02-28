import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const MAX_DEPTH = 1200;
    const SPEED = 3;
    let centerX = 0;
    let centerY = 0;
    let w = 0;
    let h = 0;

    const resetStar = (star: Star, randomZ = true) => {
      star.x = (Math.random() - 0.5) * w * 2;
      star.y = (Math.random() - 0.5) * h * 2;
      star.z = randomZ ? Math.random() * MAX_DEPTH : MAX_DEPTH;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      centerX = w / 2;
      centerY = h / 2;

      const count = w < 768 ? 180 : 350;
      starsRef.current = Array.from({ length: count }, () => {
        const star: Star = { x: 0, y: 0, z: 0 };
        resetStar(star, true);
        return star;
      });
    };

    const draw = () => {
      if (!visibleRef.current) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      ctx.fillRect(0, 0, w, h);

      for (const star of starsRef.current) {
        const prevZ = star.z;
        star.z -= SPEED;

        if (star.z <= 0) { resetStar(star, false); continue; }

        const sx = (star.x / star.z) * 300 + centerX;
        const sy = (star.y / star.z) * 300 + centerY;

        if (sx < -30 || sx > w + 30 || sy < -30 || sy > h + 30) {
          resetStar(star, false);
          continue;
        }

        const depthRatio = 1 - star.z / MAX_DEPTH;
        const size = depthRatio * 3.5 + 0.3;
        const alpha = Math.min(depthRatio * 1.1 + 0.15, 1);

        if (depthRatio > 0.2) {
          const prevSx = (star.x / prevZ) * 300 + centerX;
          const prevSy = (star.y / prevZ) * 300 + centerY;
          ctx.beginPath();
          ctx.moveTo(prevSx, prevSy);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(200,230,255,${alpha * 0.7})`;
          ctx.lineWidth = size * 0.6;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230,245,255,${alpha})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    animFrameRef.current = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      io.disconnect();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ width: '100%', height: '100%' }}
      data-testid="canvas-starfield"
    />
  );
}
