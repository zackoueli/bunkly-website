"use client";

import { useRef, useState, useCallback } from "react";

type Photo = { url: string; caption: string };

type Polaroid = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  photo: Photo;
  createdAt: number;
};

const ROTATIONS = [-8, 5, -3, 7, -6, 4, -5, 8];
const MAX_TRAIL = 8;
const MIN_DISTANCE = 60;

const photos: Photo[] = [
  { url: "https://picsum.photos/seed/airbnb-pool-villa/320/280", caption: "Villa Les Palmiers, Juan-les-Pins" },
  { url: "https://picsum.photos/seed/gite-mountain/320/280", caption: "Le Chalet des Cimes, Megeve" },
  { url: "https://picsum.photos/seed/beach-house-sunset/320/280", caption: "Maison de plage, Biarritz" },
  { url: "https://picsum.photos/seed/provence-mas/320/280", caption: "Mas provencal, Luberon" },
  { url: "https://picsum.photos/seed/bretagne-cottage/320/280", caption: "Cottage breton, Crozon" },
  { url: "https://picsum.photos/seed/camping-nature/320/280", caption: "Glamping nature, Dordogne" },
  { url: "https://picsum.photos/seed/apartment-paris/320/280", caption: "Appartement haussmannien, Paris" },
  { url: "https://picsum.photos/seed/lake-house/320/280", caption: "Chalet lacustre, Annecy" },
];

let idCounter = 0;

export function PhotosSouvenirs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const photoIndexRef = useRef(0);
  const [polaroids, setPolaroids] = useState<Polaroid[]>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const last = lastPosRef.current;
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      if (Math.sqrt(dx * dx + dy * dy) < MIN_DISTANCE) return;
    }

    lastPosRef.current = { x, y };

    const photo = photos[photoIndexRef.current % photos.length];
    photoIndexRef.current++;

    const rotation = ROTATIONS[idCounter % ROTATIONS.length];

    const newPolaroid: Polaroid = {
      id: idCounter++,
      x,
      y,
      rotation,
      photo,
      createdAt: Date.now(),
    };

    setPolaroids((prev) => {
      const next = [...prev, newPolaroid];
      return next.slice(-MAX_TRAIL);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    lastPosRef.current = null;
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden select-none"
      style={{ height: "650px", cursor: "none", backgroundColor: "#faf8f4" }}
    >
      {/* Header */}
      <div className="relative z-10 px-10 pt-14 flex items-start gap-6">
        <div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 leading-none">
            PHOTOS / SOUVENIRS
          </h2>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            Deplacez votre curseur dans cette zone
          </p>
        </div>
        <p
          className="text-[10px] font-bold uppercase tracking-[0.3em] mt-2 leading-relaxed"
          style={{ color: "#ef4444" }}
        >
          BOUGEZ<br />LA SOURIS ↓
        </p>
      </div>

      {/* Polaroids */}
      {polaroids.map((p, i) => {
        const age = polaroids.length - 1 - i;
        const opacity = 1 - (age / MAX_TRAIL) * 0.75;
        const scale = 1 - (age / MAX_TRAIL) * 0.2;

        return (
          <div
            key={p.id}
            className="absolute pointer-events-none"
            style={{
              left: p.x,
              top: p.y,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${scale})`,
              opacity,
              transition: "opacity 0.3s ease",
              zIndex: i + 1,
            }}
          >
            <div
              className="bg-white shadow-2xl"
              style={{
                width: "320px",
                padding: "16px 16px 64px 16px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              {/* Photo */}
              <div
                className="overflow-hidden"
                style={{ height: "280px", backgroundColor: "#E8D9C4" }}
              >
                {p.photo.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.photo.url}
                    alt={p.photo.caption}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    🍕
                  </div>
                )}
              </div>

              {/* Caption */}
              <p
                className="mt-3 text-center text-zinc-600 text-sm"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                {p.photo.caption}
              </p>
            </div>
          </div>
        );
      })}

      {/* Message quand vide */}
      {polaroids.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-zinc-300 text-lg font-medium tracking-widest uppercase">
            Deplacez votre souris ici
          </p>
        </div>
      )}
    </section>
  );
}
