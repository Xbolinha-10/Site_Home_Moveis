import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const consentimento = localStorage.getItem('cookie-consent');
    if (!consentimento) {
      setVisivel(true);
    }
  }, []);

  const aceitarCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setVisivel(false);
  };

  if (!visivel) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 p-6 animate-bounce-in">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          <p>
            Utilizamos cookies para melhorar sua experiência em nosso site. Ao navegar, você concorda com nossa 
            <a href="/politica-privacidade" className="text-black font-bold underline ml-1">Política de Privacidade</a>.
          </p>
        </div>
        <button 
          onClick={aceitarCookies}
          className="bg-black text-white px-8 py-2 text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition shadow-lg"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}