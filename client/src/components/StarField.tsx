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

    const MAX_DEPTH = 1500;
    const SPEED = 2;
    let centerX = 0;
    let centerY = 0;
    let starCount = 150;

    const resetStar = (star: Star, randomZ = true) => {
      star.x = (Math.random() - 0.5) * canvas.width * 2;
      star.y = (Math.random() - 0.5) * canvas.height * 2;
      star.z = randomZ ? Math.random() * MAX_DEPTH : MAX_DEPTH;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      centerX = w / 2;
      centerY = h / 2;

      const area = w * h;
      starCount = Math.min(Math.floor(area / 5000), w < 768 ? 100 : 200);

      starsRef.current = Array.from({ length: starCount }, () => {
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

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.fillRect(0, 0, w, h);

      for (const star of starsRef.current) {
        const prevZ = star.z;
        star.z -= SPEED;

        if (star.z <= 0) { resetStar(star, false); continue; }

        const sx = (star.x / star.z) * 300 + centerX;
        const sy = (star.y / star.z) * 300 + centerY;

        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) {
          resetStar(star, false);
          continue;
        }

        const depthRatio = 1 - star.z / MAX_DEPTH;
        const size = depthRatio * 2.5;
        const alpha = depthRatio * 0.85 + 0.1;

        if (depthRatio > 0.3) {
          const prevSx = (star.x / prevZ) * 300 + centerX;
          const prevSy = (star.y / prevZ) * 300 + centerY;
          ctx.beginPath();
          ctx.moveTo(prevSx, prevSy);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(180,220,255,${alpha * 0.5})`;
          ctx.lineWidth = size * 0.4;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,240,255,${alpha})`;
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
