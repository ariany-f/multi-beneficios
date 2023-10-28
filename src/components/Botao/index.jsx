import './Botao.css';
import styled from "styled-components";

const BotaoEstilizado = styled.button`
    display: flex;
    border-radius: 8px;
    cursor: pointer;
    transition: all .1s linear;
    border: none;
    gap: 8px;
    padding: 16px 24px;
    font-family: var(--fonte-primaria);
    font-size: 16px;
    font-weight: 700;
    width: 100%;
    line-height: 150%; /* 24px */
    justify-content: center;
    align-items: center;
`

function Botao( {children, estilo = 'vermilion', model = 'filled', size = 'medium', tab = false} ) {

    const classes = `${estilo} ${model} ${size} ${tab ? 'tab' : ''}`;
    
    return (
        <BotaoEstilizado className={classes}>
            {children}
        </BotaoEstilizado>
    )
}

export default Botao