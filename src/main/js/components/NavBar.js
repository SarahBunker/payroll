import React from 'react';

function NavBar({ links }) {
  const navLinks = [];

  if ("first" in links) {
    const linkUrl = links.first.href;
    navLinks.push(
      <a key="first" href={linkUrl} className="nav-link">
        &lt;&lt;
        <span className="tooltip">First Page</span>
      </a>
    );
  }
  if ("prev" in links) {
    const linkUrl = links.prev.href;
    navLinks.push(
      <a key="prev" href={linkUrl} className="nav-link">
        &lt;
        <span className="tooltip">Previous Page</span>
      </a>
    );
  }
  if ("next" in links) {
    const linkUrl = links.next.href;
    navLinks.push(
      <a key="next" href={linkUrl} className="nav-link">
        &gt;
        <span className="tooltip">Next Page</span>
      </a>
    );
  }
  if ("last" in links) {
    const linkUrl = links.last.href;
    navLinks.push(
      <a key="last" href={linkUrl} className="nav-link">
        &gt;&gt;
        <span className="tooltip">Last Page</span>
      </a>
    );
  }

  return <div className="nav-links">{navLinks}</div>;
}

export default NavBar;
