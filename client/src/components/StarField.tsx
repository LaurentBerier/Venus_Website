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

    const STAR_COUNT = 400;
    const MAX_DEPTH = 1500;
    const SPEED = 2.5;

    let centerX = 0;
    let centerY = 0;

    const resetStar = (star: Star, randomZ = true) => {
      star.x = (Math.random() - 0.5) * canvas.width * 2;
      star.y = (Math.random() - 0.5) * canvas.height * 2;
      star.z = randomZ ? Math.random() * MAX_DEPTH : MAX_DEPTH;
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;
    };

    const initStars = () => {
      starsRef.current = Array.from({ length: STAR_COUNT }, () => {
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

      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of starsRef.current) {
        const prevZ = star.z;
        star.z -= SPEED;

        if (star.z <= 0) {
          resetStar(star, false);
          continue;
        }

        const sx = (star.x / star.z) * 300 + centerX;
        const sy = (star.y / star.z) * 300 + centerY;
        const prevSx = (star.x / prevZ) * 300 + centerX;
        const prevSy = (star.y / prevZ) * 300 + centerY;

        if (sx < -50 || sx > canvas.width + 50 || sy < -50 || sy > canvas.height + 50) {
          resetStar(star, false);
          continue;
        }

        const depthRatio = 1 - star.z / MAX_DEPTH;
        const size = depthRatio * 3;
        const alpha = depthRatio * 0.9 + 0.1;

        const trailLength = Math.sqrt((sx - prevSx) ** 2 + (sy - prevSy) ** 2);
        if (trailLength > 0.5 && depthRatio > 0.3) {
          ctx.beginPath();
          ctx.moveTo(prevSx, prevSy);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(180, 220, 255, ${alpha * 0.6})`;
          ctx.lineWidth = size * 0.5;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 240, 255, ${alpha})`;
        ctx.fill();

        if (size > 1.5) {
          const glowRadius = size * 4;
          const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowRadius);
          gradient.addColorStop(0, `rgba(100, 200, 255, ${alpha * 0.4})`);
          gradient.addColorStop(0.5, `rgba(100, 200, 255, ${alpha * 0.1})`);
          gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
          ctx.beginPath();
          ctx.arc(sx, sy, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    resize();
    initStars();

    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    }, { threshold: 0 });
    io.observe(canvas);

    animFrameRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      data-testid="canvas-starfield"
    />
  );
}
