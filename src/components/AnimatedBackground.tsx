'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationId: number;
        let mouse = { x: -1000, y: -1000 };
        let scrollY = 0;
        let isVisible = true;

        // Preallocated typed arrays for particle data (SoA layout for cache efficiency)
        let count = 0;
        let px: Float32Array, py: Float32Array, pvx: Float32Array, pvy: Float32Array;
        let psize: Float32Array, popacity: Float32Array, pbaseOpacity: Float32Array;
        let ppulseSpeed: Float32Array, ppulseOffset: Float32Array, player: Float32Array;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const init = () => {
            resize();
            const w = window.innerWidth;
            const h = window.innerHeight;
            count = Math.min(Math.floor((w * h) / 14000), 100);

            px = new Float32Array(count);
            py = new Float32Array(count);
            pvx = new Float32Array(count);
            pvy = new Float32Array(count);
            psize = new Float32Array(count);
            popacity = new Float32Array(count);
            pbaseOpacity = new Float32Array(count);
            ppulseSpeed = new Float32Array(count);
            ppulseOffset = new Float32Array(count);
            player = new Float32Array(count);

            for (let i = 0; i < count; i++) {
                px[i] = Math.random() * w;
                py[i] = Math.random() * h;
                pvx[i] = (Math.random() - 0.5) * 0.3;
                pvy[i] = (Math.random() - 0.5) * 0.3;
                psize[i] = Math.random() * 2.5 + 0.5;
                pbaseOpacity[i] = Math.random() * 0.4 + 0.1;
                popacity[i] = pbaseOpacity[i];
                ppulseSpeed[i] = Math.random() * 0.02 + 0.005;
                ppulseOffset[i] = Math.random() * Math.PI * 2;
                player[i] = Math.random() * 0.5 + 0.5;
            }
        };

        let time = 0;
        // Reusable drawY cache to avoid redundant computation
        const drawYCache = new Float32Array(200);

        const animate = () => {
            if (!isVisible) {
                animationId = requestAnimationFrame(animate);
                return;
            }
            time++;
            const w = window.innerWidth;
            const h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);

            // Update particles & cache drawY
            for (let i = 0; i < count; i++) {
                px[i] += pvx[i];
                py[i] += pvy[i];

                popacity[i] = pbaseOpacity[i] + Math.sin(time * ppulseSpeed[i] + ppulseOffset[i]) * 0.15;

                // Mouse interaction — simple repel
                const dx = px[i] - mouse.x;
                const dy = py[i] - mouse.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < 25600) { // 160^2
                    const dist = Math.sqrt(distSq);
                    if (dist > 0.1) {
                        const force = (160 - dist) / 160 * 0.3;
                        pvx[i] += (dx / dist) * force;
                        pvy[i] += (dy / dist) * force;
                    }
                }

                pvx[i] *= 0.99;
                pvy[i] *= 0.99;

                // Wrap edges
                if (px[i] < -10) px[i] = w + 10;
                else if (px[i] > w + 10) px[i] = -10;
                if (py[i] < -10) py[i] = h + 10;
                else if (py[i] > h + 10) py[i] = -10;

                // Cache parallax Y
                drawYCache[i] = py[i] + scrollY * (1 - player[i]) * 0.15;
            }

            // Batch draw particles — single path per opacity bucket
            ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
            ctx.beginPath();
            for (let i = 0; i < count; i++) {
                const r = psize[i];
                ctx.moveTo(px[i] + r, drawYCache[i]);
                ctx.arc(px[i], drawYCache[i], r, 0, 6.2832);
            }
            ctx.fill();

            // Draw connections — skip sqrt until confirmed close
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
            ctx.lineWidth = 0.5;
            const connDistSq = 18225; // 135^2
            ctx.beginPath();
            for (let i = 0; i < count; i++) {
                const xi = px[i];
                const yi = drawYCache[i];
                for (let j = i + 1; j < count; j++) {
                    const ddx = xi - px[j];
                    const ddy = yi - drawYCache[j];
                    const dSq = ddx * ddx + ddy * ddy;
                    if (dSq < connDistSq) {
                        ctx.moveTo(xi, yi);
                        ctx.lineTo(px[j], drawYCache[j]);
                    }
                }
            }
            ctx.stroke();

            animationId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const handleScroll = () => {
            scrollY = window.scrollY;
        };

        const handleVisibility = () => {
            isVisible = document.visibilityState === 'visible';
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('visibilitychange', handleVisibility);

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="animated-bg-canvas"
            aria-hidden="true"
        />
    );
}
