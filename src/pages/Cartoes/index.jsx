import Botao from '@components/Botao'
import BotaoGrupo from '@components/BotaoGrupo'
import { GrAddCircle } from 'react-icons/gr'
import styles from './Cartoes.module.css'
import styled from "styled-components"
import { Link, Outlet, useLocation } from "react-router-dom"
import { FaDownload } from 'react-icons/fa'
import { useState } from 'react'

const ConteudoFrame = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
`

function Cartoes() {

    const location = useLocation();
    console.log(location.pathname)

    return (
        <ConteudoFrame>
            <BotaoGrupo align="space-between">
                <BotaoGrupo>
                    <Link className={styles.link} to="/cartao">
                        <Botao estilo={location.pathname === '/cartao'?'black':''} size="small" tab>Cartões Solicitados</Botao>
                    </Link>
                    <Link className={styles.link} to="/cartao/ativados">
                        <Botao estilo={location.pathname === '/cartao/ativados'?'black':''} size="small" tab>Cartões Ativados</Botao>
                    </Link>
                </BotaoGrupo>
                <BotaoGrupo align="center">
                    <Link to="/colaborador/registro">
                        <Botao estilo="vermilion" size="small" tab><GrAddCircle className={styles.icon}/> Cadastrar Individualmente</Botao>
                    </Link>
                </BotaoGrupo>
            </BotaoGrupo>
            <Outlet/>
        </ConteudoFrame>
    )
}

export default Cartoes