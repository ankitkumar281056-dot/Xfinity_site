import { Facebook, Twitter, Youtube, Instagram, Linkedin, ChevronDown, Phone } from 'lucide-react';
import { useState } from 'react';
import type { Page } from '@/data/supportData';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const footerColumns: { title: string; links: string[] }[] = [
  {
    title: 'Shop',
    links: ['Xfinity Internet', 'Xfinity TV', 'Xfinity Mobile', 'Xfinity Home', 'Xfinity Voice', 'Bundles & Packages'],
  },
  {
    title: 'Support',
    links: ['Help & Support', 'Blog', 'Outage Status', 'System Status', 'Reset Equipment', 'Contact Us', 'Xfinity Assistant'],
  },
  {
    title: 'Company',
    links: ['About Comcast', 'Careers', 'Press Room', 'Corporate Website', 'Diversity', 'Sustainability'],
  },
  {
    title: 'Connect With Us',
    links: ['Xfinity Community', 'Xfinity Forum', 'Xfinity News', 'Xfinity Store Locator', 'Get Xfinity', 'Feedback'],
  },
];

export function Footer({ onNavigate }: FooterProps) {
  const [openColumn, setOpenColumn] = useState<string | null>(null);

  const handleLinkClick = (link: string) => {
    if (link === 'Outage Status') onNavigate('outage');
    else if (link === 'Help & Support' || link === 'Reset Equipment') onNavigate('home');
    else if (link === 'Contact Us') onNavigate('account');
    else if (link === 'Blog') onNavigate('blog');
  };

  return (
    <footer className="border-t border-xfinity-gray-700 bg-xfinity-black">
      <div className="section-container py-12">
        {/* Footer link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3
                className="mb-4 text-sm font-bold uppercase tracking-wider text-white cursor-pointer md:cursor-default"
                onClick={() => setOpenColumn(openColumn === col.title ? null : col.title)}
              >
                <span className="flex items-center justify-between">
                  {col.title}
                  <ChevronDown className="h-4 w-4 text-xfinity-gray-400 transition-transform md:hidden" />
                </span>
              </h3>
              <ul
                className={`space-y-2.5 ${
                  openColumn === col.title ? 'block' : 'hidden md:block'
                }`}
              >
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleLinkClick(link)}
                      className="text-sm text-xfinity-gray-400 transition-colors hover:text-white"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social + legal section */}
        <div className="mt-10 border-t border-xfinity-gray-700 pt-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            {/* Logo + phone */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center">
                <span className="text-xl font-bold tracking-tight text-white">
                  <span className="text-brand-red">x</span>finity
                </span>
              </div>
              <a
                href="tel:+18662403377"
                className="flex items-center gap-2 text-sm text-xfinity-gray-400 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-brand-red" />
                (+1) 866-240-3377
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Youtube, label: 'YouTube' },
                { Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="rounded-full border border-xfinity-gray-600 p-2 text-xfinity-gray-400 transition-all duration-200 hover:border-brand-red hover:text-brand-red"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Legal links */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            {[
              'Privacy Policy',
              'Your Privacy Choices',
              'Cookie Preferences',
              'Terms of Service',
              'Subscriber Agreement',
              'Accessibility',
              'Sitemap',
            ].map((item) => (
              <button
                key={item}
                className="text-xs text-xfinity-gray-500 transition-colors hover:text-xfinity-gray-300"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <p className="mt-4 text-xs text-xfinity-gray-600">
            © 1999–2026 Comcast. All rights reserved. This is a demo website created for illustration purposes only and is not affiliated with or endorsed by Comcast or Xfinity.
          </p>
        </div>
      </div>
    </footer>
  );
}
