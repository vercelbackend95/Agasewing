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

  const column1Images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw1.jpeg",
      alt: "Gallery Image 1",
      height: "23rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw2.jpeg",
      alt: "Gallery Image 2",
      height: "28rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw3.jpeg",
      alt: "Gallery Image 3",
      height: "12rem",
    },
  ];

  const column2Images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw4.jpeg",
      alt: "Gallery Image 4",
      height: "13rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw5.jpeg",
      alt: "Gallery Image 5",
      height: "32rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw6.jpeg",
      alt: "Gallery Image 6",
      height: "18rem",
    },
  ];

  const column3Images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw7.jpeg",
      alt: "Gallery Image 7",
      height: "32rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw8.jpeg",
      alt: "Gallery Image 8",
      height: "32rem",
    },
  ];

  const column4Images = [
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw9.jpeg",
      alt: "Gallery Image 9",
      height: "13rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw10.jpeg",
      alt: "Gallery Image 10",
      height: "22.5rem",
    },
    {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw11.jpeg",
      alt: "Gallery Image 11",
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
            <button
              type="button"
              aria-label="Previous image"
              className="absolute left-4 rounded-full bg-white/20 px-3 py-2 text-white"
              onClick={(event) => {
                event.stopPropagation();
                showPreviousImage();
              }}
            >
              ←
            </button>

            <img
              className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
              src={allImages[activeImageIndex].src}
              alt={allImages[activeImageIndex].alt}
              onClick={(event) => event.stopPropagation()}
            />

            <button
              type="button"
              aria-label="Next image"
              className="absolute right-4 rounded-full bg-white/20 px-3 py-2 text-white"
              onClick={(event) => {
                event.stopPropagation();
                showNextImage();
              }}
            >
              →
            </button>

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
