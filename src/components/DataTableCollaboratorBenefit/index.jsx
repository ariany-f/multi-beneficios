import { DataTable } from 'primereact/datatable'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Column } from 'primereact/column'
import './DataTable.css'
import Texto from '@components/Texto'
import QuestionCard from '@components/QuestionCard'
import CampoTexto from '@components/CampoTexto'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { AiFillQuestionCircle } from 'react-icons/ai'

let Real = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

function DataTableCollaboratorBenefit({ beneficios }) {
    
    const navegar = useNavigate()
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    })

    const onGlobalFilterChange = (value) => {
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    
    function verDetalhes(value)
    {
        navegar(`/beneficio/pagamento/${value.public_id}`)
    }

    const representativeAmountTemplate = (rowData) => {
        return <b>{(Real.format(rowData.amount_flexible + rowData.amount_fixed))}</b>
    };

    const representativeFlexibleValueTemplate = (rowData) => {
        return <b>{(Real.format(rowData.amount_flexible))}</b>
    };

    const representativeDescriptionTemplate = (rowData) => {
        return (
            <>
                <Texto weight={700} width={'100%'}>
                    {rowData.amount_flexible}
                </Texto>
                <div style={{marginTop: '10px', width: '100%', fontWeight: '500', display: 'flex', color: 'var(--neutro-500)'}}>
                    Colaboradores:&nbsp;<p style={{fontWeight: '600', color: 'var(--neutro-500)'}}>{rowData.users.length}</p>
                </div>
            </>
        )
    };

    const representativeFixedValueTemplate = (rowData) => {
        return <b>{(Real.format(rowData.amount_fixed))}</b>
    }
    const representativeSendedTemplate = (rowData) => {
        return <></>
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span className="p-input-icon-left">
                    <CampoTexto  width={'320px'} valor={globalFilterValue} setValor={onGlobalFilterChange} type="search" label="" placeholder="Digite um nome de pedido" />
                </span>
                <QuestionCard alinhamento="end" element={<AiFillQuestionCircle className="question-icon" size={18} />}>
                    <p style={{fontSize: '14px', marginLeft: '8px'}}>Como funciona esses benefícios?</p>
                </QuestionCard>
            </div>
            <DataTable value={beneficios} filters={filters} globalFilterFields={['description']} emptyMessage="Não foram encontradas recargas" paginator rows={5}  onSelectionChange={(e) => verDetalhes(e.value)} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '65vw' }}>
                <Column body={representativeDescriptionTemplate} header="Benefício" style={{ width: '35%' }}></Column>
                <Column body={representativeFixedValueTemplate} header="Valor Fixo" style={{ width: '15%' }}></Column>
                <Column body={representativeFlexibleValueTemplate} header="Valor Flexível" style={{ width: '10%' }}></Column>
                <Column body={representativeAmountTemplate} header="Total(R$)" style={{ width: '20%' }}></Column>
                <Column body={representativeSendedTemplate} header="Ação" style={{ width: '15%' }}></Column>
                <Column field="" header="" style={{ width: '5%' }}  body={<MdOutlineKeyboardArrowRight/>}></Column>
            </DataTable>
        </>
    )
}

export default DataTableCollaboratorBenefit