import { Navigate, Route, Routes } from 'react-router'
import { Layout, LayoutPublico, RotaPrivada } from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import RecuperarSenha from './pages/RecuperarSenha'
import Inicio from './pages/Inicio'
import Perfil from './pages/Perfil'
import Criancas from './pages/Criancas'
import CadastroCrianca from './pages/CadastroCrianca'
import EditarCrianca from './pages/EditarCrianca'
import Catalogo from './pages/Catalogo'
import DetalheBox from './pages/DetalheBox'
import Promocoes from './pages/Promocoes'
import Carrinho from './pages/Carrinho'
import Endereco from './pages/Endereco'
import Pagamento from './pages/Pagamento'
import ConfirmacaoPedido from './pages/ConfirmacaoPedido'
import MeusPedidos from './pages/MeusPedidos'
import Planos from './pages/Planos'
import MinhaAssinatura from './pages/MinhaAssinatura'
import Acompanhamento from './pages/Acompanhamento'
import RegistrarAtividade from './pages/RegistrarAtividade'
import HistoricoAtividades from './pages/HistoricoAtividades'
import Suporte from './pages/Suporte'
import Tutoriais from './pages/Tutoriais'
import Tutorial from './pages/Tutorial'

export default function App() {
  return (
    <Routes>
      {/* Entrada: login, cadastro e recuperação de senha */}
      <Route element={<LayoutPublico />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      </Route>

      <Route element={<Layout />}>
        {/* Aberto a todos: só pede conta na hora de comprar */}
        <Route path="/" element={<Home />} />
        <Route path="/loja" element={<Catalogo />} />
        <Route path="/loja/box/:id" element={<DetalheBox />} />
        <Route path="/promocoes" element={<Promocoes />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/assinatura/planos" element={<Planos />} />
        <Route path="/tutoriais" element={<Tutoriais />} />
        <Route path="/tutoriais/:id" element={<Tutorial />} />
        <Route path="/suporte" element={<Suporte />} />

        {/* Exige conta */}
        <Route element={<RotaPrivada />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/criancas" element={<Criancas />} />
          <Route path="/criancas/nova" element={<CadastroCrianca />} />
          <Route path="/criancas/:id/editar" element={<EditarCrianca />} />
          <Route path="/acompanhamento" element={<Acompanhamento />} />
          <Route path="/atividades/registrar" element={<RegistrarAtividade />} />
          <Route path="/atividades/historico" element={<HistoricoAtividades />} />
          <Route path="/assinatura/minha" element={<MinhaAssinatura />} />
          <Route path="/pedidos" element={<MeusPedidos />} />
          <Route path="/checkout/endereco" element={<Endereco />} />
          <Route path="/checkout/pagamento" element={<Pagamento />} />
          <Route path="/checkout/confirmacao" element={<ConfirmacaoPedido />} />
        </Route>
      </Route>

      {/* Endereços antigos */}
      <Route path="/crianca/perfil" element={<Navigate to="/criancas" replace />} />
      <Route path="/crianca/cadastro" element={<Navigate to="/criancas/nova" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
