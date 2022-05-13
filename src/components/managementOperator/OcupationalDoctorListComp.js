import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
// Prime components
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from 'primereact/toast';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { InputSwitch } from 'primereact/inputswitch';
// Services
import OperatorDataService from "../../service/OperatorDataService";
import StoreDataService from "../../service/StoreDataService";
import MachineryDataService from "../../service/MachineryDataService";

export const OcupationalDoctorListComp = observer((props) => {
    /*
    Variables
    */
    const dt = useRef(null);
    const toast = useRef(null);
    const [lstOperator, setLstOperator] = useState([]);
    const [visible, setVisible] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [lstStores, setLstStores] = useState([]);
    const [lstOperatorFilter, setLstOperatorFilter] = useState([]);
    const [machineryTypes, setMachineryType] = useState([]);
    const [serviceSelected, setServiceSelected] = useState(null);
    const [impairmentUpdate, setImpairmentUpdate] = useState([]);
    const [idCheck, setIdCheck] = useState(" ");
    
    /*
    Init
    */
    useEffect(() => {
        loadAvailables();
    }, []);

    /*
    Methods
    */
    const loadAvailables = () => {

        MachineryDataService.getServiceType().then((valid) => {
            //console.log("MachineryDataService: " + valid.data);
            setMachineryType(valid.data);

        });
        
        StoreDataService.queryStores().then((valid) => {
            if (valid.data && valid.data.success) {
                setLstStores(valid.data.obj);
            }
        });
        
    };

    const accept = () => {
        //console.log("e: " + impairmentUpdate.id);
        //console.log("e: " + impairmentUpdate.username);
        //console.log("e: " + serviceSelected.impairment);
        //console.log("e: " + serviceSelected.userpos);
        let UserposImpairments = {
            idImpairment: "",
            userpos: serviceSelected.userpos,
            impairment: serviceSelected.impairment,
            assistant: true
        };
        
        let _operators = [...lstOperator];
        OperatorDataService.updateImpairmentOperator(UserposImpairments).then((valid) => {
            _operators.map((operator) => {
                if (operator.id === impairmentUpdate.id) {
                    operator.skills = valid.data.obj
                }
            });
            setLstOperator(_operators);
        });
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: `${impairmentUpdate.username} actualizado`, life: 3000 });
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: `${impairmentUpdate.username} actualizado`, life: 3000 });
    };

    const onSkill = (rowData,e) => {
        setIdCheck(rowData.id + e.value.idSkill);
        let idSkill = "";
        rowData.skills.map((skill) => {
            if(skill.skill === e.value.skill){
                idSkill = skill.idSkill;
            }
        });

        let UserposImpairments = {
            idImpairment: idSkill,
            userpos: rowData.id,
            impairment: e.value.skill,
            assistant: false
        };

        setServiceSelected(UserposImpairments);
        setImpairmentUpdate(rowData);

        let _operators = [...lstOperator];
        if (e.checked) {
            OperatorDataService.removeImpairmentOperator(UserposImpairments).then((valid) => {
                _operators.map((operator) => {
                    if (operator.id === rowData.id) {
                        operator.skills = valid.data.obj
                    }
                });
                setLstOperator(_operators);
            });
        } else {
            OperatorDataService.setImpairmentOperator(UserposImpairments).then((valid) => {
                _operators.map((operator) => {
                    if (operator.id === rowData.id) {
                        operator.skills = valid.data.obj
                    }
                });
                setLstOperator(_operators);
            });
        }
        UserposImpairments.idImpairment === "" ? setVisible(true) : setVisible(false);

    };

    const templTHSkill = (rowData) => {
        return (
            <div className="grid" style={{ display: "inline-flex" }}>
                {machineryTypes.map((skill) => {
                    return (
                        <div key={skill.idSkill} className="grid" style={{ width: '100%' }}>
                            <div className="col-4" style={{textAlign: 'left' }}>
                                <Checkbox
                                    id={rowData.id + skill.idSkill}
                                    inputId={skill.idSkill}
                                    name="skill"
                                    value={skill}
                                    onChange={(e) => onSkill(rowData, e)}
                                    //key={skill.key}
                                    checked={!rowData.skills.some((item) => item.skill === skill.skill)}
                                />
                                &nbsp; 
                                <label htmlFor={skill.idSkill}>{skill.skill}</label>

                            </div>
                            <div className="col-3">
                                <InputSwitch
                                    disabled
                                    checked={rowData.skills.some((item) => (item.skill === skill.skill & item.assistant === true))}
                                />
                            </div>

                        </div>
                    );
                })}
            </div>
        );
    };

    const renderHeader1 = () => {
        return (
            <div className="grid">
                <div className="col-6 lg:col-6 xl:col-6">
                    <div className="p-d-flex p-ai-center p-flex-wrap">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText style={{ width: "60%" }} type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
                        </span>
                    </div>
                </div>
                <div className="col-6 lg:col-6 xl:col-6">
                    <div className="p-d-flex p-ai-center p-flex-wrap">
                        <Dropdown style={{ width: "60%" }} value={selectedStore} options={lstStores} onChange={(e) => onChangeStore(e)} optionLabel="name" placeholder="Seleccione la bodega" />
                    </div>
                </div>
            </div>
        );
    };

    const onChangeStore = (e) => {
        setSelectedStore(e.value);
        let searchDto = {
            mcu: e.value.mcu
        };
        OperatorDataService.getImpairmentsOperatorsByStore(searchDto).then((valid) =>{
            setLstOperator(valid.data.obj);
        });
    };
    const header1 = renderHeader1();
    /*
    Inner Components
    */
    let tblLisTH = (
        <DataTable
            value={lstOperatorFilter.length > 0 ? lstOperatorFilter : lstOperator}
            selectionMode="single"
            key={lstOperator.id}
            dataKey={lstOperator.id}
            ref={dt}
            responsiveLayout="scroll"
            scrollable
            style={{ width: "auto" }}
            virtualScrollerOptions={{ itemSize: 46 }}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last}, de {totalRecords}"
            emptyMessage="No customers found."
            globalFilter={globalFilter}
            header={header1}
        >
            <Column
                header="Cod."
                field="jdeAn8"
                style={{
                    textAlign: "center",
                    width: "7%",
                    fontSize: "14px",
                    minWidth: "12rem",
                }}
            ></Column>
            <Column
                header="Usuario"
                field="username"
                style={{
                    textAlign: "center",
                    width: "20%",
                    fontSize: "14px",
                    minWidth: "14rem",
                }}
            ></Column>
            <Column
                header="Nombre "
                field="fullname"
                style={{
                    textAlign: "center",
                    width: "20%",
                    fontSize: "14px",
                    minWidth: "14rem",
                }}
            ></Column>
            <Column
                header="Skills"
                body={templTHSkill}
                style={{
                    textAlign: "center",
                    width: "50%",
                    fontSize: "14px",
                }}
            ></Column>
        </DataTable>
    );

    /*
    Return
    */
    return (
        <div className="p-fluid p-grid">
            <Toast ref={toast} />
            <ConfirmPopup
                target={document.getElementById(idCheck)}
                visible={visible}
                onHide={() => setVisible(false)}
                message="¿Puede ser ayudante?"
                icon="pi pi-exclamation-triangle"
                accept={() => accept(serviceSelected)}
                reject={() => reject(serviceSelected)}
            />
            <div className="col-12 xl:col-12">
                <div className="card">
                    <h5>
                        <b>Lista Operadores Medico Ocupacional</b>
                    </h5>
                    <div className="col-12 xl:col-12">{tblLisTH}</div>
                </div>
            </div>
        </div>
    );
});
