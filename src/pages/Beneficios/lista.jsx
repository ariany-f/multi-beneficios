import http from '@http'
import { useEffect, useState } from "react"
import BotaoGrupo from '@components/BotaoGrupo'
import BotaoSemBorda from '@components/BotaoSemBorda'
import Botao from '@components/Botao'
import Loading from '@components/Loading'
import Container from '@components/Container'
import { GrAddCircle } from 'react-icons/gr'
import styles from './Beneficios.module.css'
import { FaMapPin } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DataTableBeneficios from '@components/DataTableBeneficios'

function Beneficios() {

    const [loading, setLoading] = useState(false)
    const [beneficios, setBeneficios] = useState([])

    useEffect(() => {
        if(beneficios.length === 0)
        {
            setLoading(true)
            http.get('api/dashboard/benefit')
                .then(response => {
                    setLoading(false)
                    if(response.data.benefits)
                    {
                        setBeneficios(response.data.benefits)
                    }
                })
                .catch(erro => {
                    console.log(erro)
                    setLoading(false)
                })
        }
    }, [beneficios])

    return (
        <>
            <Loading opened={loading} />
            <BotaoGrupo align="space-between">
                <BotaoSemBorda color="var(--primaria)">
                    <FaMapPin/><Link to={'/beneficio/onde-usar'} className={styles.link}>Onde usar</Link>
                </BotaoSemBorda>
                <Link to="/beneficio/selecao-tipo-recarga">
                    <Botao estilo="vermilion" size="small" tab><GrAddCircle className={styles.icon}/> Disponibilizar benefícios</Botao>
                </Link>
            </BotaoGrupo>
            <Container>
                <DataTableBeneficios beneficios={beneficios} />
            </Container>
        </>
    )
}

export default Beneficios