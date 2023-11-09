import http from '@http';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArmazenadorToken } from '../utils';

const usuarioInicial = {
    email: '',
    password: '',
    remember: false,
    code: []
}

export const SessaoUsuarioContext = createContext({
    usuario: usuarioInicial,
    erros: {},
    setRemember: () => null,
    setEmail: () => null,
    setPassword: () => null,
    setCode: () => null,
    solicitarCodigo: () => null,
    submeterLogin: () => null
})

export const useSessaoUsuarioContext = () => {
    return useContext(SessaoUsuarioContext);
}

export const SessaoUsuarioProvider = ({ children }) => {

    const navegar = useNavigate()

    const [usuario, setUsuario] = useState(usuarioInicial)

    const setRemember = (remember) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                remember
            }
        })
    }
    const setEmail = (email) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                email
            }
        })
    }
    const setPassword = (password) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                password
            }
        })
    }  
    const setCode = (code) => {
        setUsuario(estadoAnterior => {
            return {
                ...estadoAnterior,
                code
            }
        })
    }

    const solicitarCodigo = () => {

        http.post('api/auth/code', usuario)
            .then(() => {

            })
            .catch(erro => {
                console.error(erro)
            })
    }

    const submeterLogin = () => {

        var sendCode = '';

        usuario.code.map(item => {
            if(typeof item.preenchimento !== undefined)
            {
                sendCode += item.preenchimento
            }
        })

        usuario.code = sendCode

        http.post('api/auth/token', usuario)
            .then((response) => {
                ArmazenadorToken.definitToken(
                    response.data.data.token_access,
                    response.data.data.expires_at
                )
                navegar('/login/selecionar-empresa')
            })
            .catch(erro => {
                console.error(erro)
            })
    }


    const contexto = {
        usuario,
        setRemember,
        setEmail,
        setPassword,
        setCode,
        submeterLogin,
        solicitarCodigo
    }

    return (<SessaoUsuarioContext.Provider value={contexto}>
        {children}
    </SessaoUsuarioContext.Provider>)
}