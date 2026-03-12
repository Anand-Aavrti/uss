"use client";

import { useEffect, useRef } from "react";

export default function MouseTrail() {
  const canvasRef = useRef(null);
  
  // Initialize off-screen so we don't get a "jump" from (0,0)
  // We will update these on the first mouse move.
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const isInitialized = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    
    // Set full screen
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    let animationId;

    const handleMouseMove = (e) => {
      // On first move, snap ring to mouse so it doesn't fly in from corner
      if (!isInitialized.current) {
        ring.current = { x: e.clientX, y: e.clientY };
        isInitialized.current = true;
      }
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", setSize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // CONFIGURATION
      const RING_RADIUS = 20;
      const GAP = 2; // Extra space to ensure visual separation
      const MIN_DIST = RING_RADIUS + GAP; 
      const LER_SPEED = 0.1; // How fast the ring chases

      // 1. Calculate distance from Ring to Mouse
      const dx = mouse.current.x - ring.current.x;
      const dy = mouse.current.y - ring.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // 2. MOVEMENT LOGIC
      // If the ring is far away, it moves closer.
      if (dist > MIN_DIST) {
        // We want the ring to move towards a point that is MIN_DIST away from the mouse
        // (Basically, the "end of the leash")
        
        // Calculate the "Target Position" for the ring
        // It is 'dist' away right now. We want it to be 'MIN_DIST' away.
        // We interpolate the CURRENT position towards the MOUSE position.
        
        ring.current.x += dx * LER_SPEED;
        ring.current.y += dy * LER_SPEED;
      }
      
      // 3. COLLISION / PUSH LOGIC (The Fix)
      // Recalculate distance after the move
      const newDx = mouse.current.x - ring.current.x;
      const newDy = mouse.current.y - ring.current.y;
      const newDist = Math.sqrt(newDx * newDx + newDy * newDy);

      // If the ring somehow got INSIDE the safe zone (closer than radius),
      // we FORCE it back out. This handles the "stop" scenario.
      if (newDist < MIN_DIST && newDist > 0) {
        const angle = Math.atan2(newDy, newDx);
        // Place ring exactly on the perimeter
        ring.current.x = mouse.current.x - Math.cos(angle) * MIN_DIST;
        ring.current.y = mouse.current.y - Math.sin(angle) * MIN_DIST;
      }

      // --- DRAWING ---
      
      // 1. Draw Small White Dot (Attached to Mouse)
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Ring (The Follower)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ring.current.x, ring.current.y, RING_RADIUS, 0, Math.PI * 2);
      ctx.stroke();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}