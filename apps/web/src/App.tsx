import { Navigate, Route, Routes } from 'react-router'
import { Layout, LayoutPublico } from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import RecuperarSenha from './pages/RecuperarSenha'
import Inicio from './pages/Inicio'
import CadastroCrianca from './pages/CadastroCrianca'
import PerfilCrianca from './pages/PerfilCrianca'
import Catalogo from './pages/Catalogo'
import DetalheBox from './pages/DetalheBox'
import Carrinho from './pages/Carrinho'
import Endereco from './pages/Endereco'
import Pagamento from './pages/Pagamento'
import ConfirmacaoPedido from './pages/ConfirmacaoPedido'
import MeusPedidos from './pages/MeusPedidos'
import Planos from './pages/Planos'
import MinhaAssinatura from './pages/MinhaAssinatura'
import RegistrarAtividade from './pages/RegistrarAtividade'
import HistoricoAtividades from './pages/HistoricoAtividades'
import Suporte from './pages/Suporte'

export default function App() {
  return (
    <Routes>
      {/* Área pública */}
      <Route element={<LayoutPublico />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      </Route>

      {/* Área logada (exige sessão simulada) */}
      <Route element={<Layout />}>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/crianca/cadastro" element={<CadastroCrianca />} />
        <Route path="/crianca/perfil" element={<PerfilCrianca />} />
        <Route path="/loja" element={<Catalogo />} />
        <Route path="/loja/box/:id" element={<DetalheBox />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/checkout/endereco" element={<Endereco />} />
        <Route path="/checkout/pagamento" element={<Pagamento />} />
        <Route path="/checkout/confirmacao" element={<ConfirmacaoPedido />} />
        <Route path="/pedidos" element={<MeusPedidos />} />
        <Route path="/assinatura/planos" element={<Planos />} />
        <Route path="/assinatura/minha" element={<MinhaAssinatura />} />
        <Route path="/atividades/registrar" element={<RegistrarAtividade />} />
        <Route path="/atividades/historico" element={<HistoricoAtividades />} />
        <Route path="/suporte" element={<Suporte />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
