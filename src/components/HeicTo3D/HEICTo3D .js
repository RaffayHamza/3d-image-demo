// import React, { useState } from 'react';
// import heic2any from 'heic2any';

// const HEICTo3D = () => {
//   const [imageSrc, setImageSrc] = useState(null);

//   // Handle file upload and conversion
//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageBlob = await heic2any({ blob: file });
//       setImageSrc(URL.createObjectURL(imageBlob));  // Create an object URL to show the image
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".heic" onChange={handleFileChange} />
//       {imageSrc && <img src={imageSrc} alt="HEIC Image" />}
//     </div>
//   );
// };

// export default HEICTo3D;





// import React, { useState, useRef, useEffect } from 'react';
// import heic2any from 'heic2any';
// import styles from './HEICTo3D.module.scss';

// const HEICTo3D = () => {
//   const [leftEyeSrc, setLeftEyeSrc] = useState(null);
//   const [rightEyeSrc, setRightEyeSrc] = useState(null);
//   const [mode, setMode] = useState("cross-eye");
//   const canvasRef = useRef(null);

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageBlob = await heic2any({ blob: file, toType: "image/png", multiple: true });

//       if (Array.isArray(imageBlob) && imageBlob.length >= 2) {
//         setLeftEyeSrc(URL.createObjectURL(imageBlob[0]));
//         setRightEyeSrc(URL.createObjectURL(imageBlob[1]));
//       }
//     }
//   };

//   useEffect(() => {
//     if (mode === "anaglyph" && leftEyeSrc && rightEyeSrc) {
//       createAnaglyph();
//     }
//   }, [mode, leftEyeSrc, rightEyeSrc]);

//   const createAnaglyph = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const leftImg = new Image();
//     const rightImg = new Image();

//     leftImg.src = leftEyeSrc;
//     rightImg.src = rightEyeSrc;

//     leftImg.onload = () => {
//       rightImg.onload = () => {
//         canvas.width = leftImg.width;
//         canvas.height = leftImg.height;

//         // Draw Left Image (Red)
//         ctx.drawImage(leftImg, 0, 0);
//         let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         for (let i = 0; i < imageData.data.length; i += 4) {
//           imageData.data[i + 1] = 0; // Remove Green
//           imageData.data[i + 2] = 0; // Remove Blue
//         }
//         ctx.putImageData(imageData, 0, 0);

//         // Draw Right Image (Cyan)
//         ctx.globalAlpha = 0.5;
//         ctx.drawImage(rightImg, 0, 0);
//         imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         for (let i = 0; i < imageData.data.length; i += 4) {
//           imageData.data[i] = 0; // Remove Red
//         }
//         ctx.putImageData(imageData, 0, 0);
//       };
//     };
//   };

//   return (
//     <div className={styles.container}>
//       <input type="file" accept=".heic" onChange={handleFileChange} className={styles.inputFile} />

//       <select onChange={(e) => setMode(e.target.value)} className={styles.modeSelector}>
//         <option value="cross-eye">Cross-Eye Mode</option>
//         <option value="vr">VR Mode</option>
//         <option value="anaglyph">Anaglyph (Red-Cyan Glasses)</option>
//       </select>

//       {leftEyeSrc && rightEyeSrc && (
//         <>
//           {mode === "cross-eye" && (
//             <div className={styles.crossEyeContainer}>
//               <img src={leftEyeSrc} alt="Left Eye" className={styles.image} />
//               <img src={rightEyeSrc} alt="Right Eye" className={styles.image} />
//             </div>
//           )}

//           {mode === "vr" && (
//             <div className={styles.vrContainer}>
//               <img src={leftEyeSrc} alt="Left Eye" className={styles.vrImage} />
//               <img src={rightEyeSrc} alt="Right Eye" className={styles.vrImage} />
//             </div>
//           )}

//           {mode === "anaglyph" && (
//             <div className={styles.anaglyphContainer}>
//               <canvas ref={canvasRef}></canvas>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default HEICTo3D;









import React, { useState, useRef, useEffect } from 'react';
import heic2any from 'heic2any';
import styles from './HEICTo3D.module.scss';

const HEICTo3D = () => {
  const [leftEyeSrc, setLeftEyeSrc] = useState(null);
  const [rightEyeSrc, setRightEyeSrc] = useState(null);
  const [mode, setMode] = useState("cross-eye");
  const canvasRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageBlob = await heic2any({ blob: file, toType: "image/png", multiple: true });
      if (Array.isArray(imageBlob) && imageBlob.length >= 2) {
        setLeftEyeSrc(URL.createObjectURL(imageBlob[0]));
        setRightEyeSrc(URL.createObjectURL(imageBlob[1]));
      }
    }
  };

  useEffect(() => {
    if (mode === "anaglyph" && leftEyeSrc && rightEyeSrc) {
      createAnaglyph();
    }
  }, [mode, leftEyeSrc, rightEyeSrc]);

  const createAnaglyph = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const leftImg = new Image();
    const rightImg = new Image();

    leftImg.src = leftEyeSrc;
    rightImg.src = rightEyeSrc;

    leftImg.onload = () => {
      rightImg.onload = () => {
        canvas.width = leftImg.width;
        canvas.height = leftImg.height;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw Left Image (Red Shift)
        ctx.drawImage(leftImg, -5, 0);
        let leftData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < leftData.data.length; i += 4) {
          leftData.data[i + 1] = 0; // Remove Green
          leftData.data[i + 2] = 0; // Remove Blue
        }
        ctx.putImageData(leftData, 0, 0);

        // Draw Right Image (Cyan Shift)
        ctx.globalAlpha = 1.0;
        ctx.drawImage(rightImg, 5, 0);
      };
    };
  };

  return (
    <div className={styles.container}>
      <input type="file" accept=".heic" onChange={handleFileChange} className={styles.inputFile} />

      <select onChange={(e) => setMode(e.target.value)} className={styles.modeSelector}>
        <option value="cross-eye">Cross-Eye Mode</option>
        <option value="vr">Apple Vision Pro</option>
        <option value="anaglyph">Anaglyph (Red-Cyan Glasses)</option>
      </select>

      {leftEyeSrc && rightEyeSrc && (
        <>
          {mode === "cross-eye" && (
            <div className={styles.crossEyeContainer}>
              <img src={leftEyeSrc} alt="Left Eye" className={styles.image} />
              <img src={rightEyeSrc} alt="Right Eye" className={styles.image} />
            </div>
          )}

          {mode === "vr" && (
            <div className={styles.vrContainer}>
              <img src={leftEyeSrc} alt="Left Eye" className={styles.vrImage} />
              <img src={rightEyeSrc} alt="Right Eye" className={styles.vrImage} />
            </div>
          )}

          {mode === "anaglyph" && (
            <div className={styles.anaglyphContainer}>
              <canvas ref={canvasRef}></canvas>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HEICTo3D;

