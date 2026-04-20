import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import DoneDashLogo from "./DoneDashLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    marketplace: [
      { name: "About Us", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "Trust & Safety", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
    support: [{ name: "Help Center", href: "#" }],
  };

  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand & Mission - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <DoneDashLogo size={6} textSize="text-2xl" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
              The Academic Advisor Marketplace. Connecting talent with
              opportunity in a campus-curated environment.
            </p>
            <div className="flex gap-4">
              <FaTwitter className="text-gray-400 hover:text-teal-600 cursor-pointer transition-colors" />
              <FaGithub className="text-gray-400 hover:text-teal-600 cursor-pointer transition-colors" />
              <FaLinkedin className="text-gray-400 hover:text-teal-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Dynamic Links Generation */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-5">
              Marketplace
            </h3>
            <ul className="space-y-3">
              {footerLinks.marketplace.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-5">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-teal-600 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {currentYear} DoneDash. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-gray-400 italic">
              Built for the academic community.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
