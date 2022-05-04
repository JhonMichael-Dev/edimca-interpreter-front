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

export const ServicesInProcessByOperatorComp = observer((props) => {
    /*
    Variables
    */
    const [lstWoDtoByOperator, setLstWoDtoByOperator] = useState(null);
    const [selOperator, setSelOperator] = useState(null);
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
        queryWoDtoByOperator();
    };

    const queryWoDtoByOperator = () => {
        //console.log("queryWoDtoByOperator", selOperator);
        // TODO: query wo in process by operator
        let _payload = { mcu: props.storeMcu, user: props.username };
        //console.log("_payload", _payload);
        OrderDataService.queryWorkingOrdersOnProcessByStoreAndOperator(_payload).then((valid) => {
            //console.log("valid", valid);
            if (valid.data && valid.data.success) {
                setLstWoDtoByOperator(valid.data.obj);
            }
        });
    };

    const handleHideDialog = () => {
        props.handleHideDialog();
    };

    /*
    Inner Components
    */

    let operatorStatusComp = (rowData) => {
        //console.log(rowData.status);
        return <OperatorTurnComp status={rowData.status} pauseReason={rowData.pauseReason} />;
    };

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

    let serviceComp = (rowData) => {
        return <ProductInfoComp jdeProductCode={rowData.jdeProductCode} code description1 />;
    };

    let serviceTypeIconComp = (rowData) => {
        return (
            <div key={rowData.idWorkingOrder}>
                <OrderServicesIconComp serviceType={rowData.jdeServiceType} badgeNumber={null} />
            </div>
        );
    };

    return (
        <div className="grid card">
            <div className="grid col-12 lg:col-12 xl:col-12">
                <div className="col-12 lg:col-4 xl:col-4" style={{ textAlign: "left" }}>
                    <b>Lista de órdenes en proceso</b>
                </div>
                <Dialog
                    header="Servicios en Proceso"
                    visible={true}
                    onHide={(ev) => handleHideDialog()}
                    style={{
                        width: "80%",
                        textAlign: "center",
                    }}
                    className="col-12 lg:col-8 xl:col-8"
                    closable
                    resizable={false}
                    draggable={false}
                >
                    {lstWoDtoByOperator ? (
                        <DataTable value={lstWoDtoByOperator.filter((serviceX) => serviceX.status != "PENDIENTE")} selectionMode="single" responsiveLayout="scroll" scrollable scrollHeight="700px" virtualScrollerOptions={{ itemSize: 46 }}>
                            <Column header="Estado" body={operatorStatusComp} style={{ width: "10%", textAlign: "center", alignContent: "center", justifyContent: "center" }} sortable sortField="Estado"></Column>
                            <Column header="Producto" body={serviceComp} style={{ width: "15%" }}></Column>
                            <Column header="Tipo servicio" body={serviceTypeIconComp} style={{ width: "10%" }}></Column>
                            <Column header="Seleccionar" body={operatorActionsComp} style={{ width: "30%", textAlign: "center", alignContent: "center", justifyContent: "center" }}></Column>
                        </DataTable>
                    ) : (
                        <div>"Loading.."</div>
                    )}
                </Dialog>
            </div>
        </div>
    );
});
