import http from '@http'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Frame from "@components/Frame"

function DepartamentoConfiguracaoBeneficios() {

    let { id } = useParams()
    const [departamento, setDepartamento] = useState(null)

    useEffect(() => {
        http.get(`api/dashboard/department/${id}`)
            .then(response => {
                console.log(response)
                setDepartamento(response.department)
            })
            .catch(erro => console.log(erro))
    }, [])
   
    return (
        <Frame>
           
        </Frame>
    )
}

export default DepartamentoConfiguracaoBeneficios