import React from 'react';
import { ArrowUp } from 'lucide-react';
import { NAV_LINKS } from './Navbar';
import Logo from './Logo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#EAE3D5] border-t border-[#D8CFBF] text-[#1E1B18] pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#D8CFBF]/70">
          {/* Brand Column - Squat Fitness */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showText={true} />
            <p className="text-xs text-[#6A6055] leading-relaxed max-w-sm">
              Squat Fitness is a minimalist performance platform engineered with clarity and intention. We distill training telemetry, macro nutrition, and progressive overload into quiet order.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#1E1B18]" />
              <span className="text-[11px] font-mono text-[#1E1B18] font-bold">SQUAT TELEMETRY v2.6 // ONLINE</span>
            </div>
          </div>

          {/* Quick Navigation - 6 Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono uppercase text-[#1E1B18] font-bold tracking-wider mb-4">
              Navigation &amp; Protocols
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs font-mono">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-black transition-colors text-[#6A6055] font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Connect */}
          <div>
            <h4 className="text-xs font-mono uppercase text-[#1E1B18] font-bold tracking-wider mb-4">
              Community
            </h4>
            <div className="flex items-center gap-2 mb-4">
              {/* GitHub SVG */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[#D8CFBF] flex items-center justify-center text-[#1E1B18] hover:border-[#1E1B18] transition-colors shadow-xs"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* Twitter / X SVG */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[#D8CFBF] flex items-center justify-center text-[#1E1B18] hover:border-[#1E1B18] transition-colors shadow-xs"
                aria-label="X / Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram SVG */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[#D8CFBF] flex items-center justify-center text-[#1E1B18] hover:border-[#1E1B18] transition-colors shadow-xs"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* YouTube SVG */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[#D8CFBF] flex items-center justify-center text-[#1E1B18] hover:border-[#1E1B18] transition-colors shadow-xs"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
            <p className="text-[11px] font-mono text-[#6A6055]">
              HQ: San Francisco, CA
            </p>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6A6055]">
          <p>© {new Date().getFullYear()} SQUAT FITNESS LABS. ALL RIGHTS RESERVED.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#1E1B18] transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <div className="w-6 h-6 rounded bg-white border border-[#D8CFBF] flex items-center justify-center text-[#1E1B18] shadow-xs">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
