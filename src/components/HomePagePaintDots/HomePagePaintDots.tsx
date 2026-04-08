'use client';

import * as React from 'react';
import type p5 from 'p5';
import { useTheme } from '@/hooks/useTheme';
import styles from './HomePagePaintDots.module.sass';

type HomePagePaintDotsProps = {
  className?: string;
};

type BlobSpec = {
  x: number;
  y: number;
  radius: number;
  stretchX: number;
  stretchY: number;
  rotation: number;
  noiseSeed: number;
  alpha: number;
};

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace('#', '');
  const safeHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized;

  const red = Number.parseInt(safeHex.slice(0, 2), 16);
  const green = Number.parseInt(safeHex.slice(2, 4), 16);
  const blue = Number.parseInt(safeHex.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export default function HomePagePaintDots({
  className = '',
}: HomePagePaintDotsProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    let sketchInstance: p5 | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let resetScene: (() => void) | null = null;
    let cancelled = false;

    const initializeSketch = async () => {
      const { default: P5 } = await import('p5');

      if (cancelled || !containerRef.current) {
        return;
      }

      const sketch = (p: p5) => {
        let paintLayer: p5.Graphics;
        let blobs: BlobSpec[] = [];
        let paintedCount = 0;
        let canvasWidth = 1;
        let canvasHeight = 1;

        const getPalette = () =>
          theme === 'dark'
            ? {
                background: '#271d18',
                fill: '#9C4D3E',
                wash: '#C77961',
              }
            : {
                background: '#efe2c6',
                fill: '#A14331',
                wash: '#C56F54',
              };

        const shuffle = <T,>(items: T[]) => {
          const nextItems = [...items];

          for (let index = nextItems.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(p.random(index + 1));
            [nextItems[index], nextItems[swapIndex]] = [
              nextItems[swapIndex],
              nextItems[index],
            ];
          }

          return nextItems;
        };

        const buildBlobField = (width: number, height: number) => {
          const minDimension = Math.min(width, height);
          const baseRadius = p.constrain(minDimension * 0.075, 52, 116);
          const stepX = baseRadius * 1.45;
          const stepY = baseRadius * 1.22;
          const candidates: BlobSpec[] = [];

          let rowIndex = 0;

          for (let y = -baseRadius; y <= height + baseRadius; y += stepY) {
            const rowOffset = rowIndex % 2 === 0 ? 0 : stepX * 0.48;

            for (let x = -baseRadius; x <= width + baseRadius; x += stepX) {
              if (p.random() > 0.88) {
                continue;
              }

              candidates.push({
                x: x + rowOffset + p.random(-baseRadius * 0.32, baseRadius * 0.32),
                y: y + p.random(-baseRadius * 0.28, baseRadius * 0.28),
                radius: baseRadius * p.random(0.78, 1.24),
                stretchX: p.random(0.86, 1.16),
                stretchY: p.random(0.86, 1.18),
                rotation: p.random(-0.45, 0.45),
                noiseSeed: p.random(1000),
                alpha:
                  theme === 'dark'
                    ? p.random(0.6, 0.76)
                    : p.random(0.72, 0.88),
              });
            }

            rowIndex += 1;
          }

          return shuffle(candidates);
        };

        const drawBlobShape = (
          target: p5.Graphics,
          blob: BlobSpec,
          fillColor: string,
          radiusMultiplier: number,
          seedOffset: number,
          xOffset: number,
          yOffset: number
        ) => {
          const pointCount = 18;
          const points: Array<{ x: number; y: number }> = [];

          for (let index = 0; index < pointCount; index += 1) {
            const angle = (index / pointCount) * p.TWO_PI;
            const noiseValue = p.noise(
              blob.noiseSeed + Math.cos(angle) * 0.85 + seedOffset,
              blob.noiseSeed * 0.77 + Math.sin(angle) * 0.85 + seedOffset
            );
            const radius =
              blob.radius * radiusMultiplier * p.map(noiseValue, 0, 1, 0.82, 1.18);

            points.push({
              x: Math.cos(angle) * radius * blob.stretchX,
              y: Math.sin(angle) * radius * blob.stretchY,
            });
          }

          target.push();
          target.translate(blob.x + xOffset, blob.y + yOffset);
          target.rotate(blob.rotation);
          target.noStroke();
          target.fill(fillColor);
          target.beginShape();

          for (const point of points) {
            target.vertex(point.x, point.y);
          }

          target.endShape(p.CLOSE);
          target.pop();
        };

        const paintBlob = (target: p5.Graphics, blob: BlobSpec) => {
          const palette = getPalette();

          drawBlobShape(
            target,
            blob,
            hexToRgba(palette.wash, blob.alpha * 0.52),
            1.09,
            11.2,
            -blob.radius * 0.05,
            -blob.radius * 0.04
          );

          drawBlobShape(
            target,
            blob,
            hexToRgba(palette.fill, blob.alpha),
            1,
            2.6,
            0,
            0
          );
        };

        const resetSketch = () => {
          if (!containerRef.current) {
            return;
          }

          canvasWidth = Math.max(1, Math.floor(containerRef.current.clientWidth));
          canvasHeight = Math.max(1, Math.floor(containerRef.current.clientHeight));

          const seed =
            Math.floor(canvasWidth * 13.37 + canvasHeight * 7.19) +
            (theme === 'dark' ? 1000 : 0);

          p.randomSeed(seed);
          p.noiseSeed(seed);
          p.resizeCanvas(canvasWidth, canvasHeight);

          paintLayer = p.createGraphics(canvasWidth, canvasHeight);
          paintLayer.pixelDensity(1);
          paintLayer.background(getPalette().background);

          blobs = buildBlobField(canvasWidth, canvasHeight);
          paintedCount = 0;
          p.loop();
        };

        resetScene = resetSketch;

        p.setup = () => {
          if (!containerRef.current) {
            return;
          }

          const initialWidth = Math.max(1, containerRef.current.clientWidth);
          const initialHeight = Math.max(1, containerRef.current.clientHeight);
          const canvas = p.createCanvas(initialWidth, initialHeight);

          canvas.parent(containerRef.current);
          p.pixelDensity(1);
          p.clear();

          paintLayer = p.createGraphics(initialWidth, initialHeight);
          paintLayer.pixelDensity(1);

          resetSketch();
        };

        p.draw = () => {
          p.clear();

          const batchSize = paintedCount < 24 ? 1 : 2;

          for (
            let batchIndex = 0;
            batchIndex < batchSize && paintedCount < blobs.length;
            batchIndex += 1
          ) {
            paintBlob(paintLayer, blobs[paintedCount]);
            paintedCount += 1;
          }

          p.image(paintLayer, 0, 0);

          if (paintedCount >= blobs.length) {
            p.noLoop();
          }
        };
      };

      sketchInstance = new P5(sketch, containerRef.current);

      resizeObserver = new ResizeObserver(() => {
        resetScene?.();
      });

      resizeObserver.observe(containerRef.current);
    };

    initializeSketch();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      sketchInstance?.remove();
    };
  }, [theme]);

  return (
    <div
      aria-hidden="true"
      ref={containerRef}
      className={`${styles.layer} ${className}`.trim()}
    />
  );
}
