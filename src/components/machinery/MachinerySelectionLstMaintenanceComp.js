import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";
// Prime components
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ToggleButton } from "primereact/togglebutton";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { SelectButton } from "primereact/selectbutton";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { addLocale } from "primereact/api";
import { Badge } from "primereact/badge";
import MachineryDataService from "../../service/MachineryDataService";
import { OperatorServiceIconComp } from "../operator/OperatorServiceIconComp";
import { MachineryIconComp } from "./MachineryIconComp";
// Services
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./ButtonDemo.css";
import { useDataStore } from "../../data/DataStoreContext";
import { LoginPrincipalComp } from "../login/LoginPrincipalComp";
export const MachinerySelectionLstMaintenanceComp = observer((props) => {
    /*
  Variables
  */
    const [selLstMachineryStatusInitial, setLstMachineryStatusInitial] = useState(null);
    const [onlyPendingOrders, setOnlyPendingOrders] = useState(true);
    const [lstMachinery, setLstMachinery] = useState([]);
    const [selMachinery, setSelMachinery] = useState({ code: null, description: null });
    const dt = useRef(null);
    const [dialogMantemimiento, setDialogMantemimiento] = useState(false);

    const [dialogMantemimientoPrev, setDialogMantemimientoPrev] = useState(false);
    const [dialogMantemimientoProx, setDialogMantemimientoProx] = useState(false);
    const [dialogMantemimientoCorrec, setDialogMantemimientoCorrec] = useState(false);
    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);
    const [codigoMan, setcodigoMan] = useState("");
    const [descManquina, setdescManquina] = useState("");
    const [categoMaquina, setcategoMaquina] = useState("");

    const [d, setD] = useState("");
    const [f, setF] = useState("");

    const categories = [
        { name: "Daño mecánico", key: "M" },
        { name: "Daño neumático", key: "N" },
        { name: "Daño eléctrico", key: "E" },
    ];
    const [selectedCategory, setSelectedCategory] = useState([]);

    const damage = [
        { name: "Falla guillotina", key: "G" },
        { name: "Falla Calderin", key: "C" },
        { name: "Falla retestador", key: "RE" },
        { name: "Falla rascacolas", key: "A" },
    ];
    const [selectedDamages, setSelectedDamages] = useState([]);
    const toast = useRef(null);
    /*
    Store
    */
    const dataStore = useDataStore();

    /*
  Init
  */
    useEffect(() => {
        if (selLstMachineryStatusInitial) {
            handleQueryMachineryByWhMan();
        }
    }, [selLstMachineryStatusInitial]);

    /*
  Context  
  */

    /*
  Formats
  */

    /*
  Methods
  */

    const handleQueryMachineryByWhMan = () => {
        MachineryDataService.queryMachineryByWhMan(props.storeMcu).then((valid) => {
            if (valid.data && valid.data.success) {
                let lstMachineryFilteredByMcuMan = valid.data.obj.filter((machineryObjX) => true || machineryObjX.store.mcu === props.storeMcu)[0];
                console.log("lstMachineryFilteredByServiceType", lstMachineryFilteredByMcuMan.machineryMaintenaceList);
                setLstMachinery(lstMachineryFilteredByMcuMan.machineryMaintenaceList);
            }
        });
    };
    const statusMantenimiento = (rowData) => {
        if (rowData.statusMaintenace === "Man_Preventivo") {
            return (
                <React.Fragment>
                    <div className="p-button-rounded p-button-warning mr-2 ">
                        <Badge
                            value={rowData.statusMaintenace}
                            severity="warning"
                            className="p-mr-2"
                            style={{
                                textAlign: "center",
                                fontSize: "9px",
                            }}
                        ></Badge>
                    </div>
                </React.Fragment>
            );
        }
        if (rowData.statusMaintenace === "Man_Correctivo") {
            return (
                <React.Fragment>
                    <div className="p-button-rounded p-button-danger mr-2 ">
                        <Badge
                            value={rowData.statusMaintenace}
                            severity="danger"
                            className="p-mr-2"
                            style={{
                                textAlign: "center",
                                fontSize: "9px",
                            }}
                        ></Badge>
                    </div>
                </React.Fragment>
            );
        }
        if (rowData.statusMaintenace === "Man_Proximo") {
            return (
                <React.Fragment>
                    <div className="p-button-rounded p-button-info mr-2 ">
                        <Badge
                            value={rowData.statusMaintenace}
                            severity="info"
                            className="p-mr-2"
                            style={{
                                textAlign: "center",
                                fontSize: "9px",
                            }}
                        ></Badge>
                    </div>
                </React.Fragment>
            );
        }
    };

    const statusMaquina = (rowData) => {
        if (rowData.status === "Des_Habilitada") {
            return (
                <React.Fragment>
                    <div className="p-button-rounded p-button-warning mr-2 ">
                        <Badge
                            value={rowData.status}
                            severity="warning"
                            className="p-mr-2"
                            style={{
                                textAlign: "center",
                                fontSize: "9px",
                            }}
                        ></Badge>
                    </div>
                </React.Fragment>
            );
        }
        if (rowData.status === "Habilitada") {
            return (
                <React.Fragment>
                    <div className="p-button-rounded p-button-info mr-2 ">
                        <Badge
                            value={rowData.status}
                            severity="info"
                            className="p-mr-2"
                            style={{
                                textAlign: "center",
                                fontSize: "9px",
                            }}
                        ></Badge>
                    </div>
                </React.Fragment>
            );
        }

        if (rowData === "Habilitada") {
            //console.log(rowData);
            return (
                <React.Fragment>
                    <div className="p-button-rounded p-button-info mr-2 ">
                        <Badge
                            value={rowData.status}
                            severity="info"
                            className="p-mr-2"
                            style={{
                                textAlign: "center",
                                fontSize: "9px",
                            }}
                        ></Badge>
                    </div>
                </React.Fragment>
            );
        }
    };

    const onDamageChange = (e) => {
        let _selectedDamages = [...selectedDamages];

        if (e.checked) {
            _selectedDamages.push(e.value);
        } else {
            for (let i = 0; i < _selectedDamages.length; i++) {
                const selectedCategory = _selectedDamages[i];

                if (selectedCategory.key === e.value.key) {
                    _selectedDamages.splice(i, 1);
                    break;
                }
            }
        }

        setSelectedDamages(_selectedDamages);
    };

    const handleSelectUser = (ev) => {
        dataStore.setAuthPrincipalUser(ev);
        setLstMachineryStatusInitial(ev);
    };

    const setLoader = async (ev) => {
        if (!ev) await timeout(400);
        dataStore.setLoading(ev);
    };

    function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
    }
    const showMessage = (ev) => {
        toast.current.show({
            severity: ev.severity,
            summary: ev.summary,
            detail: ev.message,
            life: (ev.message.length / 10) * 1000,
        });
    };

    /*
  Inner Components
  */

    let machineryIconComp = (rowData) => {
        //console.log("tbl... ", rowData);
        return <MachineryIconComp machineryData={rowData} type={"machine"}/>;
    };

    let loginPrincipalComp = !dataStore.authPrincipalUser || !selLstMachineryStatusInitial ? <LoginPrincipalComp setSelPrincipalUser={(ev) => handleSelectUser(ev)} username={dataStore.authPrincipalUser ? dataStore.authPrincipalUser.username : null} /> : "";

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className="grid">
                    <div className="col-12 lg:col-6 xl:col-6">
                        <Button label="Habilitar" style={{ width: "100%", fontSize: "10px" }} disabled={rowData.status === "Habilitada" && rowData.statusMaintenace !== "Man.Proximo"} className="p-button-sm p-button-info " onClick={() => statusMaquina("Habilitada")} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-6">
                        <Button label="Mantenimiento" style={{ width: "100%", fontSize: "10px" }} className="p-button-sm p-button-primary " onClick={() => showDlgMan(rowData)} />
                    </div>
                </div>
            </React.Fragment>
        );
    };

    const showDlgMan = (rowData) => {
        setcodigoMan(rowData.code);
        setdescManquina(rowData.description);
        setcategoMaquina(rowData.machinetyType);
        setDialogMantemimiento(true);
    };

    const hideDialog = () => {
        setDialogMantemimiento(false);
    };

    const hideDialogPrev = () => {
        setDialogMantemimientoPrev(false);
        setDialogMantemimiento(false);
    };

    const hideDialogProx = () => {
        setDialogMantemimientoProx(false);
        setDialogMantemimiento(false);
    };

    const hideDialogCorrec = () => {
        setDialogMantemimientoCorrec(false);
        setDialogMantemimiento(false);
    };

    let serviceTypeIconComp = (rowData) => {
        return (
            <div key={rowData.machinetyType}>
                <OperatorServiceIconComp serviceType={rowData.machinetyType.toUpperCase()} badgeNumber={null} />
            </div>
        );
    };

    let tblLisMachineryMauntenance = (
        <DataTable
            value={lstMachinery}
            dataKey="code"
            ref={dt}
            responsiveLayout="stack"
            scrollable
            scrollHeight="400px"
            style={{ width: "auto" }}
            virtualScrollerOptions={{ itemSize: 46 }}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last}, de {totalRecords}"
        >
            <Column
                header="Maquinaria"
                body={machineryIconComp}
                style={{
                    textAlign: "center",
                    width: "14%",
                    fontSize: "11px",
                    width: "110px",
                    alignContent: "center",
                }}
                // sortable={true}
            ></Column>
            <Column
                header="Descripciòn"
                field="description"
                style={{
                    textAlign: "center",
                    width: "20%",
                    fontSize: "11px",
                }}
            ></Column>
            <Column
                header="Tola Hora uso"
                field="useHour"
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "11px",
                }}
            ></Column>
            <Column
                header="Tipo"
                body={serviceTypeIconComp}
                style={{
                    textAlign: "left",
                    width: "14%",
                    fontSize: "11px",
                }}
            ></Column>
            <Column
                header="Estado"
                body={statusMaquina}
                style={{
                    textAlign: "center",
                    width: "16%",
                    fontSize: "10px",
                }}
            ></Column>
            <Column
                header="Est. Mantemiento"
                body={statusMantenimiento}
                style={{
                    textAlign: "center",
                    width: "18%",
                    fontSize: "11px",
                }}
            ></Column>
            <Column
                header="Acciones"
                style={{
                    textAlign: "center",
                    width: "34%",
                    fontSize: "11px",
                }}
                body={actionBodyTemplate}
            ></Column>
        </DataTable>
    );

    const onchengeDano = (e) => {
        setSelectedCategory(e);
    };

    /*
  Return
  */
    return (
        <>
            <Toast ref={toast} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
            {loginPrincipalComp}
            <div className="p-fluid p-grid">
                <div className="col-12 xl:col-12">
                    <div className="card">
                        <h5>
                            <b>Lista de Maquinas</b>
                        </h5>{" "}
                        <br></br>
                        <div className="col-12 xl:col-12">{tblLisMachineryMauntenance}</div>
                    </div>
                </div>
            </div>
            <Dialog visible={dialogMantemimiento} style={{ width: "500px" }} header="Seleccione el tipo de mantenimiento" modal className="p-fluid" onHide={hideDialog}>
                <div className="field">
                    {" "}
                    <Button label="Man.Preventivo" className="p-button-rounded p-button-warning mr-2" onClick={() => setDialogMantemimientoPrev(true)} />
                </div>
                <div className="field">
                    {" "}
                    <Button label="Man.Proximo" className="p-button-rounded p-button-info mr-2" onClick={() => setDialogMantemimientoProx(true)} />
                </div>
                <div className="field">
                    {" "}
                    <Button label="Man.Correctivo" className="p-button-rounded p-button-danger mr-2" onClick={() => setDialogMantemimientoCorrec(true)} />
                </div>
            </Dialog>
            <Dialog visible={dialogMantemimientoPrev} style={{ width: "500px" }} header="Mantenimiento Preventivo" modal className="p-fluid" onHide={hideDialogPrev}>
                <div className="field">
                    <b>Codigo:</b>&nbsp; {codigoMan}
                </div>
                <div className="field">
                    <b>Descripcion:</b>&nbsp; {descManquina}
                </div>
                <div className="field">
                    <b>Categoria: </b>&nbsp;
                    {categoMaquina}
                </div>
                <div className="field">
                    Fecha/Hora Inicio: <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} touchUI />
                </div>
                <div className="field">
                    Fecha/Hora Fin: <Calendar id="basic" value={date2} onChange={(e) => setDate2(e.value)} touchUI />
                </div>
                <div className="field">
                    <Button label="Generar VL" className="p-button-rounded p-button-info mr-2" onClick={() => hideDialogPrev()} />
                </div>
            </Dialog>
            <Dialog visible={dialogMantemimientoProx} style={{ width: "500px" }} header="Mantenimiento Proximo" modal className="p-fluid" onHide={hideDialogProx}>
                <div className="field">
                    <b>Codigo:</b>&nbsp; {codigoMan}
                </div>
                <div className="field">
                    <b>Descripcion:</b>&nbsp; {descManquina}
                </div>
                <div className="field">
                    <b>Categoria: </b>&nbsp;
                    {categoMaquina}
                </div>
                <div className="field">
                    Fecha/Hora Inicio: <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} touchUI />
                </div>
                <div className="field">
                    Fecha/Hora Fin: <Calendar id="basic" value={date2} onChange={(e) => setDate2(e.value)} touchUI />
                </div>
                <div className="field">
                    <Button label="Generar VL" className="p-button-rounded p-button-info mr-2" onClick={() => hideDialogProx()} />
                </div>
            </Dialog>
            <Dialog visible={dialogMantemimientoCorrec} style={{ width: "500px" }} header="Mantenimiento Correctivo" modal className="p-fluid" onHide={hideDialogCorrec}>
                <div className="field">
                    <b>Codigo:</b>&nbsp; {codigoMan}
                </div>
                <div className="field">
                    <b>Descripcion:</b>&nbsp; {descManquina}
                </div>
                <div className="field">
                    <b>Categoria: </b>&nbsp;
                    {categoMaquina}
                </div>
                <hr></hr>

                <div className="grid">
                    <div className="col-3 col-offset-1">
                        {categories.map((category) => {
                            return (
                                <div key={category.key} className="field-radiobutton">
                                    <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => onchengeDano(e.value)} checked={selectedCategory.key === category.key} />
                                    <label htmlFor={category.key}>{category.name}</label>
                                </div>
                            );
                        })}
                    </div>
                    <div className="col-7 col-offset-1">
                        {damage.map((damage) => {
                            return (
                                <div key={damage.key} className="field-checkbox">
                                    <Checkbox inputId={damage.key} name="damage" value={damage} onChange={onDamageChange} checked={selectedDamages.some((item) => item.key === damage.key)} disabled={damage.key === "R"} />
                                    <label htmlFor={damage.key}>{damage.name}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="field">
                    Fecha/Hora Inicio: <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} touchUI />
                </div>
                <div className="field">
                    Fecha/Hora Fin: <Calendar id="basic" value={date2} onChange={(e) => setDate2(e.value)} touchUI />
                </div>
                <div className="field">
                    <Button label="Generar VL" className="p-button-rounded p-button-info mr-2" onClick={() => hideDialogCorrec()} />
                </div>
            </Dialog>
        </>
    );
});
