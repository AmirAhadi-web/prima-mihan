'use client';

import React from 'react';
import Image from 'next/image';

export default function DeveloperFooter() {
  const developerInfo = {
    name: 'AmirMohammad Ahadi',
    role: 'Front-End / Web Developer',
    avatar: '/developer.jpg', // ← مسیر عکس شما در پوشه public
    phone: '09393871582', // ← شماره تلفن
    email: 'amirahadiweb@gmail.com', // ← ایمیل
    instagram: 'https://instagram.com/amirahadi_web', // ← لینک اینستاگرام
    linkedin: 'https://linkedin.com/in/amirmohammad-ahadi', // ← لینک لینکدین
    github: 'https://github.com/AmirAhadi-web', // ← لینک گیت‌هاب
  };

  return (
    <footer className="w-full border-t border-gold/20 bg-charcoal-dark/95 py-12 text-ivory">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
        {/* بخش معرفی دولوپر همراه با عکس بزرگ‌تر */}
        <div className="flex items-center gap-5 text-center md:text-left">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-gold/40 shadow-[0_0_16px_rgba(212,175,55,0.25)]">
            <Image
              src={developerInfo.avatar}
              alt={developerInfo.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="smallcaps text-[11px] tracking-[0.3em] text-gold">
              Designed & Developed By
            </p>
            <h4 className="mt-1 font-display text-xl tracking-wider text-ivory">
              {developerInfo.name}
            </h4>
            <p className="mt-0.5 text-xs text-ivory/60">{developerInfo.role}</p>
          </div>
        </div>

        {/* آیکون‌ها و لینک‌های ارتباطی */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* تلفن */}
          <a
            href={`tel:${developerInfo.phone}`}
            title="Phone"
            className="flex items-center gap-2 rounded-full border border-gold/20 bg-charcoal/50 p-3 text-ivory/70 transition-all hover:border-gold hover:text-gold hover:shadow-[0_0_12px_rgba(212,175,55,0.25)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>

          {/* ایمیل */}
          <a
            href={`mailto:${developerInfo.email}`}
            title="Email"
            className="flex items-center gap-2 rounded-full border border-gold/20 bg-charcoal/50 p-3 text-ivory/70 transition-all hover:border-gold hover:text-gold hover:shadow-[0_0_12px_rgba(212,175,55,0.25)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>

          {/* اینستاگرام */}
          <a
            href={developerInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="flex items-center gap-2 rounded-full border border-gold/20 bg-charcoal/50 p-3 text-ivory/70 transition-all hover:border-gold hover:text-gold hover:shadow-[0_0_12px_rgba(212,175,55,0.25)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>

          {/* لینکدین */}
          <a
            href={developerInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="flex items-center gap-2 rounded-full border border-gold/20 bg-charcoal/50 p-3 text-ivory/70 transition-all hover:border-gold hover:text-gold hover:shadow-[0_0_12px_rgba(212,175,55,0.25)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect width="4" height="12" x="2" y="9"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>

          {/* گیت‌هاب */}
          <a
            href={developerInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="flex items-center gap-2 rounded-full border border-gold/20 bg-charcoal/50 p-3 text-ivory/70 transition-all hover:border-gold hover:text-gold hover:shadow-[0_0_12px_rgba(212,175,55,0.25)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              <path d="M9 18c-4.51 2-5-2-7-2"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}