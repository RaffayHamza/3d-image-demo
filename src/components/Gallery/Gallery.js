// import React, { useEffect, useState } from "react";
// import styles from "./Gallery.module.scss";
// import heic2any from "heic2any";

// const imagePaths = [
//   "/gallery/IMG_0016.HEIC",
//   "/gallery/IMG_0046.HEIC",
//   "/gallery/IMG_0053.HEIC",
// ];

// const Gallery = () => {
//   const [convertedImages, setConvertedImages] = useState([]);

//   useEffect(() => {
//     const convertImages = async () => {
//       console.log("Starting image conversion...");

//       const converted = await Promise.all(
//         imagePaths.map(async (imagePath, index) => {
//           try {
//             console.log(`Fetching image: ${imagePath}`);

//             const response = await fetch(imagePath);
//             if (!response.ok) throw new Error(`Failed to load ${imagePath}`);

//             const blob = await response.blob();
//             console.log(`Blob received for ${imagePath}:`, blob);

//             return new Promise((resolve, reject) => {
//               const reader = new FileReader();

//               reader.onload = async (event) => {
//                 try {
//                   console.log(`Reading image ${index + 1}`);
//                   const heicData = new Uint8Array(event.target.result);
//                   const convertedBlob = await heic2any({ blob: new Blob([heicData]), toType: "image/png" });
                  
//                   console.log(`Image ${index + 1} converted successfully!`);
//                   resolve(URL.createObjectURL(convertedBlob));
//                 } catch (error) {
//                   console.error(`Error converting ${imagePath}:`, error);
//                   reject(error);
//                 }
//               };

//               reader.onerror = (error) => {
//                 console.error(`FileReader error for ${imagePath}:`, error);
//                 reject(error);
//               };

//               reader.readAsArrayBuffer(blob);
//             });
//           } catch (error) {
//             console.error(`Error processing ${imagePath}:`, error);
//             return null;
//           }
//         })
//       );

//       setConvertedImages(converted.filter((img) => img !== null));
//       console.log("Final converted images:", convertedImages);
//     };

//     convertImages();
//   }, []);

//   return (
//     <div className={styles.gallery}>
//       <h1>Gallery</h1>
//       <div className={styles.galleryGrid}>
//         {convertedImages.length > 0 ? (
//           convertedImages.map((imgSrc, index) => (
//             <div key={index} className={styles.galleryItem}>
//               <img src={imgSrc} alt={`Gallery Image ${index + 1}`} />
//             </div>
//           ))
//         ) : (
//           <p>Loading images...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Gallery;














// import React, { useEffect, useState } from "react";
// import heic2any from "heic2any";
// import styles from "./Gallery.module.scss";

// const imagePaths = [
//   "/gallery/IMG_0016.HEIC",
//   "/gallery/IMG_0021.HEIC",
//   "/gallery/IMG_0034.HEIC",
//   "/gallery/IMG_0040.HEIC",
//   "/gallery/IMG_0046.HEIC",
//   "/gallery/IMG_0049.HEIC",
//   "/gallery/IMG_0050.HEIC",
// //   "/gallery/IMG_0051.HEIC",
// //   "/gallery/IMG_0053.HEIC",
// //   "/gallery/IMG_0058.HEIC",
// //   "/gallery/IMG_0061 (1).HEIC",
// //   "/gallery/IMG_0082.HEIC",
// //   "/gallery/IMG_0085.HEIC",
// //   "/gallery/IMG_0086.HEIC",
// //   "/gallery/IMG_0152.HEIC",
// //   "/gallery/IMG_0153.HEIC",
// //   "/gallery/IMG_0181.HEIC",
// //   "/gallery/IMG_0183.HEIC",
// //   "/gallery/IMG_2713.HEIC",
// //   "/gallery/IMG_2717.HEIC",
// ];

// const Gallery = () => {
//   const [convertedImages, setConvertedImages] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const convertImages = async () => {
//       const converted = await Promise.all(
//         imagePaths.map(async (imagePath) => {
//           try {
//             const response = await fetch(imagePath);
//             if (!response.ok) throw new Error(`Failed to load ${imagePath}`);

//             const blob = await response.blob();
//             const convertedBlob = await heic2any({ blob, toType: "image/png" });
//             return URL.createObjectURL(convertedBlob);
//           } catch (error) {
//             console.error(`Error converting ${imagePath}:`, error);
//             return null;
//           }
//         })
//       );
//       setConvertedImages(converted.filter(Boolean));
//     };

