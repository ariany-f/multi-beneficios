import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import BotaoVoltar from "@components/BotaoVoltar"
import BotaoGrupo from "@components/BotaoGrupo"
import Botao from "@components/Botao"
import Titulo from "@components/Titulo"
import Frame from "@components/Frame"
import Container from "@components/Container"
import styles from './Colaboradores.module.css'
import { Skeleton } from 'primereact/skeleton'
import http from '@http'
import { useEffect, useState } from 'react';

function ColaboradorDetalhes() {

    let { id } = useParams()
    const location = useLocation();
    const [colaborador, setColaborador] = useState({})

    useEffect(() => {
        http.get(`api/dashboard/collaborator/${id}`)
            .then(response => {
                if(response.collaborator)
                {
                    setColaborador(response.collaborator)
                }
            })
            .catch(erro => console.log(erro))
    }, [])

    return (
        <Frame>
            <Container gap="32px">
                <BotaoVoltar linkFixo="/colaborador" />
                    {colaborador.name ? 
                        <Titulo>
                            <h3>{colaborador.name}</h3>
                        </Titulo>
                    : <Skeleton variant="rectangular" width={300} height={40} />
                    }
                <BotaoGrupo>
                    <Link className={styles.link} to={`/colaborador/detalhes/${id}`}>
                        <Botao estilo={location.pathname == `/colaborador/detalhes/${id}` ? 'black':''} size="small" tab>Dados Pessoais</Botao>
                    </Link>
                    <Link className={styles.link} to={`/colaborador/detalhes/${id}/cartoes`}>
                        <Botao estilo={location.pathname == `/colaborador/detalhes/${id}/cartoes` ? 'black':''} size="small" tab>Cartões</Botao>
                    </Link>
                    <Link className={styles.link} to={`/colaborador/detalhes/${id}/saldo`}>
                        <Botao estilo={location.pathname == `/colaborador/detalhes/${id}/saldo` ? 'black':''} size="small" tab>Saldo em benefícios</Botao>
                    </Link>
                    <Link className={styles.link} to={`/colaborador/detalhes/${id}/carteiras`}>
                        <Botao estilo={location.pathname == `/colaborador/detalhes/${id}/carteiras` ? 'black':''} size="small" tab>Carteiras</Botao>
                    </Link>
                </BotaoGrupo>
                <Outlet/>
            </Container>
        </Frame>
    )
}

export default ColaboradorDetalhes