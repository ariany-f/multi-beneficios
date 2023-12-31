import http from '@http'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Frame from "@components/Frame"
import DataTableColaboradores from '@components/DataTableColaboradores'

function DepartamentoListaColaboradores() {

    let { id } = useParams()
    const [departamento, setDepartamento] = useState(null)
    const [clbdr, setClbdr] = useState([])

    useEffect(() => {
        http.get(`api/dashboard/department/${id}`)
            .then(response => {
                setDepartamento(response.department)
            })
            .catch(erro => console.log(erro))
    }, [])
    
    useEffect(() => {
        if(departamento && !clbdr.length)
        {
            const obj = {}
            obj[departamento.name] = departamento.public_id
            http.get('api/dashboard/collaborator')
                .then(response => {
                    if(response.data.collaborators.length)
                    {
                        const filtered = response.data.collaborators.filter(colaborador => {
                            return (obj in colaborador.departments)
                        })
                        setClbdr(filtered)
                    }
                })
                .catch(erro => console.log(erro))
        }
    }, [departamento])
   
    return (
        <Frame>
            <DataTableColaboradores colaboradores={clbdr} />
        </Frame>
    )
}

export default DepartamentoListaColaboradores