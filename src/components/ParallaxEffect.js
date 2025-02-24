import React, { useState, useRef } from 'react';
import heic2any from 'heic2any';

const ParallaxEffect = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const imageRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageBlob = await heic2any({ blob: file });
      setImageSrc(URL.createObjectURL(imageBlob));  // Create object URL for the image
    }
  };

  // Handle mouse movement for parallax effect
  const handleMouseMove = (event) => {
    if (!imageRef.current) return;

    // Get the mouse position relative to the window
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate the movement factor based on mouse position
    const moveX = (mouseX - windowWidth / 2) / windowWidth * 20;  // Multiplied by 20 for more effect
    const moveY = (mouseY - windowHeight / 2) / windowHeight * 20;

    // Apply the transform with a 3D effect
    imageRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  };

  return (
    <div>
      <input type="file" accept=".heic" onChange={handleFileChange} />
      {imageSrc && (
        <div
          className="parallax-container"
          style={{
            position: "relative",
            overflow: "hidden",
            height: "100vh",  // Full height of the screen
            width: "100vw",   // Full width of the screen
          }}
          onMouseMove={handleMouseMove}  // Attach mousemove event
        >
          <img
            src={imageSrc}
            alt="HEIC Image"
            ref={imageRef}  // Attach reference to image
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",  // Center the image
              transition: "transform 0.1s ease-out",  // Smooth transition
              width: "100%",  // Make the image take full width of the container
              height: "auto", // Adjust height automatically based on width
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ParallaxEffect;