'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function PFive() {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sketchRef.current) return;

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(400, 400);
        p.colorMode(p.HSB);

        // Set angle mode so that atan2() returns angles in degrees
        p.angleMode(p.DEGREES);
      };

      p.draw = () => {
        p.background(0);

        // Draw left eye
        const leftX = 150;
        const leftY = 200;

        // Calculate angle between left eye and mouse
        const leftAngle = p.atan2(p.mouseY - leftY, p.mouseX - leftX);

        p.push();
        p.translate(leftX, leftY);
        p.fill(255);
        p.ellipse(0, 0, 50, 50);
        p.rotate(leftAngle);
        p.fill(0);
        p.ellipse(12.5, 0, 25, 25);
        p.pop();

        // Draw right eye
        const rightX = 250;
        const rightY = 200;

        // Calculate angle between right eye and mouse
        const rightAngle = p.atan2(p.mouseY - rightY, p.mouseX - rightX);

        p.push();
        p.translate(rightX, rightY);
        p.fill(255);
        p.ellipse(0, 0, 50, 50);
        p.rotate(rightAngle);
        p.fill(0);
        p.ellipse(12.5, 0, 25, 25);
        p.pop();

        // Add some additional visual elements for context
        p.fill(120, 100, 100, 150);
        p.noStroke();
        p.ellipse(200, 100, 80, 40); // Forehead

        p.fill(30, 100, 100, 150);
        p.ellipse(200, 280, 120, 60); // Mouth area

        // Add crosshair at mouse position
        p.stroke(60, 100, 100);
        p.strokeWeight(2);
        p.line(p.mouseX - 10, p.mouseY, p.mouseX + 10, p.mouseY);
        p.line(p.mouseX, p.mouseY - 10, p.mouseX, p.mouseY + 10);
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div
      style={{
        border: '3px solid #333',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}
    >
      <div ref={sketchRef} />
    </div>
  );
}
