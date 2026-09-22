export const Play = ({ w = 30, h = 34 }: { w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 30 34" aria-hidden="true"><path d="M2 2 L28 17 L2 32 Z" fill="#000" /></svg>
);
export const Flecha = ({ dir }: { dir: 'l' | 'r' }) => (
  <svg width="10" height="16" viewBox="0 0 10 16" aria-hidden="true">
    <path d={dir === 'l' ? 'M9 1 L2 8 L9 15' : 'M1 1 L8 8 L1 15'} stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);
export const WhatsApp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M8.6 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.5l-.5.6c-.1.1-.1.3 0 .4.5.9 1.4 1.8 2.5 2.4.2.1.3.1.4 0l.6-.7c.1-.2.3-.2.5-.1l1.7.8c.2.1.4.2.4.4 0 .7-.4 1.5-1 1.8-.6.3-1.3.3-2 .1-2.1-.7-3.9-2.5-4.8-4.6-.3-.7-.3-1.4 0-2.1l-.1-.2Z" fill="currentColor" />
  </svg>
);
