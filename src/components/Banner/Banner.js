import React from 'react';
import { useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import styles from './Banner.module.scss';

// Import images directly
import img1 from '../../assets/images/banner/IMG_0016-1.jpg';
import img2 from '../../assets/images/banner/IMG_0016-2.jpg';

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <h1 className={styles.title}>3D Banner with Two Images</h1>
      
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        {/* Ambient light and directional light for brightness and color accuracy */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow={true} />
        
        {/* BannerContent is now inside the Canvas */}
        <BannerContent />
        
        <OrbitControls />
      </Canvas>
    </div>
  );
};

const BannerContent = () => {
  // Load textures inside the Canvas where hooks are allowed
  const texture1 = useTexture(img1); 
  const texture2 = useTexture(img2); 

  return (
    <group>
      {/* First Image */}
      <mesh rotation={[0, Math.PI / 4, 0]} position={[-2.5, 0, 0]} scale={1.5}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial map={texture1} />
      </mesh>

      {/* Second Image */}
      <mesh rotation={[0, -Math.PI / 4, 0]} position={[2.5, 0, 0]} scale={1.5}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial map={texture2} />
      </mesh>
    </group>
  );
};

export default Banner;
