import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-white text-xl font-semibold">Steinalytics</h2>
            <p className="text-gray-500 mt-2 max-w-xs">
              Empowering insights through data-driven solutions.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col md:flex-row gap-6 text-sm">
            <a href="/about" className="hover:text-white transition">About</a>
            <a href="/services" className="hover:text-white transition">Services</a>
            <a href="/blog" className="hover:text-white transition">Blog</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </div>

          {/* Social Media */}
          <div className="flex gap-4">
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white transition">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com" aria-label="GitHub" className="hover:text-white transition">
              <FaGithub size={20} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-500">
          © 2025 Steinalytics. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
