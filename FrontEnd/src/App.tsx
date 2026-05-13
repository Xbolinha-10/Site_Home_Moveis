import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CookieBanner } from '@/app/components/CookieBanner';
import { LandingPage } from '@/app/pages/LandingPage';
import { AdminSecreto } from '@/app/pages/AdminSecreto';
import { Legal } from '@/app/pages/Legal';

function App() {
  return (
    
    <Router>
      <CookieBanner /> {/* Ele aparecerá em todas as rotas se não houver consentimento */}
      <Routes>
        {/* ROTA PÚBLICA: O que todos os clientes veem */}
        <Route path="/" element={<LandingPage />} />

        {/* ROTA SECRETA: Onde só você gerencia os produtos */}
        {/* Dica: Você pode mudar esse path para qualquer nome que queira manter em segredo */}
        <Route path="/painel-controle-exclusivo-2026" element={<AdminSecreto />} />

        {/* ROTA DE REDIRECIONAMENTO (Opcional) */}
        {/* Se alguém tentar acessar uma página que não existe, volta para a Home */}
        <Route path="*" element={<LandingPage />} />

        {/* ROTA DE DOCUMENTOS LEGAIS */}
        <Route path="/politica-privacidade" element={<Legal />} />
        <Route path="/termos-uso" element={<Legal />} />

      </Routes>
    </Router>
  );
}

export default App;