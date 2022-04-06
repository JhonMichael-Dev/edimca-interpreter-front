import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";

// Prime components
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ToggleButton } from "primereact/togglebutton";
import { Checkbox } from "primereact/checkbox";
import { SelectButton } from "primereact/selectbutton";

// Services
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import MachineryDataService from "../../service/MachineryDataService";
import { MachineryIconComp } from "./MachineryIconComp";

export const MachinerySelectionLstComp = observer((props) => {
    /*
  Variables
  */
    const [onlyPendingOrders, setOnlyPendingOrders] = useState(true);
    const [lstMachinery, setLstMachinery] = useState([]);
    const [selMachinery, setSelMachinery] = useState({ code: null, description: null });
    const dt = useRef(null);

    /*
  Init
  */
    useEffect(() => {
        loadAvailables();
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
    const loadAvailables = () => {
        if (props.lstMachinery) {
            setLstMachinery(props.lstMachinery);
        } else {
            handleQueryMachineryByWh();
        }
    };

    const handleQueryMachineryByWh = () => {
        MachineryDataService.queryMachineryByWh(props.storeMcu).then((valid) => {
            //console.log("handleQueryMachineryByWh", valid);
            //console.log("props.serviceType", props.serviceType);
            if (valid.data && valid.data.success) {
                let lstMachineryFilteredByMcu = valid.data.obj.filter((machineryObjX) => true || machineryObjX.store.mcu === props.storeMcu)[0];
                let lstMachineryFilteredByServiceType = lstMachineryFilteredByMcu.machineryList.filter((machinery2ObjX) => machinery2ObjX.machinetyType.code === props.serviceType);
                //setLstOperators(valid.data.obj.operators);
                //console.log("lstMachineryFilteredByServiceType", lstMachineryFilteredByServiceType);
                setLstMachinery(lstMachineryFilteredByServiceType);
            }
            //props.setLoading(false);
        });
    };

    const handleProcess = (ev) => {
        props.handleProcess(ev);
    };

    const handleSelectMachinery = (machineryData) => {
        setSelMachinery(machineryData);
    };

    /*
  Inner Components
  */
    const showProcessConfirmDialog = () => {
        confirmDialog({
            message: "Seguro desea procesar, operario principal: " + selMachinery.username + (selMachinery.assistants.length !== 0 ? ", ayudantes: " + selMachinery.assistants : "") + "?",
            header: "Confirmación",
            icon: "pi pi-question",
            accept: () => handleProcess(null),
            reject: () => setOnlyPendingOrders(false),
            acceptLabel: "Procesar",
            acceptIcon: "pi pi-check",
            rejectIcon: "pi pi-times",
            //className: "p-button-lg",
        });
    };

    let machineryIconComp = (rowData) => {
        //console.log("machineryIconComp", rowData);
        return <MachineryIconComp machineryData={rowData} />;
    };

    let selectionComp = (rowData) => {
        let alreadySelected = selMachinery.jdeCode === rowData.jdeCode;
        //console.log(rowData.description);
        //localStorage.setItem("selMachinery", rowData.description);
        return <Button key={rowData.username} onClick={() => handleSelectMachinery(rowData)} icon="pi pi-check" className={"p-button-rounded p-button-secondary "} disabled={alreadySelected} style={{ fontWeight: "bold", fontSize: 13, height: "70px", width: "80px" }}></Button>;
    };

    let machinerryTableComp = (
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
            responsiveLayout="scroll"
            scrollable
            scrollHeight="380px"
            virtualScrollerOptions={{ itemSize: 46 }}
        >
            <Column header="Maquinaria" body={machineryIconComp} style={{ width: "110px", textAlign: "center", alignContent: "center" }} sortable sortField="code"></Column>
            <Column header="Descripción" field="description" style={{ width: "160px", textAlign: "center", alignContent: "center" }} sortable sortField="description"></Column>
            <Column header="Ruta" field="route.code" style={{ width: "120px", textAlign: "center", alignContent: "center" }} sortable sortField="route.code"></Column>
            <Column header="Seleccionar" body={selectionComp} style={{ width: "30%" }}></Column>
        </DataTable>
    );

    let dialogFooterComp = (
        <div className="grid" style={{ justifyContent: "center", alignContent: "center", padding: "10" }}>
            <Button onClick={() => handleProcess(selMachinery)} label="Aceptar" disabled={!selMachinery.jdeCode} icon="pi pi-check" className={"p-button-lg p-button-rounded p-button-secondary "} style={{ fontWeight: "bold", fontSize: 13, justifyContent: "center" }}></Button>
        </div>
    );

    /*
  Return
  */
    return (
        <>
            {props.showAsDialog ? (
                <Dialog
                    header="Selección de maquinaria"
                    visible={true}
                    onHide={(ev) => props.onHide()}
                    footer={dialogFooterComp}
                    style={{
                        //width: "80%",
                        textAlign: "center",
                    }}
                    className="col-12 lg:col-8 xl:col-8"
                    closable
                    resizable={false}
                    draggable={false}
                >
                    {machinerryTableComp}
                </Dialog>
            ) : (
                machinerryTableComp
            )}
        </>
    );
});
