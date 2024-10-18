import React, { useEffect, useState } from 'react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`btn btn-primary btn-floating ${isVisible ? 'visible' : 'invisible'}`}
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        transition: 'opacity 0.3s',
        opacity: isVisible ? 1 : 0,
        zIndex: 1000,
      }}
    >
      <i className="bi bi-arrow-up"></i> {/* Biểu tượng mũi tên lên */}
    </button>
  );
};

export default BackToTopButton;
