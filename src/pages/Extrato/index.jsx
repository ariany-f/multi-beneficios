import http from '@http'
import { useEffect, useState } from 'react'
import Container from '@components/Container'
import Botao from '@components/Botao'
import Texto from '@components/Texto'
import Frame from "@components/Frame"
import BotaoGrupo from '@components/BotaoGrupo'
import { GrAddCircle } from 'react-icons/gr'
import styles from './Extrato.module.css'
import { Skeleton } from 'primereact/skeleton'
import { Link } from 'react-router-dom'
import { MdPix } from 'react-icons/md'
import { FaBarcode } from 'react-icons/fa'
import { RiBankCardLine } from 'react-icons/ri'

let Real = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const metodosPagamento = [
    {
        "id": 1,
        "name": "Pix",
        "icone": <MdPix />
    },
    {
        "id": 2,
        "name": "Boleto",
        "icone": <FaBarcode />
    },
    {
        "id": 3,
        "name": "Cartão de Crédito",
        "icone": <RiBankCardLine />
    }
]

function Extrato() {

    const [dashboardData, setDashboardData] = useState({
            userDashResource: {
                total_benefit_balance: 0,
                notifications: null,
                name: '',
                public_id: '',
                status: 1
            },
            transactions: [],
            lastTransaction: []
    })

    const setSaldo = (saldo) => {
        setDashboardData(estadoAnterior => {
            return {
                ...estadoAnterior,
                saldo
            }
        })
    }

    useEffect(() => {
        /**
         * Dados necessários para exibição no painel do usuário
         */
        http.get('api/dashboard/user')
        .then(response => {
            setDashboardData(response.data)
        })
        .then(() => {
            setSaldo(dashboardData.userDashResource.total_benefit_balance)
        })
        .catch(erro => {
            console.error(erro)
        })

    }, [])


    return (
        <Frame>
            <Container gap="32px">
                <div className={styles.saldo}>
                    <p>Saldo disponível</p>
                    {dashboardData?.userDashResource.public_id ?
                        <h2>{Real.format(dashboardData?.userDashResource.total_benefit_balance)}</h2>
                    : <Skeleton variant="rectangular" width={200} height={50} />
                    }
                </div>
                
                <BotaoGrupo align="end">
                    <BotaoGrupo>
                        <Texto width={'350px'}>Você pode fazer suas recargas utilizando essas formas de pagamento:</Texto>
                        {metodosPagamento.map(item => {
                            return (
                                <div key={item.id} className={styles.extrato_grid}>
                                    {item.icone}
                                    <p>{item.name}{item.name === 'Cartão de Crédito' ? <small> em até 12x</small> : ''}</p>
                                </div>
                            )
                        })}
                        <Link to="/">
                            <Botao estilo="vermilion" size="small" tab><GrAddCircle className={styles.icon}/> Adicionar Saldo</Botao>
                        </Link>
                    </BotaoGrupo>
                </BotaoGrupo>
            </Container>
        </Frame>
    )
}

export default Extrato