//     convertImages();
//   }, []);

//   const openModal = (index) => {
//     setSelectedImage(convertedImages[index]);
//     setCurrentIndex(index);
//     document.body.classList.add("modal-open"); // Disable background scroll
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//     document.body.classList.remove("modal-open"); // Enable background scroll
//   };

//   const showPrev = (e) => {
//     e.stopPropagation();
//     const newIndex = currentIndex === 0 ? convertedImages.length - 1 : currentIndex - 1;
//     setSelectedImage(convertedImages[newIndex]);
//     setCurrentIndex(newIndex);
//   };

//   const showNext = (e) => {
//     e.stopPropagation();
//     const newIndex = currentIndex === convertedImages.length - 1 ? 0 : currentIndex + 1;
//     setSelectedImage(convertedImages[newIndex]);
//     setCurrentIndex(newIndex);
//   };

//   return (
//     <div className={styles.gallery}>
//       <h1>Gallery</h1>
//       <div className={styles.galleryGrid}>
//         {convertedImages.length > 0 ? (
//           convertedImages.map((imgSrc, index) => (
//             <div key={index} className={styles.galleryItem} onClick={() => openModal(index)}>
//               <img src={imgSrc} alt={`Gallery Image ${index + 1}`} className={styles.image} />
//             </div>
//           ))
//         ) : (
//           <p>Loading images...</p>
//         )}
//       </div>

//       {selectedImage && (
//         <div className={styles.modal} onClick={closeModal}>
//           <span className={styles.close} onClick={closeModal}>&times;</span>
//           <img src={selectedImage} alt="Full View" className={styles.modalImage} />
//           <button className={styles.prev} onClick={showPrev}>&#10094;</button>
//           <button className={styles.next} onClick={showNext}>&#10095;</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;










































import React, { useEffect, useState } from "react";
import heic2any from "heic2any";
import styles from "./Gallery.module.scss";

const imagePaths = [
  "/gallery/IMG_0016.HEIC",
  "/gallery/IMG_0021.HEIC",
  "/gallery/IMG_0034.HEIC",
  "/gallery/IMG_0040.HEIC",
  "/gallery/IMG_0046.HEIC",
  "/gallery/IMG_0049.HEIC",
  "/gallery/IMG_0050.HEIC",
];

const Gallery = () => {
  const [convertedImages, setConvertedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const convertImages = async () => {
      const converted = await Promise.all(
        imagePaths.map(async (imagePath) => {
          try {
            const response = await fetch(imagePath);
            if (!response.ok) throw new Error(`Failed to load ${imagePath}`);

            const blob = await response.blob();
            const convertedBlob = await heic2any({ blob, toType: "image/png" });
            return URL.createObjectURL(convertedBlob);
          } catch (error) {
            console.error(`Error converting ${imagePath}:`, error);
            return null;
          }
        })
      );
      setConvertedImages(converted.filter(Boolean));
    };

    convertImages();
  }, []);

  const openModal = (index) => {
    setSelectedImage(convertedImages[index]);
    setCurrentIndex(index);
    document.body.classList.add("modal-open"); // Disable background scroll
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.classList.remove("modal-open"); // Enable background scroll
  };

  const showPrev = (e) => {
    e.stopPropagation();
    const newIndex = currentIndex === 0 ? convertedImages.length - 1 : currentIndex - 1;
    setSelectedImage(convertedImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const showNext = (e) => {
    e.stopPropagation();
    const newIndex = currentIndex === convertedImages.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(convertedImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <div className={styles.gallery}>
      <h1>Gallery</h1>

      {convertedImages.length > 0 ? (
        <div className={styles.galleryGrid}>
          {convertedImages.map((imgSrc, index) => (
            <div key={index} className={styles.galleryItem} onClick={() => openModal(index)}>
              <img src={imgSrc} alt={`Gallery Image ${index + 1}`} className={styles.image} />
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.loadingText}>Loading images...</p>
      )}

      {selectedImage && (
        <div className={styles.modal} onClick={closeModal}>
          <span className={styles.close} onClick={closeModal}>&times;</span>
          <img src={selectedImage} alt="Full View" className={styles.modalImage} />
          <button className={styles.prev} onClick={showPrev}>&#10094;</button>
          <button className={styles.next} onClick={showNext}>&#10095;</button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
