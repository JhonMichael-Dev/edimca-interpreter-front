import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";

// Prime components
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ToggleButton } from "primereact/togglebutton";
import { Checkbox } from "primereact/checkbox";
import { SelectButton } from "primereact/selectbutton";
import { Toast } from "primereact/toast";

// Services
import OrderDataService from "../../service/OrderDataService";
import { OrderShowComp } from "../order/OrderShowComp";
import { OrderServicesIconComp } from "../order/OrderServicesIconComp";
import { OrderServicesIconResumeComp } from "../order/OrderServicesIconResumeComp";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { OperatorIconComp } from "../operator/OperatorIconComp";
import { OrderStatusComp } from "../order/OrderStatusComp";
import { OperatorAndAssistantsLstComp } from "../operator/OperatorAndAssistantsLstComp";
import { TransferSelectDestinationComp } from "./TransferSelectDestinationComp";

export const TransfersLstDetailComp = observer((props) => {
    /*
  Variables
  */
    const [onlyPendingOrders, setOnlyPendingOrders] = useState(true);
    const [selOrderDetail, setSelOrderDetail] = useState(null);
    const dt = useRef(null);
    const toast = useRef(null);

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
    const loadAvailables = () => {};

    const showMessage = (ev) => {
        toast.current.show({
            severity: ev.severity,
            summary: ev.summary,
            detail: ev.message,
            life: (ev.message.length / 10) * 1500,
        });
    };

    const handleProcess = (ev) => {
        setSelOrderDetail(null);
        //showMessage({ message: "Servicio en proceso para el usuario " + ev, severity: "info" });
        props.handleProcess(ev);
    };

    /*
  Inner Components
  */
    const showProcessConfirmDialog = () => {
        confirmDialog({
            message: "Seguro desea procesar..",
            header: "Confirmación",
            icon: "pi pi-question",
            accept: () => handleProcess(null),
            reject: () => setOnlyPendingOrders(false),
            acceptLabel: "Procesar",
            acceptIcon: "pi pi-check",
            rejectIcon: "pi pi-times",
        });
    };

    let productComp = (rowData) => {
        return (
            <div>
                <div className="col-12 lg:col-12 xl:col-12">
                    <b>{rowData.product.code}</b>
                </div>
                <div className="col-12 lg:col-12 xl:col-12">{" " + rowData.product.description1}</div>
            </div>
        );
    };

    let statusComp = (rowData) => {
        return (
            <OrderStatusComp status={rowData.status} />
            /*
            <Button key={rowData.idOrderDetail} className={"p-button-rounded p-button-" + (rowData.status === "PENDIENTE" ? "secondary" : rowData.status === "EN_PROCESO" ? "warning" : "success")} style={{ fontWeight: "bold", fontSize: 12 }}>
                {rowData.status}
            </Button>
            */
        );
    };

    let operatorIconComp = (rowData) => {
        return <OperatorIconComp operatorUsername={rowData.operator ? rowData.operator.username : null} />;
    };

    let serviceTypeIconComp = (rowData) => {
        return (
            <div key={rowData.idOrderDetail}>
                <OrderServicesIconComp serviceType={rowData.product.serviceType} badgeNumber={null} />
            </div>
        );
    };

    let selectionComp = (rowData) => {
        let lstSelectableStatus = ["PARADO"];
        let isSelectable = lstSelectableStatus.includes(rowData.status) && rowData.pauseReason.hardCoded === "S";
        return (
            <Button
                key={rowData.idOrderDetail}
                onClick={() => {
                    setSelOrderDetail(rowData);
                }}
                icon="pi pi-reply"
                className={"p-button-rounded p-button-secondary " + (isSelectable ? "" : "p-button-raised p-button-text")}
                disabled={!isSelectable}
                style={{ fontWeight: "bold", fontSize: 13, height: "70px", width: "80px" }}
            ></Button>
        );
    };

    let orderDetailTableComp =
        props.selOrder && props.selOrder.lstOrderDetail && props.selOrder.lstOrderDetail.length > 0 ? (
            <DataTable value={props.selOrder.lstOrderDetail} dataKey="idOrderDetail" ref={dt} header={""} footer={""} responsiveLayout="scroll" scrollable scrollHeight="480px" virtualScrollerOptions={{ itemSize: 46 }}>
                <Column header="Operador" body={operatorIconComp} style={{ width: "130px", textAlign: "center", alignContent: "center" }} sortable sortField="operator.username"></Column>
                <Column header="Estado" body={statusComp} style={{ width: "160px", textAlign: "center", alignContent: "center" }} sortable sortField="status"></Column>
                <Column header="Motivo" field="pauseReason.description1" style={{ width: "160px", textAlign: "center", alignContent: "center" }} sortable sortField="pauseReason.description1"></Column>
                <Column header="Cantidad" field="quantity" style={{ width: "20%", textAlign: "center" }} sortable sortField="quantity"></Column>
                <Column header="Cantidad completada" field="quantityCompleted" style={{ width: "20%", textAlign: "center" }} sortable sortField="quantityCompleted"></Column>
                <Column header="Producto" body={productComp} style={{ width: "30%" }} sortable sortField="product.description1"></Column>
                <Column header="Tipo servicio" body={serviceTypeIconComp} style={{ width: "25%" }} sortable sortField="product.serviceType"></Column>
                <Column header="Transferir" body={selectionComp} style={{ width: "20%" }}></Column>
            </DataTable>
        ) : (
            <></>
        );

    let selectDestinationComp = selOrderDetail ? <TransferSelectDestinationComp handleProcess={(ev) => handleProcess(ev)} storeMcu={null} skill={selOrderDetail.product.serviceType} onHide={(ev) => setSelOrderDetail(null)} /> : "";

    /*
  Return
  */
    return (
        <>
            <Toast ref={toast} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
            <Dialog
                header={"Detalle de servicios, orden: " + props.selOrder.jdeOrderType.code + " " + props.selOrder.jdeOrderId}
                visible={props.selOrder !== null}
                onHide={(ev) => props.setSelOrder(null)}
                style={{
                    //width: "100%",
                    //height: "100%",
                    textAlign: "center",
                }}
                className="col-12 lg:col-10 xl:col-10"
                modal
                closable
                draggable={false}
                resizable={false}
            >
                {orderDetailTableComp}
            </Dialog>
            {selectDestinationComp}
        </>
    );
});
