import React from "react";

/**
 * PlaceFor3dPhotoFrame
 * Fixed-size responsive photo frame container with smooth image crossfades.
 */
const PlaceFor3dPhotoFrame = ({
  services = [],
  activeIndex = 0,
  image = "",
  alt = "Service Frame",
  className = "",
}) => {
  return (
    <div className={`relative w-full max-w-[280px] sm:max-w-[310px] h-full min-h-0 mx-auto rounded-[24px] sm:rounded-[28px] overflow-hidden bg-neutral-900 border border-neutral-300 shadow-lg shadow-neutral-900/5 ${className}`}>
      {services.length > 0 ? (
        services.map((service, idx) => (
          <img
            key={service.id}
            src={service.image}
            alt={service.name}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              idx === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ transitionProperty: "opacity, transform" }}
            loading="lazy"
          />
        ))
      ) : (
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
};

export default PlaceFor3dPhotoFrame;