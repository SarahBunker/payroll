import React, { useState } from 'react';

function NavBar({ links }) {
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(-1);

  const handleMouseEnter = (index) => {
    setActiveTooltipIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveTooltipIndex(-1);
  };

  const navLinks = [
    { key: "first", text: "<<", tooltip: "First Page", href: links.first?.href },
    { key: "prev", text: "<", tooltip: "Previous Page", href: links.prev?.href },
    { key: "next", text: ">", tooltip: "Next Page", href: links.next?.href },
    { key: "last", text: ">>", tooltip: "Last Page", href: links.last?.href }
  ];

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
