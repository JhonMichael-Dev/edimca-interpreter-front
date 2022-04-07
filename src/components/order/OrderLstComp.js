import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";
import Moment from "moment";

// Prime components
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ToggleButton } from "primereact/togglebutton";
import { Checkbox } from "primereact/checkbox";
import { SelectButton } from "primereact/selectbutton";

// Services
import OrderDataService from "../../service/OrderDataService";
import { OrderShowComp } from "./OrderShowComp";
import { OrderServicesIconComp } from "./OrderServicesIconComp";
import { OrderServicesIconResumeComp } from "./OrderServicesIconResumeComp";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { OrderLstDetailComp } from "./OrderLstDetailComp";
import { OrderStatusComp } from "./OrderStatusComp";

export const OrderLstComp = observer((props) => {
    /*
  Variables
  */
    const [onlyPendingOrders, setOnlyPendingOrders] = useState(true);
    const [lstOrders, setLstOrders] = useState([]);
    const dt = useRef(null);
    const [selOrder, setSelOrder] = useState(null);
    const [selOrderDetail, setSelOrderDetail] = useState(null);
    const [selOperatorObj, setSelOperatorObj] = useState(null);

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
        if (props.lstOrders) {
            setLstOrders(props.lstOrders);
        } else {
            handleQueryOrders(onlyPendingOrders);
        }
    };

    const handleQueryOrders = (onlyPendingOrders) => {
        if (props.selStore) {
            props.setLoading(true);
            //console.log("onlyPendingOrders", onlyPendingOrders);
            if (onlyPendingOrders) {
                OrderDataService.queryPendingOrdersByStore(props.selStore).then((valid) => {
                    if (valid.data && valid.data.success) {
                        setLstOrders(valid.data.obj);
                    }
                    props.setLoading(false);
                });
            } else {
                OrderDataService.queryOrdersByStore(props.selStore).then((valid) => {
                    if (valid.data && valid.data.success) {
                        setLstOrders(valid.data.obj);
                    }
                    props.setLoading(false);
                });
            }
        }
    };

    const handleFilterOrders = (ev) => {
        handleQueryOrders(ev);
        setOnlyPendingOrders(ev);
    };

    const handleProcess = (ev) => {
        //console.log("order.handleProcess", ev);
        let _payload = {
            idWorkingOrder: ev.idWorkingOrder,
            idMachine: ev.machinery.idMachine,
            operatorUsername: ev.operator.username,
            assistants: ev.operator.assistants,
        };
        console.log("_payload", _payload);

        OrderDataService.startWorkingOrder(_payload).then((valid) => {
            //console.log("startWorkingOrder.valid", valid);
            if (valid && valid.data.success) {
                setSelOrder(null);
                props.showMessage({ severity: "info", summary: "Aviso", message: "Servicio en proceso" });
                handleQueryOrders(onlyPendingOrders);
            }
        });

        setSelOrder(null);
        props.showMessage({ severity: "info", summary: "Aviso", message: "Servicio en proceso" });
    };

    const onRowSelect = (event) => {
        //props.showMessage({ severity: "info", summary: "Product Selected", message: `Name: ${event.data.name}`, life: 3000 });
    };

    const onRowUnselect = (event) => {
        //props.showMessage({ severity: "warn", summary: "Product Unselected", message: `Name: ${event.data.name}`, life: 3000 });
    };

    /*
  Inner Components
  */
    const showProcessConfirmDialog = () => {
        confirmDialog({
            message: "Seguro desea procesar..",
            header: "Confirmación",
            icon: "pi pi-exclamation-triangle",
            accept: () => handleProcess(null),
            reject: () => setOnlyPendingOrders(false),
            acceptLabel: "Aceptar",
            acceptIcon: "pi pi-check",
            rejectIcon: "pi pi-times",
        });
    };

    let orderShowComp =
        lstOrders && lstOrders.length > 0
            ? lstOrders.map((orderX) => {
                  return (
                      <div key={orderX.jdeOrderId} className="grid">
                          {/*<OrderShowComp selOrder={orderX} /> */}
                          <div className="p-grid col-4 lg:col-2 xl:col-2">{orderX.jdeOrderTypeCode}</div>
                          <div className="p-grid col-4 lg:col-2 xl:col-2">{orderX.jdeOrderId}</div>
                          <OrderServicesIconResumeComp selOrder={orderX} />
                          {/*
                          <OrderServicesIconComp serviceType={"CORTE"} badgeNumber={0} />
                          <OrderServicesIconComp serviceType={"PERFORADO"} badgeNumber={1} />
                          <OrderServicesIconComp serviceType={"RUTEADO"} badgeNumber={3} />
                          <OrderServicesIconComp serviceType={"LAMINADO"} badgeNumber={2} />
                          */}
                      </div>
                  );
              })
            : "";

    let orderServicesIconResumeComp = (rowData) => {
        return (
            <div
                key={rowData.jdeOrderId}
                //className="grid"
                style={{
                    display: "flex",
                    //alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    alignContent: "center",
                    //paddingTop: "10",
                }}
            >
                <OrderServicesIconResumeComp selOrder={rowData} />
            </div>
        );
    };

    let clientComp = (rowData) => {
        return (
            <div>
                <div className="col-12 lg:col-12 xl:col-12">
                    <b>An8:</b> &nbsp; {rowData.client.jdeAn8}
                </div>
                <div className="col-12 lg:col-12 xl:col-12">
                    <b>Identificación:</b> &nbsp; {rowData.client.identification}
                </div>
                <div className="col-12 lg:col-12 xl:col-12">
                    <b>Nombre:</b> &nbsp; {rowData.client.firstName} {rowData.client.lastName}
                </div>
            </div>
        );
    };

    let transDateComp = (rowData) => {
        Moment.locale("es");
        return <div>{Moment(rowData.transactionDate).format("YYYY/MM/DD")}</div>;
    };

    let priorityComp = (rowData) => {
        let _color = rowData.priority && rowData.priority === "EXPRESS" ? "darkmagenta" : "";
        return <div style={{ fontWeight: "bold", color: _color, fontSize: 12 }}>{rowData.priority}</div>;
    };

    let statusComp = (rowData) => {
        return (
            <OrderStatusComp status={rowData.status} />
            /*<Button className={"p-button-rounded p-button-" + (rowData.status === "PENDIENTE" ? "secondary" : rowData.status === "EN_PROCESO" ? "warning" : "success")} style={{ fontWeight: "bold", fontSize: 12 }}>
                {rowData.status}
            </Button>
            */
        );
    };

    let rowClass = (data) => {
        //console.log("data111");
        //console.log(data);
        return {
            "row-boContainsInProcessDevolutions": data.priority && data.priority === "EXPRESS",
        };
    };

    let orderLstComp =
        lstOrders && lstOrders.length > 0 ? (
            <DataTable
                value={lstOrders}
                selectionMode="single"
                selection={selOrder}
                onSelectionChange={(e) => setSelOrder(e.value)}
                onRowSelect={onRowSelect}
                onRowUnselect={onRowUnselect}
                dataKey="jdeOrderId"
                ref={dt}
                header={""}
                footer={""}
                responsiveLayout="scroll"
                rowClassName={rowClass}
                scrollable
                scrollHeight="600px"
                showGridlines
                //virtualScrollerOptions={{ itemSize: 46 }}
            >
                <Column header="Prioridad" body={priorityComp} style={{ width: "10%", textAlign: "center", alignContent: "center" }} sortable sortField="priority.code"></Column>
                <Column header="Tipo orden" field="jdeOrderTypeCode" style={{ width: "8%" }} sortable sortField="jdeOrderTypeCode"></Column>
                <Column header="Num. orden" field="jdeOrderId" style={{ width: "8%" }} sortable sortField="jdeOrderId"></Column>
                <Column header="Estado" body={statusComp} style={{ width: "150px", textAlign: "center", alignContent: "center", justifyContent: "center" }} sortable sortField="status"></Column>
                <Column header="Cliente" body={clientComp} style={{ width: "20%" }} sortable sortField="client.firstName"></Column>
                <Column header="Fch.pedido2" body={transDateComp} style={{ width: "15%" }} sortable sortField="transactionDate"></Column>
                <Column header="Asesor" style={{ width: "13%" }} field="userposUsername" sortable sortField="userposUsername"></Column>
                <Column
                    header="Servicios pendientes"
                    body={orderServicesIconResumeComp}
                    style={{
                        width: "40%",
                    }}
                ></Column>
            </DataTable>
        ) : (
            <></>
        );

    let orderLstDetailComp = selOrder ? <OrderLstDetailComp selOrder={selOrder} setSelOrder={(ev) => setSelOrder(ev)} handleProcess={(ev) => handleProcess(ev)} /> : "";

    let filterMessage = "Solo órdenes pendientes";

    let pendingOrdersFilterComp = (
        <div className="col-12 lg:col-8 xl:col-8" style={{ paddingBottom: "10px", textAlign: "right" }}>
            <ToggleButton checked={onlyPendingOrders} onChange={(e) => handleFilterOrders(e.value)} onLabel={filterMessage} offLabel={filterMessage} onIcon="pi pi-check-square" offIcon="pi pi-spinner" style={{ width: "15em", height: "3em" }} />
        </div>
    );

    /*
  Return
  */
    return (
        <div className="grid card">
            <div className="grid col-12 lg:col-12 xl:col-12">
                <div className="col-12 lg:col-4 xl:col-4" style={{ textAlign: "left" }}>
                    <b>{props.header ? props.header : "Lista de órdenes de trabajo"}</b>
                </div>
                {pendingOrdersFilterComp}
            </div>

            <div>
                {orderLstComp}
                {orderLstDetailComp}
            </div>
        </div>
    );
});
