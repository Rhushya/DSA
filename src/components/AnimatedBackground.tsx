'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let particles: Particle[] = [];
        let mouse = { x: -1000, y: -1000 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            opacity: number;
            baseOpacity: number;
            pulseSpeed: number;
            pulseOffset: number;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 2 + 0.5;
                this.baseOpacity = Math.random() * 0.4 + 0.1;
                this.opacity = this.baseOpacity;
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
                this.pulseOffset = Math.random() * Math.PI * 2;
            }

            update(w: number, h: number, time: number) {
                this.x += this.vx;
                this.y += this.vy;

                // Pulse opacity
                this.opacity = this.baseOpacity + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.15;

                // Mouse interaction — gentle repel
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150 * 0.3;
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                }

                // Dampen velocity
                this.vx *= 0.99;
                this.vy *= 0.99;

                // Wrap around edges
                if (this.x < -10) this.x = w + 10;
                if (this.x > w + 10) this.x = -10;
                if (this.y < -10) this.y = h + 10;
                if (this.y > h + 10) this.y = -10;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
                ctx.fill();
            }
        }

        const init = () => {
            resize();
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
            particles = Array.from({ length: count }, () => new Particle(canvas.width, canvas.height));
        };

        const drawConnections = (ctx: CanvasRenderingContext2D) => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        const opacity = (1 - dist / 120) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };

        let time = 0;
        const animate = () => {
            if (!ctx || !canvas) return;
            time++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update(canvas.width, canvas.height, time);
                p.draw(ctx);
            });

            drawConnections(ctx);
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

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        init();
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
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
