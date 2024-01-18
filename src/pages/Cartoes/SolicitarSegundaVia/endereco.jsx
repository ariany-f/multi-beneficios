import Frame from '@components/Frame'
import Titulo from '@components/Titulo'
import SubTitulo from '@components/SubTitulo'
import Botao from "@components/Botao"
import Texto from '@components/Texto'
import styles from './SolicitarSegundaVia.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

const ContainerButton = styled.div`
    display: flex;
    width: 100%;
    padding: 20px 0;
    justify-content: space-between;
    & button {
        width: initial;
    }
`

function CartaoSolicitarSegundaViaEndereco() {

    const { id } = useParams()
    const navegar = useNavigate()

    return (
        <Frame gap="32px">
            <Titulo>
                <h6>Endereço de entrega</h6>
                <SubTitulo>
                    Confirme o endereço de entrega do novo cartão:
                </SubTitulo>
            </Titulo>
            <div className={styles.wrapper_cards}>
                
            </div>
            <ContainerButton>
                <Botao aoClicar={() => navegar(-1)} estilo="neutro" formMethod="dialog" size="medium" filled>Voltar</Botao>
                <Botao aoClicar={() => {}} estilo="vermilion" size="medium" filled>Continuar</Botao>
            </ContainerButton>
        </Frame>
    )
}
export default CartaoSolicitarSegundaViaEndereco