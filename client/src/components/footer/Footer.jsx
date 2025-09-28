import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 text-center">
      © {new Date().getFullYear()} MegaBlog. All rights reserved.
    </footer>
  );
}

export default Footer;
