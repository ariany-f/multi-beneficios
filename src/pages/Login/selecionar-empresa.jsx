import Botao from "@components/Botao"
import Titulo from "@components/Titulo"
import RadioButton from "@components/RadioButton"
import styled from "styled-components"
import { useState } from "react"
import { RiBuildingLine } from "react-icons/ri"
import styles from './Login.module.css'
import ModalToken from '@components/ModalToken'
import { useSessaoUsuarioContext } from "../../contexts/SessaoUsuario"
import { useNavigate } from "react-router-dom"

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

function SelecionarEmpresa() {

    const navegar = useNavigate()

    const { 
        usuario,
        setCode,
        setCompanyPublicId,
        submeterLogin,
        solicitarCodigo
    } = useSessaoUsuarioContext()

    if(usuario.companies.length === 0)
    {
        navegar('/login')
    }

    const [modalOpened, setModalOpened] = useState(false)
    const [empresas, setEmpresas] = useState(usuario.companies);
    const [selected, setSelected] = useState(empresas[0]?.public_id)

    function handleSelectChange(value) {
        setSelected(value);
    }

    const selectCompany = () => {
        setCompanyPublicId(selected)
        solicitarCodigo()
        setModalOpened(true)
    }
    
    const sendCode = () => {
        submeterLogin()
    }

    return (
        <>
            <Titulo>
                <h2>Selecione uma empresa</h2>
            </Titulo>
            {empresas.length > 0 &&
                <>
                    <Wrapper>
                        {empresas.map((empresa, idx) => {
                            return (
                                <Item 
                                    key={idx} 
                                    $active={selected === empresa.public_id}
                                    onClick={public_id => handleSelectChange(empresa.public_id)}>
                                    <div className={styles.cardEmpresa}>
                                        {(selected === empresa.public_id) ?
                                            <RiBuildingLine className={styles.buildingIcon + ' ' + styles.vermilion} size={20} />
                                            : <RiBuildingLine className={styles.buildingIcon} size={20} />
                                        }
                                        <div className={styles.DadosEmpresa}>
                                            <h6>{empresa.name}</h6>
                                            <div>{empresa.document}</div>
                                        </div>
                                    </div>
                                    <RadioButton
                                        value={empresa.public_id}
                                        checked={selected === empresa.public_id}
                                        onSelected={(public_id) => handleSelectChange}
                                    />
                                </Item>
                            )
                        })}
                    </Wrapper>
                    <Botao estilo="vermilion" size="medium" filled aoClicar={selectCompany} >Confirmar</Botao>
                    <ModalToken usuario={usuario} aoReenviar={solicitarCodigo} aoFechar={() => setModalOpened(false)} aoClicar={sendCode} setCode={setCode} opened={modalOpened} />
                </>
            }
        </>
    )
}

export default SelecionarEmpresa