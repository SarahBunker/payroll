import React, { useState } from 'react';

function NavBar({ links }) {
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setActiveTooltipIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveTooltipIndex(-1);
  };

  const navLinks = Object.entries(links)
    .filter(([key]) => key !== "profile" && key !== "self")
    .map(([key, value]) => {
      const linkUrl = value.href;
      const linkText = key === 'first' ? '<<' : key === 'prev' ? '<' : key === 'next' ? '>' : '>>';
      let navLink = { key: key, text: linkText, tooltip: key, href: linkUrl };

      return navLink;
    });

  return (
    <div className="nav-links">
      {navLinks.map(({ key, text, tooltip, href }, index) => (
        <a
          key={key}
          href={href}
          className="nav-button"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {text}
          {activeTooltipIndex === index && <span className="tooltip">{tooltip}</span>}
        </a>
      ))}
    </div>
  );
}

export default NavBar;
