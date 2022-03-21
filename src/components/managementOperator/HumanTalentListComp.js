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

export const HumanTalentListComp = observer((props) => {
    /*
  Variables
  */
    const dt = useRef(null);
    const [lstOperator, setLstOperator] = useState([]);
    const [selectedSkill, setSelectedSkilles] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [lstStores, setLstStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [selOperator, setSelOperator] = useState(null);

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
            }
        });

        StoreDataService.queryStores().then((valid) => {
            if (valid.data && valid.data.success) {
                setLstStores(valid.data.obj);
            }
        });
    };

    const onSkill = (e) => {
        let _selectedDamages = [...selectedSkill];

        if (e.checked) {
            _selectedDamages.push(e.value);
        } else {
            for (let i = 0; i < _selectedDamages.length; i++) {
                const objTest = _selectedDamages[i];

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
            <div className="grid" style={{ display: "inline-flex" }}>
                {rowData.skills.map((skill) => {
                    return (
                        <div key={skill.id} className="field-checkbox">
                            <Checkbox
                                inputId={skill.id}
                                name="skill"
                                value={skill}
                                onChange={onSkill}
                                //key={skill.key}
                                checked={selectedSkill.some((item) => item.key === skill.key)}
                            />
                            <label htmlFor={skill.id}>{skill.name}</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    );
                })}
            </div>
        );
    };

    const onChangeStore = async (e) => {
        setSelectedStore(e.value.mcu);

        /*  setLstOperator(
            await lstOperator.filter((ob) => {
                return ob.mcu === e.value.mcu;
            })
        );*/
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
                        <Dropdown style={{ width: "60%" }} value={selectedStore} options={lstStores} key={lstStores.mcu} onChange={(e) => onChangeStore(e)} optionLabel="name" placeholder="Seleccione la bodega" />
                    </div>
                </div>
            </div>
        );
    };

    const header1 = renderHeader1();

    const handleReloadTable = () =>{
        setLstOperator(null);
        loadAvailables();
    };

    const operatorIconComp2 = (rowData) => {
        //console.log("asdasdasd",rowData.filename);
        return rowData.filename ?
            <OperatorIconComp2 operator={rowData} />
            : <FileUploadComp operator={rowData} onUpdate = {handleReloadTable}/>
    };
    /*
Inner Components
*/
    let tblLisTH = (
        <DataTable
            value={lstOperator}
            selectionMode="single"
            onRowSelect={e => setSelOperator(e.data)}
            dataKey="id"
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
        <>
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
        </>
    );
});
