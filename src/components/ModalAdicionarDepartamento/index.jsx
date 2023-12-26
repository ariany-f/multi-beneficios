import Botao from "@components/Botao"
import Frame from "@components/Frame"
import CampoTexto from "@components/CampoTexto"
import Titulo from "@components/Titulo"
import SubTitulo from "@components/SubTitulo"
import { RiCloseFill } from 'react-icons/ri'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import styles from './ModalAdicionarDepartamento.module.css'
import http from '@http';

const Overlay = styled.div`
    background-color: rgba(0,0,0,0.80);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

const AdicionarCnpjBotao = styled.div`
    font-size: 14px;
    font-weight: 700;
    color: var(--primaria);
    padding: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
`

const DialogEstilizado = styled.dialog`
    display: flex;
    width: 40vw;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    border: none;
    margin: 0 auto;
    top: 22vh;
    padding: 24px;
    & button.close {
        & .fechar {
            box-sizing: initial;
            fill: var(--primaria);
            stroke: var(--primaria);
            color: var(--primaria);
        }
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
        border: none;
        background-color: initial;
    }
    & .icon {
        margin-right: 5px;
        box-sizing: initial;
        fill: var(--primaria);
        stroke: var(--primaria);
        color: var(--primaria);
    }
    & .frame:nth-of-type(1) {
        gap: 24px;
        & .frame {
            margin-bottom: 24px;
            & p{
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            & b {
                font-weight: 800;
                font-size: 14px;
            }
        }
    }
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
`;

const Item = styled.div`
    cursor: pointer;
    border-width: 1px;
    border-style: solid;
    border-radius: 16px;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
    width: 94%;
    border-color: ${ props => props.$active ? 'var(--primaria)' : 'var(--neutro-200)' };
`;

const CardText = styled.div`
    display: flex;
    padding: 10px 16px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    font-size: 14px;
    background: var(--neutro-100);
`

function ModalAdicionarDepartamento({ opened = false, aoClicar, aoFechar, aoSucesso }) {

    const [nome, setNome] = useState('')
    const [classError, setClassError] = useState([])

    const navegar = useNavigate()
  
    const adicionarDepartamento = () => {
        const data = {
            status: 10,
            name: nome,
            description: ''
        }
        
        http.post('api/dashboard/department', data)
            .then((response) => {
                if(response.status === 'success')
                {
                    aoFechar()
                    aoSucesso.current.show({ severity: 'info', summary: 'Sucesso', detail: response.message, life: 3000 });
                    setTimeout(() => {
                        navegar(`/departamento/${response.public_id}/adicionar-colaboradores`)
                    }, 500);
                }
            })
            .catch(erro => {
                console.error(erro)
            })
    }

    return(
        <>
            {opened &&
            <>
                <Overlay>
                    <DialogEstilizado id="modal-add-departamento" open={opened}>
                        <Frame>
                            <Titulo>
                                <form method="dialog">
                                    <button className="close" onClick={aoFechar} formMethod="dialog">
                                        <RiCloseFill size={20} className="fechar" />  
                                    </button>
                                </form>
                                <h6>Criar departamento</h6>
                                <SubTitulo>
                                    Digite o nome do seu novo departamento:
                                </SubTitulo>
                            </Titulo>
                        </Frame>
                        
                        <Frame padding="24px 0px">
                            <CampoTexto 
                                    numeroCaracteres={50}
                                    camposVazios={classError} 
                                    valor={nome} 
                                    type="text" 
                                    setValor={setNome} 
                                    placeholder="ex. Administrativo"
                                    label="Nome do departamento" 
                                />
                        </Frame>
                        <form method="dialog">
                            <div className={styles.containerBottom}>
                                <Botao aoClicar={aoFechar} estilo="neutro" formMethod="dialog" size="medium" filled>Voltar</Botao>
                                <Botao aoClicar={adicionarDepartamento} estilo="vermilion" size="medium" filled>Confirmar</Botao>
                            </div>
                        </form>
                    </DialogEstilizado>
                </Overlay>
            </>
            }
        </>
    )
}

export default ModalAdicionarDepartamento