import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { iniciarPixel } from './lib/pixel';
import { inject } from '@vercel/analytics';

iniciarPixel();
inject(); // Vercel Web Analytics: visitas por origen (utm_source), país y página

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
