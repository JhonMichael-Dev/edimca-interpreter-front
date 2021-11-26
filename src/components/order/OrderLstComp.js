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
import OrderDataService from "../../service/OrderDataService";
import { OrderShowComp } from "./OrderShowComp";
import { OrderServicesIconComp } from "./OrderServicesIconComp";
import { OrderServicesIconResumeComp } from "./OrderServicesIconResumeComp";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { OrderLstDetailComp } from "./OrderLstDetailComp";

export const OrderLstComp = observer((props) => {
    /*
  Variables
  */
    const [onlyPendingOrders, setOnlyPendingOrders] = useState(true);
    const [lstOrders, setLstOrders] = useState([]);
    const dt = useRef(null);
    const [selOrder, setSelOrder] = useState(null);

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
        handleQueryOrders(onlyPendingOrders);
    };

    const handleQueryOrders = (onlyPendingOrders) => {
        let lstPendingStatus = ["PENDIENTE", "EN_PROCESO"];
        console.log("props.selStore", props.selStore);
        if (props.selStore) {
            props.setLoading(true);
            OrderDataService.queryOrdersByStore(props.selStore).then((valid) => {
                console.log("handleQueryOrders:", valid);
                if (valid.data && valid.data.success) {
                    let lstFiltered = valid.data.obj.filter((orderX) => !onlyPendingOrders || lstPendingStatus.includes(orderX.status));
                    //setLstOrders(valid.data.obj);
                    setLstOrders(lstFiltered);
                }
                props.setLoading(false);
            });
        }
    };

    const handleFilterOrders = (ev) => {
        handleQueryOrders(ev);
        setOnlyPendingOrders(ev);
    };

    const handleProcess = (ev) => {};

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
            acceptLabel: "Procesar",
            acceptIcon: "pi pi-check",
            rejectIcon: "pi pi-times",
        });
    };

    let orderShowComp =
        lstOrders && lstOrders.length > 0
            ? lstOrders.map((orderX) => {
                  console.log("orderX", orderX);
                  console.log("orderX.jdeOrderType", orderX.jdeOrderType);
                  return (
                      <div key={orderX.jdeOrderId} className="grid">
                          {/*<OrderShowComp selOrder={orderX} /> */}
                          <div className="p-grid col-4 lg:col-2 xl:col-2">{orderX.jdeOrderType.code}</div>
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
            <div key={rowData.jdeOrderId}>
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
                    <b>Nombre:</b> &nbsp; {rowData.client.firstName} &nbsp; {rowData.client.lastName}
                </div>
            </div>
        );
    };

    let priorityComp = (rowData) => {
        let _color = rowData.priority && rowData.priority.code === "EXPRESS" ? "darkmagenta" : "";
        return <div style={{ fontWeight: "bold", color: _color, fontSize: 12 }}>{rowData.priority.code}</div>;
    };

    let statusComp = (rowData) => {
        return (
            <Button className={"p-button-rounded p-button-" + (rowData.status === "PENDIENTE" ? "secondary" : rowData.status === "EN_PROCESO" ? "warning" : "success")} style={{ fontWeight: "bold", fontSize: 12 }}>
                {rowData.status}
            </Button>
        );
    };

    let rowClass = (data) => {
        //console.log("data111");
        //console.log(data);
        return {
            "row-boContainsInProcessDevolutions": data.priority && data.priority.code === "EXPRESS",
        };
    };

    let orderShowCompV2 =
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
                scrollHeight="500px"
                virtualScrollerOptions={{ itemSize: 46 }}
            >
                <Column header="Prioridad" body={priorityComp} style={{ width: "10%", textAlign: "center", alignContent: "center" }} sortable sortField="priority.code"></Column>
                <Column header="Tipo orden" field="jdeOrderType.code" style={{ width: "10%" }} sortable sortField="jdeOrderType.code"></Column>
                <Column header="Num. orden" field="jdeOrderId" style={{ width: "10%" }} sortable sortField="jdeOrderId"></Column>
                <Column header="Estado" body={statusComp} style={{ width: "160px", textAlign: "center", alignContent: "center" }} sortable sortField="status"></Column>
                <Column header="Cliente" body={clientComp} style={{ width: "30%" }} sortable sortField="client.firstName"></Column>
                <Column header="Servicios pendientes" body={orderServicesIconResumeComp} style={{ width: "20%" }}></Column>
            </DataTable>
        ) : (
            <></>
        );

    let orderLstDetailComp = selOrder ? <OrderLstDetailComp selOrder={selOrder} setSelOrder={(ev) => setSelOrder(ev)} /> : ";";

    /*
  Return
  */
    return (
        <div className="p-fluid grid col-12 lg:col-12 xl:col-12">
            <Card title="Lista de órdenes de trabajo">
                <div>{/*orderShowComp*/}</div>

                <ToggleButton checked={onlyPendingOrders} onChange={(e) => handleFilterOrders(e.value)} onLabel="Solo ordenes pendientes" offLabel="Solo ordenes pendientes" onIcon="pi pi-check-square" offIcon="pi pi-spinner" style={{ width: "15em", height: "4em" }} />

                <div style={{ paddingTop: "20px", borderColor: "black" }}>{orderShowCompV2}</div>
                {orderLstDetailComp}
            </Card>
        </div>
    );
});
