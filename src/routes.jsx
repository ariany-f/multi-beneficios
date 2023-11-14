import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrimeiroAcesso from '@pages/PrimeiroAcesso';
import SenhaDeAcesso from '@pages/PrimeiroAcesso/senha-acesso';
import Login from '@pages/Login';
import SelecionarEmpresa from '@pages/Login/selecionar-empresa';
import EsqueciASenha from '@pages/EsqueciASenha';
import Seguranca from '@pages/EsqueciASenha/seguranca';
import RedefinirSenha from '@pages/EsqueciASenha/redefinir';
import Dashboard from '@pages/Dashboard';
import Autenticado from '@common/Autenticado'
import PrimeiroAcessoCommon from '@common/PrimeiroAcesso'
import Publico from '@common/Publico'
import Colaboradores from '@pages/Colaboradores';
import ColaboradoresCadastrados from '@pages/Colaboradores/cadastrados';
import ColaboradoresAguardando from '@pages/Colaboradores/aguardando-cadastro';
import ColaboradoresDesativados from '@pages/Colaboradores/desativados';
import NaoEncontrada from '@pages/NaoEncontrada';
import AdicionarCnpj from '@pages/AdicionarCnpj';
import AdicionarCelular from '@pages/AdicionarCelular';
import AdicionarEmail from '@pages/AdicionarEmail';
import ColaboradorDetalhes from '@pages/Colaboradores/detalhes';
import ColaboradorRegistro from '@pages/Colaboradores/Registro/registro';
import ColaboradorRegistroSucesso from '@pages/Colaboradores/Registro/sucesso';
import Departamentos from '@pages/Departamentos';
import DepartamentoDetalhes from '@pages/Departamentos/detalhes';
import Premiacoes from '@pages/Premiacoes';
import PremiacaoDetalhes from '@pages/Premiacoes/detalhes';
import PremiacaoRegistro from '@pages/Premiacoes/registro';
import PremiacaoSelecaoPremiados from './pages/Premiacoes/selecao-premiados';
import PremiacaoEditarValor from './pages/Premiacoes/editar-valor';
import Despesas from './pages/Despesas';
import DespesaAdiantarSaldo from './pages/Despesas/adiantar-saldo';
import DespesaSelecionarTipoAdiantamento from './pages/Despesas/selecao-tipo-adiantamento';
import DespesaSelecionarAlvoAdiantamento from './pages/Despesas/selecao-alvo-adiantamento';
import DespesaEditarValor from './pages/Despesas/editar-valor';
import DespesaDetalhesAdiantamento from './pages/Despesas/detalhes-adiantamento';
import DespesaDetalhes from './pages/Despesas/detalhes';
import Cartoes from './pages/Cartoes';
import CartaoDetalhes from './pages/Cartoes/detalhes';
import CartaoSolicitarSegundaVia from './pages/Cartoes/solicitar-segunda-via';
import Beneficios from './pages/Beneficios';
import BeneficioOndeUsar from './pages/Beneficios/onde-usar';
import BeneficioSelecionarTipoRecarga from './pages/Beneficios/selecao-tipo-recarga';
import BeneficioSelecionarAlvoRecarga from './pages/Beneficios/selecao-alvo-recarga';
import BeneficioEditarValor from './pages/Beneficios/editar-valor';
import { SessaoUsuarioProvider } from "./contexts/SessaoUsuario";
import Extrato from './pages/Extrato';

function AppRouter() {
  
  return (
    <BrowserRouter>
      <SessaoUsuarioProvider>
        <Routes>
            <Route path="/primeiro-acesso" element={<PrimeiroAcessoCommon/>}>
              <Route index element={<PrimeiroAcesso />} />
              <Route path="senha-acesso/" element={<SenhaDeAcesso />} />
            </Route>
            <Route path="/login" element={<Publico/>}>
              <Route index element={<Login />} />
              <Route path="selecionar-empresa" element={<SelecionarEmpresa />} />
            </Route>
            <Route path="/esqueci-a-senha" element={<Publico/>}>
              <Route index element={<EsqueciASenha />} />
              <Route path="seguranca" element={<Seguranca />} />
              <Route path="redefinir" element={<RedefinirSenha />} />
            </Route>

            <Route path="/" element={<Autenticado/>}>
              <Route index element={<Dashboard />} />
              <Route path="colaborador" element={<Colaboradores />} >
                  <Route index element={<ColaboradoresCadastrados />} />
                  <Route path="aguardando-cadastro" element={<ColaboradoresAguardando />} />
                  <Route path="desativados" element={<ColaboradoresDesativados />} />
              </Route>
              <Route path="colaborador/detalhes/:id" element={<ColaboradorDetalhes />} />
              <Route path="colaborador/registro" element={<ColaboradorRegistro />} />
              <Route path="colaborador/registro/sucesso" element={<ColaboradorRegistroSucesso />} />

              <Route path="extrato" element={<Extrato />} />
            
              <Route path="departamento" element={<Departamentos />} />
              <Route path="departamento/detalhes/:id" element={<DepartamentoDetalhes />} />
            
              <Route path="premiacao" element={<Premiacoes />} />
              <Route path="premiacao/detalhes" element={<PremiacaoDetalhes />} />
              <Route path="premiacao/registro" element={<PremiacaoRegistro />} />
              <Route path="premiacao/editar-valor" element={<PremiacaoEditarValor />} />
              <Route path="premiacao/selecao-premiados" element={<PremiacaoSelecaoPremiados />} />
              
              <Route path="despesa" element={<Despesas />} />
              <Route path="despesa/adiantar-saldo" element={<DespesaAdiantarSaldo />} />
              <Route path="despesa/selecao-tipo-adiantamento" element={<DespesaSelecionarTipoAdiantamento />} />
              <Route path="despesa/selecao-alvo-adiantamento" element={<DespesaSelecionarAlvoAdiantamento />} />
              <Route path="despesa/editar-valor" element={<DespesaEditarValor />} />
              <Route path="despesa/detalhes-adiantamento" element={<DespesaDetalhesAdiantamento />} />
              <Route path="despesa/detalhes" element={<DespesaDetalhes />} />
              
              <Route path="cartao" element={<Cartoes />} />
              <Route path="cartao/detalhes" element={<CartaoDetalhes />} />
              <Route path="cartao/solicitar-segunda-via" element={<CartaoSolicitarSegundaVia />} />
              
              <Route path="beneficio" element={<Beneficios />} />
              <Route path="beneficio/onde-usar" element={<BeneficioOndeUsar />} />
              <Route path="beneficio/selecao-tipo-recarga" element={<BeneficioSelecionarTipoRecarga />} />
              <Route path="beneficio/selecao-alvo-recarga" element={<BeneficioSelecionarAlvoRecarga />} />
              <Route path="beneficio/editar-valor" element={<BeneficioEditarValor />} />

              <Route path="adicionar-cnpj" element={<AdicionarCnpj />} />
              <Route path="adicionar-celular" element={<AdicionarCelular />} />
              <Route path="adicionar-email" element={<AdicionarEmail />} />
            </Route>
            <Route path="*" element={<NaoEncontrada />}></Route>
          </Routes>
        </SessaoUsuarioProvider>
    </BrowserRouter>
  )
}

export default AppRouter