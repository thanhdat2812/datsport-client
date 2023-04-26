import './Footer.scss';

import React from 'react';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <p className="footer-content">
        @{new Date().getFullYear()} DatSport limited liability company
      </p>
    </div>
  );
};

export default Footer;
