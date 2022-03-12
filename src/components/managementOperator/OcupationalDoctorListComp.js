import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";
// Prime components
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ToggleButton } from "primereact/togglebutton";
import { Checkbox } from "primereact/checkbox";
import { SelectButton } from "primereact/selectbutton";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { addLocale } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import OperatorDataService from "../../service/OperatorDataService";
import { InputMask } from "primereact/inputmask";
// Services
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
export const OcupationalDoctorListComp = observer((props) => {
    /*
  Variables
  */
    const dt = useRef(null);
    const [lstOperator, setLstOperator] = useState([]);
    const [lstOperatorSkill, setLstOperatorSkill] = useState([]);
    const [selectedSkill, setSelectedSkilles] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);
    const [lstStores, setLstStores] = useState([]);
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
        OperatorDataService.queryServicesByListOperatorTH().then((valid) => {
            if (valid.data && valid.data.obj[0].operators) {
                setLstOperator(valid.data.obj[0].operators);
                valid.data.obj[0].operators.map((o) => setLstOperatorSkill(o.skills));
            }
        });
    };

    const onSkill = (e) => {
        let _selectedDamages = [...selectedSkill];

        if (!e.checked) {
            _selectedDamages.push(e.value);
        } else {
            for (let i = 0; i < _selectedDamages.length; i++) {
                let objTest = _selectedDamages[i];

                if (objTest.key === e.value.key) {
                    _selectedDamages.splice(i, 1);
                    break;
                }
            }
        }
        setSelectedSkilles(_selectedDamages);
    };

    const templTHSkill = (rowData) => {
        return (
            <div className="grid">
                {rowData.skills.map((skill) => {
                    return (
                        <div key={skill.id} className="field-checkbox">
                            <Checkbox inputId={skill.id} name="skill" value={skill} onChange={onSkill} checked={!selectedSkill.some((item) => item.key === skill.key)} />
                            <label htmlFor={skill.id}>{skill.name}</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

        let lstOperatoTmp = lstOperator.filter((ob) => ob.mcu === e.value.mcu);
        setLstOperator(lstOperatoTmp);
        console.log(lstOperatoTmp);
        /*
        OperatorDataService.queryServicesByListOperatorTHByBodega(e.value.mcu).then((valid) => {
            if (valid.data && valid.data.obj[0].operators) {
                console.log(valid.data.obj);
            }
        });
        */
    };
    const header1 = renderHeader1();
    /*
Inner Components
*/
    let tblLisTH = (
        <DataTable
            value={lstOperator}
            dataKey="id"
            ref={dt}
            responsiveLayout="stack"
            scrollable
            scrollHeight="380px"
            style={{ width: "auto" }}
            virtualScrollerOptions={{ itemSize: 46 }}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last}, de {totalRecords}"
            globalFilter={globalFilter}
            header={header1}
        >
            <Column
                header="Cod."
                field="jdeAn8"
                style={{
                    textAlign: "left",
                    width: "7%",
                    fontSize: "10px",
                    minWidth: "12rem",
                }}
            ></Column>
            <Column
                header="Usuario"
                field="username"
                style={{
                    textAlign: "left",
                    width: "10%",
                    fontSize: "10px",
                    minWidth: "14rem",
                }}
            ></Column>
            <Column
                header="Nombre "
                field="fullname"
                style={{
                    textAlign: "left",
                    width: "20%",
                    fontSize: "12px",
                }}
            ></Column>
            <Column
                header="Skills"
                body={templTHSkill}
                style={{
                    textAlign: "left",
                    width: "50%",
                    fontSize: "12px",
                }}
            ></Column>
        </DataTable>
    );

    /*
Return
*/
    return (
        <>
            {" "}
            <div className="p-fluid p-grid">
                <div className="col-12 xl:col-12">
                    <div className="card">
                        <h5>
                            <b>Lista Operadores Medico Ocupacional</b>
                        </h5>{" "}
                        <br></br>
                        <div className="col-12 xl:col-12">{tblLisTH}</div>
                    </div>
                </div>
            </div>
        </>
    );
});
