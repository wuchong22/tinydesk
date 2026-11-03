// Same profile URLs as the Make Fancy Text footer, in that order. These open the accounts; they do not share the current page.
const SOCIALS = [
  { name: 'Facebook', href: 'https://www.facebook.com/Forrest29lee/' },
  { name: 'X', href: 'https://x.com/Forrest29lee' },
  { name: 'Instagram', href: 'https://www.instagram.com/forrest029029/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@Forrest29Lee' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@forrest.lee5' },
  { name: 'Pinterest', href: 'https://www.pinterest.com/Forrest29lee/' },
] as const;

export function FooterSocial() {
  return (
    <nav className="footer-social" aria-label="Social media">
      {SOCIALS.map((profile) => (
        <a key={profile.name} href={profile.href} target="_blank" rel="noopener noreferrer" aria-label={profile.name}>
          <SocialIcon name={profile.name} />
        </a>
      ))}
    </nav>
  );
}

function SocialIcon({ name }: { name: (typeof SOCIALS)[number]['name'] }) {
  if (name === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M14 8h3.2V4H14c-3.6 0-6 2.2-6 6.2V13H5v4h3v7h4v-7h3.2l.8-4H12v-2.4C12 9.2 12.8 8 14 8Z" />
      </svg>
    );
  }
  if (name === 'X') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M17.6 3H20.4L13.7 10.7 21.6 21h-6.2l-4.4-6.3L5.8 21H3l7.2-8.2L2.6 3h6.3l4 5.8L17.6 3Zm-1.1 16.2h1.7L7.6 4.7H5.8l10.7 14.5Z" />
      </svg>
    );
  }
  if (name === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.05" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === 'YouTube') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M22.5 7.2a3 3 0 0 0-2.1-2.1C18.5 4.7 12 4.7 12 4.7s-6.5 0-8.4.4A3 3 0 0 0 1.5 7.2 31 31 0 0 0 1 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.4 8.4.4 8.4.4s6.5 0 8.4-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23 12a31 31 0 0 0-.5-4.8ZM10 15.2V8.8L15.8 12 10 15.2Z" />
      </svg>
    );
  }
  if (name === 'TikTok') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M14.1 3c.7 1.6 1.9 2.9 3.5 3.5V9c-1.2 0-2.4-.4-3.5-1v6.2A5.7 5.7 0 1 1 8.2 8.7v2.4a3.3 3.3 0 1 0 2.4 3.2V3h3.5Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M12 3a9 9 0 0 0-3.3 17.4c-.1-.7-.2-1.8 0-2.6.2-.7 1.3-5.5 1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.7 2-2.7.9 0 1.4.7 1.4 1.5 0 1-.6 2.4-.9 3.7-.3 1.1.5 2 1.6 2 2 0 3.5-2.1 3.5-5.1 0-2.6-1.9-4.5-4.6-4.5-3.2 0-5 2.4-5 4.8 0 1 .4 2 .8 2.5.1.1.1.2.1.3l-.3 1.3c0 .2-.2.3-.4.2-1.4-.6-2.2-2.7-2.2-4.3 0-3.5 2.5-6.7 7.3-6.7 3.8 0 6.8 2.7 6.8 6.4 0 3.8-2.4 6.9-5.7 6.9-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2 1-.9 2.2-1.4 2.9A9 9 0 1 0 12 3Z" />
    </svg>
  );
}
