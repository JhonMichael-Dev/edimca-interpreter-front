import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

// Prime components
import { OperatorIconComp2 } from "../operator/OperatorIconComp2";
import { FileUploadComp } from "../base/FileUploadComp";

// Services
import OperatorDataService from "../../service/OperatorDataService";
import StoreDataService from "../../service/StoreDataService";
import MachineryDataService from "../../service/MachineryDataService";

export const HumanTalentListComp = observer((props) => {
    /*
  Variables
  */
    const dt = useRef(null);
    const [lstOperator, setLstOperator] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [lstStores, setLstStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [lstOperatorFilter, setLstOperatorFilter] = useState([]);
    const [machineryTypes, setMachineryType] = useState([]);

    /*
    Init
    */
    useEffect(() => {
        loadAvailables();
    }, []);
        /*
    Formats
    */

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

    const onSkill = (rowData,e) => {
        let idSkill = "";
        rowData.skills.map((skill) => {
            if(skill.skill === e.value.skill){
                idSkill = skill.idSkill;
            }
        });
        
        let UserposSkills = {
            idSkill: idSkill,
            userpos: rowData.id,
            skill: e.value.skill
        };

        let _operators = [...lstOperator];
        if (e.checked) {
            OperatorDataService.setHumanTalentOperator(UserposSkills).then((valid) => {
                _operators.map((operator) => {
                    if (operator.id === rowData.id) {
                        operator.skills = valid.data.obj
                    }
                });
                setLstOperator(_operators);
            });
        } else {
            //console.log("unchecked");
            OperatorDataService.removeHumanTalentOperator(UserposSkills).then((valid) => {
                _operators.map((operator) => {
                    if (operator.id === rowData.id) {
                        operator.skills = valid.data.obj
                    }
                });
                setLstOperator(_operators);
            });
        }
    };

    const templTHSkill = (rowData) => {
        //console.log(rowData.skills);
        return (
            <div className="grid" style={{ display: "inline-flex" }}>
                {machineryTypes.map((skill) => {
                    return (
                        <div key={skill.idSkill} className="field-checkbox">
                            <Checkbox
                                inputId={skill.idSkill}
                                name="skill"
                                value={skill}
                                onChange={(e) => onSkill(rowData,e)}
                                //key={skill.key}
                                checked={rowData.skills.some((item) => item.skill === skill.skill)}
                            />
                            <label htmlFor={skill.idSkill}>{skill.skill}</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    );
                })}
            </div>
        );
    };

    const onChangeStore = (e) => {
        setSelectedStore(e.value);
        let searchDto = {
            mcu: e.value.mcu
        };
        OperatorDataService.getHumanTalentOperatorByStore(searchDto).then((valid) =>{
            //console.log("valid: " + valid.data.obj[0].id);
            setLstOperator(valid.data.obj);
        });
    };

    const renderHeader1 = () => {
        return (
            <div className="grid">
                <div className="col-6 lg:col-6 xl:col-6">
                    <div className="p-d-flex p-ai-center p-flex-wrap">
                        <span className="p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText style={{ width: "60%" }} type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar" />
                        </span>
                    </div>
                </div>
                <div className="col-6 lg:col-6 xl:col-6">
                    <div className="p-d-flex p-ai-center p-flex-wrap">
                        <Dropdown style={{ width: "60%" }} value={selectedStore} options={lstStores} key={lstStores.mcu} onChange={(e) => onChangeStore(e)} optionLabel="name" placeholder="Seleccione la bodega" />
                    </div>
                </div>
            </div>
        );
    };

    const header1 = renderHeader1();

    const handleReloadTable = () => {
        setLstOperator(null);
        loadAvailables();
    };

    const operatorIconComp2 = (rowData) => {
        //console.log("rowData",rowData.filename);
        return rowData.filename ? <OperatorIconComp2 operator={rowData} /> : <FileUploadComp operator={rowData} onUpdate={handleReloadTable} />;
    };
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
                body={operatorIconComp2}
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
            <div className="col-12 xl:col-12">
                <div className="card">
                    <h5>
                        <b>Lista Operadores Talento Humano</b>
                    </h5>
                    <div className="col-12 xl:col-12">{tblLisTH}</div>
                </div>
            </div>
        </div>
    );
});