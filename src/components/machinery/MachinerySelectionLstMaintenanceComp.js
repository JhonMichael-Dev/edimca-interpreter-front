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
import MachineryDataService from "../../service/MachineryDataService";
// Services
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export const MachinerySelectionLstMaintenanceComp = observer((props) => {
    /*
  Variables
  */
    const [onlyPendingOrders, setOnlyPendingOrders] = useState(true);
    const [lstMachinery, setLstMachinery] = useState([]);
    const [selMachinery, setSelMachinery] = useState({ code: null, description: null });
    const dt = useRef(null);
    const [dialogMantemimiento, setDialogMantemimiento] = useState(false);

    const [dialogMantemimientoPrev, setDialogMantemimientoPrev] = useState(false);
    const [dialogMantemimientoProx, setDialogMantemimientoProx] = useState(false);
    const [dialogMantemimientoCorrec, setDialogMantemimientoCorrec] = useState(false);
    const [date1, setDate1] = useState(null);
    const [codigoMan, setcodigoMan] = useState("");
    const [descManquina, setdescManquina] = useState("");
    const [categoMaquina, setcategoMaquina] = useState("");

    const [d, setD] = useState("");
    const [f, setF] = useState("");

    /*
  Init
  */
    useEffect(() => {
        handleQueryMachineryByWhMan();
    }, []);

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
                // console.log("lstMachineryFilteredByServiceType", lstMachineryFilteredByMcuMan.machineryMaintenaceList);
                setLstMachinery(lstMachineryFilteredByMcuMan.machineryMaintenaceList);
            }
        });
    };
    /*
  Inner Components
  */

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button label="Habilitar" className="p-button-rounded p-button-success mr-2" onClick={() => ({})} />
                <Button label="Mantenimiento" className="p-button-rounded p-button-warning" onClick={() => showDlgMan(rowData)} />
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

    const dañoSelectItems = [
        { label: "Daño Mecanico", value: "DM" },
        { label: "Daño Neumatico", value: "DNE" },
    ];
    const fallaSelectItems = [
        { label: "FALLA GRUPO SIERRA", value: "F1" },
        { label: "FALLA GRUPO INCISOR", value: "F2" },
        { label: "FALLA ANCLAJE INFERIOR", value: "F3" },
        { label: "FALLA MOTOR INCISOR", value: "F4" },
        { label: "FALLA DE SISTEMA DE AIRE", value: "F5" },
    ];

    let tblLisMachineryMauntenance = (
        <DataTable
            value={lstMachinery}
            /*
            selectionMode="single"
            selection={selOrderDetail}
            onSelectionChange={(e) => setSelOrderDetail(e.value)}
            onRowSelect={onRowSelect}
            onRowUnselect={onRowUnselect}
            */
            dataKey="code"
            ref={dt}
            responsiveLayout="stack"
            scrollable
            scrollHeight="380px"
            style={{ width: "auto" }}
            virtualScrollerOptions={{ itemSize: 46 }}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last}, de {totalRecords}"
        >
            <Column
                header="Codigo"
                field="code"
                style={{
                    textAlign: "center",
                    width: "9%",
                    fontSize: "12px",
                }}
                // sortable={true}
            ></Column>
            <Column
                header="Descripciòn"
                field="description"
                style={{
                    textAlign: "center",
                    width: "30%",
                    fontSize: "12px",
                }}
            ></Column>
            <Column
                header="Tola Hora uso"
                field="useHour"
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "12px",
                }}
            ></Column>
            <Column
                header="Tipo"
                field="machinetyType"
                style={{
                    textAlign: "center",
                    width: "7%",
                    fontSize: "12px",
                }}
            ></Column>
            <Column
                header="Estado"
                field="status"
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "12px",
                }}
            ></Column>
            <Column
                header="Est. Mantemiento"
                field="statusMaintenace"
                style={{
                    textAlign: "center",
                    width: "17%",
                    fontSize: "12px",
                }}
            ></Column>
            <Column header="Acciones" body={actionBodyTemplate}></Column>
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
                    Fecha/Hora Inicio: <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} />
                </div>
                <div className="field">
                    Fecha/Hora Fin: <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} />
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
                    Fecha/Hora Inicio: <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} />
                </div>
                <div className="field">
                    Fecha/Hora Fin: <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} />
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
                <div className="field">
                    <b>Daño: </b>&nbsp;
                    <Dropdown value={d} options={dañoSelectItems} onChange={(e) => setD(e.value)} placeholder="Seleccione el daño" />
                </div>
                <div className="field">
                    <b>Falla: </b>&nbsp;
                    <Dropdown value={f} options={fallaSelectItems} onChange={(e) => setF(e.value)} placeholder="Seleccione la falla" />
                </div>
                <div className="field">
                    Fecha/Hora Inicio: <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} />
                </div>
                <div className="field">
                    Fecha/Hora Fin: <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} />
                </div>
                <div className="field">
                    <Button label="Generar VL" className="p-button-rounded p-button-info mr-2" onClick={() => hideDialogCorrec()} />
                </div>
            </Dialog>
        </>
    );
});
