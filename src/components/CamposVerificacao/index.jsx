import styles from './CamposVerificacao.module.css'
import styled from 'styled-components'

const Campo = styled.input`
    border-radius: 8px;
    outline: .4px solid var(--neutro-200);
    background: var(--background-label);
    padding: 22px 16px;
    border: none;
    display: flex;
    align-items: center;
    align-self: stretch;
    font-weight: 600;
    margin-top: 10px;

    &:active {
        outline-color: var(--primaria);
        background: var(--white);
    }

    &:focus {
        outline-color: var(--primaria);
        background: var(--white);
    }
`

function CamposVerificacao({ label, valor, setValor, numeroDigitos = 6 }) {
    
    const digitosDisponiveis = [];

    for(var i=0;i<numeroDigitos;i++)
    {
        digitosDisponiveis[i] = {id: (i+1), preenchimento: valor[i]?.preenchimento}
    }

    function changeValores(evento, value, id) {
        
        setValor(digitosDisponiveis.map(campo => {
            if(campo.id === id) {
                campo.preenchimento = value;
            }
            return campo;
        }))
    }

    const handleKeyPress = (e) => {
        const active = document.activeElement;
        
        if (e.keyCode !== 8) {
            if (active?.nextElementSibling) {
                active.nextElementSibling.focus();
            }
        }
        else
        {
            if (active?.previousElementSibling) {
                active.previousElementSibling.focus();
            }
        }
    }

    return (
        <div className={styles.inputContainer}>
            {(label) ?
                <label className={styles.label}>{label}</label>
            : ''}
            <div className={styles.inputs}>
                {digitosDisponiveis.map((digito, index) => {
                    return (
                        <Campo key={index+1} maxLength={1} name="digito" id={index+1} type="text" value={(valor[index]?.preenchimento) ?? ''} onChange={evento => changeValores(evento, evento.target.value, index+1)} onKeyUp={(evento) => handleKeyPress(evento)}></Campo>
                    )
                })}
            </div>    
        </div>
    )
}

export default CamposVerificacao