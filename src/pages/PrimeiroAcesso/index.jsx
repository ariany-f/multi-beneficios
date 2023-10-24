import Botao from "@components/Botao"
import CampoTexto from "@components/CampoTexto"
import Frame from "@components/Frame"
import SubTitulo from "@components/SubTitulo"
import Texto from "@components/Texto"
import Titulo from "@components/Titulo"
import { useState } from "react"
import { Link } from "react-router-dom"

function PrimeiroAcesso() {
    const [email, setEmail] = useState('')
    const [codigo, setCodigo] = useState('')

    return (
        <>
            <Titulo>
                <h2>Bem-vindo, RH!</h2>
                <SubTitulo>
                    Estamos muito felizes em recebê-lo aqui. Este é o seu primeiro passo, para começar informe seu e-mail corporativo:
                </SubTitulo>
            </Titulo>
            <Frame>
                <CampoTexto name="email" valor={email} setValor={setEmail} type="email" label="E-mail corporativo" placeholder="Digite seu e-mail corporativo" />
                <CampoTexto name="codigo" valor={codigo} setValor={setCodigo} label="Código de acesso" placeholder="Digite o código de acesso" />
                <Frame estilo="vermilion" padding="16px">
                    <Texto>O código de acesso foi enviado parao e-mail corporativo cadastrado!</Texto>
                </Frame>
            </Frame>
            <Link to="/primeiro-acesso/senha-acesso">
                <Botao estilo="vermilion" size="medium" filled>Confirmar</Botao>
            </Link>
        </>
    )
}

export default PrimeiroAcesso