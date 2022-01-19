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
//import OrderDataService from "../../service/OrderDataService";
//import { OrderShowComp } from "./OrderShowComp";
import { OrderServicesIconComp } from "../order/OrderServicesIconComp";
import { OrderServicesIconResumeComp } from "../order/OrderServicesIconResumeComp";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { OperatorIconComp } from "./OperatorIconComp";
import OperatorDataService from "../../service/OperatorDataService";

export const OperatorLstComp = observer((props) => {
    /*
  Variables
  */
    const [onlyPendingOrders, setOnlyPendingOrders] = useState(true);
    const [lstOperators, setLstOperators] = useState(null);
    const dt = useRef(null);
    //const [selOrderDetail, setSelOrderDetail] = useState(null);
    const [selOperatorObj, setSelOperatorObj] = useState({ username: null, assistants: [] });

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
        if (props.lstOperators) {
            setLstOperators(props.lstOperators);
        } else {
            handleQueryOperatorsByStore();
        }
    };

    const handleQueryOperatorsByStore = () => {
        OperatorDataService.queryOperatorByStore(props.storeMcu).then((valid) => {
            //console.log("handleQueryOperatorsByStore", valid);
            if (valid.data && valid.data.success) {
                let lstStoreOperatorFiltered = valid.data.obj.filter((operatorObjX) => true || operatorObjX.store.mcu === props.storeMcu)[0];
                let lstAssistantsFiltered = lstStoreOperatorFiltered.operators.filter((assistantX) => assistantX.skills.includes(props.skill));
                //setLstOperators(valid.data.obj.operators);
                setLstOperators(lstAssistantsFiltered);
            }
            //props.setLoading(false);
        });
    };

    const handleProcess = (ev) => {};

    const selectOperator = (username) => {
        let assistantsOld = removeFromAssistants(selOperatorObj.assistants, username);

        //let newObj = { ...selOperatorObj, username: username };
        let newObj = { assistants: assistantsOld, username: username };
        setSelOperatorObj(newObj);
        props.handleSelectOperator(newObj);
    };

    const selectAssistant = (username) => {
        let assistantsOld = selOperatorObj.assistants;
        assistantsOld.push(username);
        let newObj = { ...selOperatorObj, assistants: assistantsOld };
        setSelOperatorObj(newObj);
    };

    const unselectAssistant = (username) => {
        let assistantsOld = removeFromAssistants(selOperatorObj.assistants, username);

        //assistantsOld.red(username);
        let newObj = { ...selOperatorObj, assistants: assistantsOld };
        setSelOperatorObj(newObj);
    };

    function removeFromAssistants(lstAssistants, username) {
        var index = lstAssistants.indexOf(username);
        if (index !== -1) lstAssistants.splice(index, 1);
        return lstAssistants;
    }

    /*
  Inner Components
  */
    const showProcessConfirmDialog = () => {
        confirmDialog({
            message: "Seguro desea procesar, operario principal: " + selOperatorObj.username + (selOperatorObj.assistants.length !== 0 ? ", ayudantes: " + selOperatorObj.assistants : "") + "?",
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

    let operatorIconComp = (rowData) => {
        return <OperatorIconComp operatorUsername={rowData.username} />;
    };

    let selectionComp = (rowData) => {
        let alreadySelected = selOperatorObj.username === rowData.username;
        return <Button key={rowData.username} onClick={() => selectOperator(rowData.username)} icon="pi pi-check" className={"p-button-rounded p-button-secondary "} disabled={alreadySelected} style={{ fontWeight: "bold", fontSize: 13, height: "70px", width: "80px" }}></Button>;
    };

    let assistantSelectionComp = (rowData) => {
        let alreadySelectedAsPrincipal = selOperatorObj.username === rowData.username;
        let alreadySelected = selOperatorObj.assistants.filter((assistantX) => assistantX === rowData.username)[0];

        if (!alreadySelected) {
            // Enable select
            return (
                <Button
                    key={rowData.username}
                    onClick={() => selectAssistant(rowData.username)}
                    disabled={!selOperatorObj.username || alreadySelectedAsPrincipal}
                    icon="pi pi-check"
                    className={"p-button-rounded p-button-raised  p-button-help "}
                    style={{ fontWeight: "bold", fontSize: 13, height: "70px", width: "80px" }}
                ></Button>
            );
        } else {
            // Enable remove
            return <Button key={rowData.username} onClick={() => unselectAssistant(rowData.username)} disabled={!selOperatorObj.username} icon="pi pi-times" className={"p-button-rounded p-button-danger "} style={{ fontWeight: "bold", fontSize: 13, height: "70px", width: "80px" }}></Button>;
        }
    };

    let operatorTableComp = (
        <DataTable
            value={lstOperators}
            /*
                selectionMode="single"
                selection={selOrderDetail}
                onSelectionChange={(e) => setSelOrderDetail(e.value)}
                onRowSelect={onRowSelect}
                onRowUnselect={onRowUnselect}
                */
            dataKey="username"
            ref={dt}
            responsiveLayout="scroll"
            scrollable
            scrollHeight="380px"
            virtualScrollerOptions={{ itemSize: 46 }}
        >
            <Column header="Operador" body={operatorIconComp} style={{ width: "160px", textAlign: "center", alignContent: "center" }} sortable sortField="username"></Column>
            <Column header={"Principal: \n" + (selOperatorObj.username ? selOperatorObj.username : " ")} body={selectionComp} style={{ width: "30%" }}></Column>
        </DataTable>
    );

    let dialogFooterComp = (
        <div className="grid" style={{ justifyContent: "center", alignContent: "center", padding: "10" }}>
            <Button onClick={() => showProcessConfirmDialog()} label="Aceptar" disabled={!selOperatorObj.username} icon="pi pi-check" className={"p-button-lg p-button-rounded p-button-secondary "} style={{ fontWeight: "bold", fontSize: 13, justifyContent: "center" }}></Button>
        </div>
    );

    /*
  Return
  */
    return (
        <>
            {props.showAsDialog ? (
                <Dialog
                    header="Selección de operarios"
                    visible={true}
                    onHide={(ev) => props.onHide()}
                    //footer={dialogFooterComp}
                    style={{
                        //width: "80%",
                        textAlign: "center",
                    }}
                    className="col-12 lg:col-8 xl:col-6"
                    closable
                    resizable={false}
                    draggable={false}
                >
                    {operatorTableComp}
                </Dialog>
            ) : (
                operatorTableComp
            )}
        </>
    );
});
