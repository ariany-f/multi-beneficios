import Banner from "@components/Banner"
import Botao from "@components/Botao"
import MainSection from "@components/MainSection"
import Frame from "@components/Frame"
import MainContainer from "@components/MainContainer"
import SubTitulo from "@components/SubTitulo"
import Titulo from "@components/Titulo"
import PrecisoDeAjuda from "@components/PrecisoDeAjuda"
import BotaoVoltar from "@components/BotaoVoltar"
import { useState } from "react"
import CamposVerificacao from "@components/CamposVerificacao"
import { Link } from "react-router-dom"

function Seguranca() {
    
    const [codigo, setCodigo] = useState([])

    return (
        <MainSection>
            <Banner />
            <MainContainer>
                <Frame>
                    <BotaoVoltar />
                    <Titulo>
                        <h2>Segurança</h2>
                        <SubTitulo>
                            Enviamos um código token para o celular e e-mail cadastrados
                        </SubTitulo>
                    </Titulo>
                </Frame>
                <Frame>
                    <CamposVerificacao valor={codigo} setValor={setCodigo} label="Código de autenticação" />
                </Frame>
                <Link to="/esqueci-a-senha/redefinir">
                    <Botao estilo="vermilion" size="medium" filled>Confirmar</Botao>
                </Link>
                <PrecisoDeAjuda/>
            </MainContainer>
        </MainSection>
    )
}

export default Seguranca