// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';

// const ThreeDViewer = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     // Set up the scene
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//     // Set up the renderer
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Add a cube for demonstration
//     const geometry = new THREE.BoxGeometry();
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     camera.position.z = 5;

//     // Animation loop
//     const animate = function () {
//       requestAnimationFrame(animate);

//       // Rotate the cube for a 3D effect
//       cube.rotation.x += 0.01;
//       cube.rotation.y += 0.01;

//       renderer.render(scene, camera);
//     };
//     animate();

//     // Clean up on unmount
//     return () => {
//       mountRef.current.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} />;
// };

// export default ThreeDViewer;