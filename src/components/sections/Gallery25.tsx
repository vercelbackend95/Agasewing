"use client";

import { motion } from "framer-motion";
import React from "react";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";

interface Gallery25Props {
  className?: string;
}

const Gallery25 = ({ className }: Gallery25Props) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState<number | null>(null);
  const touchStartXRef = React.useRef<number | null>(null);

  const column1Images = [
    {
      src: "/pictures/5.webp",
      alt: "Pattern cutting on colorful fabric",
      height: "23rem",
    },
    {
      src: "/pictures/9.webp",
      alt: "White lace wedding dress in progress",
      height: "28rem",
    },
    {
      src: "/pictures/7.webp",
      alt: "Tailored red leather skirt on a mannequin",
      height: "12rem",
    },
  ];

  const column2Images = [
    {
      src: "/pictures/2.webp",
      alt: "Tailored jacket pocket detail",
      height: "13rem",
    },
    {
      src: "/pictures/8.webp",
      alt: "Handmade fascinator hat",
      height: "32rem",
    },
    {
      src: "/pictures/10.webp",
      alt: "Embroidered white floral gown details",
      height: "18rem",
    },
  ];

  const column3Images = [
    {
      src: "/pictures/4.webp",
      alt: "Pink couture dress in the studio",
      height: "32rem",
    },
    {
      src: "/pictures/6.webp",
      alt: "Custom garments on a rack",
      height: "32rem",
    },
  ];

  const column4Images = [
    {
      src: "/pictures/11.webp",
      alt: "Vintage collage with buttons and butterflies",
      height: "13rem",
    },
    {
      src: "/pictures/1.webp",
      alt: "Dress form with floral custom dress",
      height: "22.5rem",
    },
    {
      src: "/pictures/3.webp",
      alt: "Corset-inspired bespoke dress",
      height: "22rem",
    },
  ];

  const allImages = [...column1Images, ...column2Images, ...column3Images, ...column4Images];

  const openLightbox = (src: string) => {
    setActiveImageIndex(allImages.findIndex((image) => image.src === src));
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const showPreviousImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + allImages.length) % allImages.length);
  };

  const showNextImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % allImages.length);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX;
    if (typeof touchEndX !== "number") return;

    const deltaX = touchEndX - touchStartXRef.current;
    const swipeThreshold = 40;

    if (Math.abs(deltaX) < swipeThreshold) return;

    if (deltaX < 0) {
      showNextImage();
      return;
    }

    showPreviousImage();
  };

  return (
    <section className={cn("py-32", className)} id="gallery">
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="grid gap-4">
            {column1Images.map((image, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <img
                  className="h-full w-full cursor-pointer rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                  onClick={() => openLightbox(image.src)}
                />
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4">
            {column2Images.map((image, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: -50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <img
                  className="h-full w-full cursor-pointer rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                  onClick={() => openLightbox(image.src)}
                />
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4">
            {column3Images.map((image, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <img
                  className="h-full w-full cursor-pointer rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                  onClick={() => openLightbox(image.src)}
                />
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4">
            {column4Images.map((image, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: -50,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                key={index}
                className="w-full overflow-hidden rounded-2xl bg-muted"
                style={{ height: image.height }}
              >
                <img
                  className="h-full w-full cursor-pointer rounded-2xl object-cover"
                  src={image.src}
                  alt={image.alt}
                  onClick={() => openLightbox(image.src)}
                />
              </motion.div>
            ))}
            <div className="h-17 w-full rounded-2xl bg-muted">
              <InteractiveHoverButton
                type="button"
                onClick={() => window.open("https://wa.me/447514776088", "_blank", "noopener,noreferrer")}
                mobileActive
                className="h-full w-full rounded-2xl border-0 bg-transparent text-sm"
              >
                Message
              </InteractiveHoverButton>
            </div>
          </div>
        </div>

        {activeImageIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={closeLightbox}
          >
            <div
              className="relative flex items-center gap-3"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <button
                type="button"
                aria-label="Previous image"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/35 px-3 py-2 text-white md:static md:translate-y-0 md:bg-white/20"
                onClick={showPreviousImage}
              >
                ←
              </button>

              <img
                className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
                src={allImages[activeImageIndex].src}
                alt={allImages[activeImageIndex].alt}
              />

              <button
                type="button"
                aria-label="Next image"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/35 px-3 py-2 text-white md:static md:translate-y-0 md:bg-white/20"
                onClick={showNextImage}
              >
                →
              </button>
            </div>

            <button
              type="button"
              aria-label="Close lightbox"
              className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-2 text-white"
              onClick={closeLightbox}
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export { Gallery25 };
