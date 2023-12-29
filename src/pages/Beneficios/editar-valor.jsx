import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import BotaoGrupo from "@components/BotaoGrupo"
import Botao from "@components/Botao"
import Frame from "@components/Frame"
import Texto from "@components/Texto"
import CampoTexto from "@components/CampoTexto"
import BotaoSemBorda from "@components/BotaoSemBorda"
import Titulo from "@components/Titulo"
import SubTitulo from "@components/SubTitulo"
import { Skeleton } from 'primereact/skeleton'
import { FaPencilAlt } from 'react-icons/fa'
import { MdCancel } from "react-icons/md"
import Loading from "@components/Loading"
import styles from './Beneficios.module.css'
import { Toast } from 'primereact/toast'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import styled from 'styled-components';
import { useRecargaBeneficiosContext } from '../../contexts/RecargaBeneficios';

const ContainerButton = styled.div`
    display: flex;
    width: 100%;
    padding: 20px;
    justify-content: space-between;
    & button {
        width: initial;
    }
`

const LadoALado = styled.div`
    display: flex;
    gap: 24px;
    & span {
        display: flex;
        align-items: center;
    }
`

function BeneficioEditarValor() {

    const navegar = useNavigate()
    const {
        recarga,
        setNome
    } = useRecargaBeneficiosContext()
    const [loading, setLoading] = useState(false)
    const [edicaoAberta, setEdicaoAberta] = useState(false)
    const toast = useRef(null)

    useEffect(() => {
      
    }, [])

    const editarRecarga = (evento) => {
        if (evento.key === 'Enter') {
            evento.preventDefault()
            setEdicaoAberta(false)
        }
    }

    return (
        <Frame>
            <Toast ref={toast} />
            <Loading opened={loading} />
            <Texto weight={500} size="12px">Nome da recarga</Texto>
            {recarga ?
                <>
                    <BotaoGrupo align="space-between">
                        {
                            edicaoAberta ? 
                                <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center', gap: '8px'}}>
                                    <input autoFocus onKeyUp={(evento) => editarRecarga(evento)} style={{fontSize: '28px',fontWeight: '700', width: '70%', boxSizing: 'border-box', height: '35px'}} type="text" value={recarga.name} onChange={(evento) => setNome(evento.target.value)} placeholder={recarga.name}/>
                                    <MdCancel style={{cursor: 'pointer', fill: 'var(--primaria)'}} size={24} onClick={() => setEdicaoAberta(false)} />
                                </div>
                            :
                            <>
                                <Titulo>
                                    <h3>{recarga.name}</h3>
                                </Titulo>
                                <BotaoSemBorda $color="var(--error)">
                                    <FaPencilAlt /><Link onClick={() => setEdicaoAberta(true)} className={styles.link}>Editar</Link>
                                </BotaoSemBorda>
                            </>
                        }
                    
                    </BotaoGrupo>
                    <div style={{width: '100%', borderBottom: '1px dotted var(--neutro-300)', marginTop: '18px', marginBottom: '18px'}} ></div>
              
                    <ContainerButton>
                        <Botao aoClicar={() => navegar(-1)} estilo="neutro" formMethod="dialog" size="medium" filled>Voltar</Botao>
                    </ContainerButton>
                </>
            : <Skeleton variant="rectangular" width={300} height={60} />
            }
        </Frame>
    )
}

export default BeneficioEditarValor