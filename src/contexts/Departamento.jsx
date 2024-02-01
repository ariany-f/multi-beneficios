import http from '@http'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const departamentoInicial = {
    name: "",
    description: "",
    status: 10,
    public_id: '',
    collaborators: [],
    collaborators_count: 0,
}

export const DepartamentoContext = createContext({
    departamento: departamentoInicial,
    erros: {},
    setDescription: () => null,
    setDepartamento: () => null,
    setColaboradores: () => null,
    setNumeroColaboradores: () => null,
    setNome: () => null,
    submeterDepartamento: () => null
})

export const useDepartamentoContext = () => {
    return useContext(DepartamentoContext);
}

export const DepartamentoProvider = ({ children }) => {

    const navegar = useNavigate()
    const [departamento, setDepartamento] = useState(departamentoInicial)
    
    const setColaboradores = (collaborators) => {
        
        if(collaborators && Object.keys(collaborators).length > 0)
        {
            if(departamento.collaborators && Object.keys(departamento.collaborators).length > 0)
            {
                if(collaborators && Object.keys(collaborators).length > 0)
                {
                    departamento.collaborators.map(item => {
                        collaborators.filter(function(itm){
                            return itm.public_id !== item.public_id
                        });
                    })

                    setNumeroColaboradores(Object.keys(collaborators).length)
                    setDepartamento(estadoAnterior => {
                        return {
                            ...estadoAnterior,
                            collaborators
                        }
                    })
                }
            }
            else
            {
                setNumeroColaboradores(Object.keys(collaborators).length)
                setDepartamento(estadoAnterior => {
                    return {
                        ...estadoAnterior,
                        collaborators
                    }
                })
            }
        }
        else
        {
            setNumeroColaboradores(0)
            setDepartamento(estadoAnterior => {
                return {
                    ...estadoAnterior,
                    collaborators
                }
            })
        }
    }
    const setNumeroColaboradores = (collaborators_count) => {
        setDepartamento(estadoAnterior => {
            return {
                ...estadoAnterior,
                collaborators_count
            }
        })
    }
    const setNome = (name) => {
        setDepartamento(estadoAnterior => {
            return {
                ...estadoAnterior,
                name
            }
        })
    }
    const setDescription = (description) => {
        setDepartamento(estadoAnterior => {
            return {
                ...estadoAnterior,
                description
            }
        })
    }
    
    const submeterDepartamento = () => {
        if(departamento.public_id && departamento.public_id !== ''){
            return http.put(`api/dashboard/department/${departamento.public_id}`, departamento)
            .then((response) => {
                return response
            })
            .catch(erro => {
                return erro.response.data
            })
        }
        else{
            return http.post('api/dashboard/department', departamento)
            .then((response) => {
                return response
            })
            .catch(erro => {
                return erro.response.data
            })
        }
    }

    const contexto = {
        departamento,
        setDepartamento,
        setColaboradores,
        setDescription,
        setNumeroColaboradores,
        setNome,
        submeterDepartamento
    }

    return (<DepartamentoContext.Provider value={contexto}>
        {children}
    </DepartamentoContext.Provider>)
}