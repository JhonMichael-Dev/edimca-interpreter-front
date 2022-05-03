import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

import { OperatorIconComp } from "./OperatorIconComp";
import { OperatorIconComp2 } from "./OperatorIconComp2";
import { OperatorTurnComp } from "./OperatorTurnComp";
import { OperatorServicesIconResumeComp } from "./OperatorServicesIconResumeComp";
import { OperatorCountComp } from "./OperatorCountComp";
import { OperatorServiceIconComp } from "./OperatorServiceIconComp";
import { OperatorActionsComp } from "./OperatorActionsComp";
import { PasswordOperationComp } from "../PasswordOperationComp";

// Services
import OrderDataService from "../../service/OrderDataService";
import OperatorDataService from "../../service/OperatorDataService";
import { ProductInfoComp } from "../product/ProductInfoComp";
import { OrderServicesIconComp } from "../order/OrderServicesIconComp";
import { ServicesInProcessByOperatorComp } from "./ServicesInProcessByOperatorComp";

export const OperatorAndServiceLstComp = observer((props) => {
    /*
    Variables
    */

    const [lstOperators, setLstOperators] = useState(null);
    const [selOperator, setSelOperator] = useState(null);
    const [currentServices, setCurrentServices] = useState(null);
    const [showPasswordDialog, setShowPasswordDialog] = useState(true);
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
        handleQueryOrdersOnProcessByStore();
        handleQueryCurrentService();
    };

    const handleQueryOrdersOnProcessByStore = () => {
        //ESTE SERVICIO DEBE TRAER LOS SERVICIOS POR OPERARIO EXCLUYENDO LOS SERVICIOS PENDIENTES
        let _payload = {
            mcu: props.storeMcu,
        };
        //console.log("_payload", _payload);
        OrderDataService.queryOrdersOnProcessByStore(_payload).then((valid) => {
            //console.log("queryOrdersOnProcessByStore", valid);
            if (valid.data && valid.data.success) {
                setLstOperators(valid.data.obj);
            }
        });
    };

    const handleQueryCurrentService = () => {
        //ESTE SERVICIO DEBERIA TRAER EL SERVICIO QUE ESTE EJECUTANDO ACTUALMENTE EL OPERADOR SELECCIONADO
        OperatorDataService.queryCurrentServiceByOperator(props.storeMcu).then((valid) => {
            if (valid.data && valid.data.success) {
                setCurrentServices(valid.data.obj);
            }
        });
    };

    const handleLogin = () => {
        setShowPasswordDialog(false);
        //props.handleProcess(selOperatorObj.username);
    };

    const handleHideDialog = () => {
        setSelOperator(null);
        setShowPasswordDialog(true);
    };

    /*
    Inner Components
    */

    let operatorIconComp = (rowData) => {
        //console.log("operatorIconComp", rowData);
        //return <OperatorIconComp operatorUsername={selOperator.operator.username} />;
        // -- return <OperatorIconComp2 operator={rowData.operator} />;
        //return <OperatorIconComp operatorUsername={rowData.operator.username} />; // TODO: borrar
        return <OperatorIconComp2 username={rowData.username} />;
    };

    let operatorTurnComp = (rowData) => {
        return <OperatorTurnComp status={rowData.operator.turno} pauseReason={""} />;
    };

    let operatorStatusComp = (rowData) => {
        //console.log(rowData.status);
        return <OperatorTurnComp status={rowData.status} pauseReason={rowData.pauseReason} />;
    };

    let passwordComp = selOperator ? <PasswordOperationComp operatorUsername={selOperator.username} handleLogin={(ev) => handleLogin(ev)} onHide={() => setSelOperator(null)} /> : "";

    let operatorActionsComp = (rowData) => {
        //const statusValidation = currentServices.lstCurrentService.filter((service) => service.operator.username === selOperator.operator.username && service.productDto.jdeId === rowData.productDto.jdeId);
        const statusValidation = rowData.status === "EN_PROCESO";

        let btnComp = (
            <div className="grid">
                <div className="col-3">
                    <OperatorActionsComp action={"Play"} icon={"play"} color={"warning"} rowData={rowData} selOrder={selOperator} />
                </div>
                <div className="col-3">
                    <OperatorActionsComp action={"Pausa"} icon={"pause"} color={"info"} rowData={rowData} selOrder={selOperator} />
                </div>
                <div className="col-3">
                    <OperatorActionsComp action={"Daño"} icon={"exclamation-triangle"} color={"danger"} rowData={rowData} selOrder={selOperator} />
                </div>
                <div className="col-3">
                    <OperatorActionsComp action={"Fin"} icon={"shopping-cart"} color={"success"} rowData={rowData} selOrder={selOperator} />
                </div>
            </div>
        );
        return statusValidation ? btnComp : "";
    };

    let operatorCountComp = (rowData) => {
        return <OperatorCountComp services={rowData.lstWorkingOrderDto} />;
    };

    let orderServicesIconResumeComp = (rowData) => {
        return (
            <div
                key={rowData.jdeOrderId}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    alignContent: "center",
                }}
            >
                <OperatorServicesIconResumeComp services={rowData.lstWorkingOrderDto.filter((serviceX) => serviceX.status != "PENDIENTE")} selStore={props.storeMcu} />
            </div>
        );
    };

    let serviceComp = (rowData) => {
        /*
        return (
            <div>
                <div className="col-12 lg:col-12 xl:col-12">
                    <b>{rowData.productDto.code}</b>
                </div>
                <div className="col-12 lg:col-12 xl:col-12">{rowData.productDto.description1}</div>
            </div>
        );
        */
        return <ProductInfoComp jdeProductCode={rowData.jdeProductCode} code description1 />;
    };

    let serviceTypeIconComp = (rowData) => {
        return (
            <div key={rowData.idWorkingOrder}>
                <OrderServicesIconComp serviceType={rowData.jdeServiceType} badgeNumber={null} />
            </div>
        );
    };

    let operatorTableComp = (
        <DataTable value={lstOperators} selectionMode="single" onRowSelect={(e) => setSelOperator(e.data)} dataKey="username" ref={dt} responsiveLayout="scroll" scrollable scrollHeight="700px" virtualScrollerOptions={{ itemSize: 46 }}>
            <Column header="Operador" body={operatorIconComp} style={{ width: "45%", textAlign: "center" }} sortable sortField="username"></Column>
            {/*<Column header="Turno" body={operatorTurnComp} style={{ width: "120px", textAlign: "center", justifyContent: "center" }} sortable sortField="turno"></Column>*/}
            <Column header="Servicios asignados" body={operatorCountComp} style={{ width: "20%", textAlign: "center" }}></Column>
            <Column
                header="Servicios pendientes"
                body={orderServicesIconResumeComp}
                style={{
                    width: "45%",
                    textAlign: "center",
                    justifyContent: "center",
                }}
            ></Column>
        </DataTable>
    );

    let servicesInProcessByOperatorComp = (selOperator) => {
        return <ServicesInProcessByOperatorComp storeMcu={props.storeMcu} username={selOperator.username} handleHideDialog={(ev) => handleHideDialog()}></ServicesInProcessByOperatorComp>;
    };

    return (
        <div className="grid card">
            <div className="grid col-12 lg:col-12 xl:col-12">
                <div className="col-12 lg:col-4 xl:col-4" style={{ textAlign: "left" }}>
                    <b>Lista de órdenes en proceso</b>
                </div>
                {selOperator === null ? operatorTableComp : showPasswordDialog ? passwordComp : servicesInProcessByOperatorComp(selOperator)}
            </div>
        </div>
    );
});
