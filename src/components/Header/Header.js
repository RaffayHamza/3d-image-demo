import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import styles from "./Header.module.scss";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for mobile menu

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>3D Image Demo</div>

        {/* Desktop Menu */}
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ""}`}>
          <ul>
            <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link></li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className={styles.mobileMenuIcon} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
