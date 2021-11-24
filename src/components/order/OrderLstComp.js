import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";

// Prime components
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ToggleButton } from "primereact/togglebutton";
import { Checkbox } from "primereact/checkbox";

// Services
import OrderDataService from "../../service/OrderDataService";
import { OrderShowComp } from "./OrderShowComp";
import { OrderServicesIconComp } from "./OrderServicesIconComp";
import { OrderServicesIconResumeComp } from "./OrderServicesIconResumeComp";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export const OrderLstComp = observer((props) => {
    /*
  Variables
  */
    const [onlyPendingOrders, setOnlyPendingOrders] = useState(true);
    const [lstOrders, setLstOrders] = useState([]);

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
        handleQueryOrders();
    };

    const handleQueryOrders = () => {
        console.log("props.selStore", props.selStore);
        if (props.selStore) {
            OrderDataService.queryOrdersByStore(props.selStore).then((valid) => {
                console.log("handleQueryOrders:", valid);
                if (valid.data && valid.data.success) {
                    setLstOrders(valid.data.obj);
                }
            });
        }
    };

    const handleProcess = (ev) => {};

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
        return <OrderServicesIconResumeComp selOrder={rowData} />;
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

    let statusComp = (rowData) => {
        return (
            <Button className={"p-button-rounded p-button-" + (rowData.status !== "COMPLETADO" ? "warning" : "info")} style={{ fontWeight: "bold", fontSize: 12 }}>
                {rowData.status}
            </Button>
        );
    };

    let orderShowCompV2 =
        lstOrders && lstOrders.length > 0 ? (
            <DataTable value={lstOrders} header={""} footer={""} responsiveLayout="scroll">
                <Column header="Tipo orden" field="jdeOrderType.code" style={{ width: "150px" }} sortable sortField="jdeOrderType.code"></Column>
                <Column header="Num. orden" field="jdeOrderId" style={{ width: "150px" }} sortable sortField="jdeOrderId"></Column>
                <Column header="Estado" body={statusComp} style={{ width: "160px", textAlign: "center", alignContent: "center" }} sortable sortField="status"></Column>
                <Column header="Cliente" body={clientComp} style={{ width: "30%" }} sortable sortField="client.firstName"></Column>
                <Column header="Servicios pendientes" body={orderServicesIconResumeComp} style={{ width: "30%" }}></Column>
            </DataTable>
        ) : (
            <></>
        );

    /*
  Return
  */
    return (
        <div className="p-fluid grid col-12 lg:col-12 xl:col-12">
            <Card title="Lista de órdenes pendientes">
                <div>{/*orderShowComp*/}</div>
                <ToggleButton checked={onlyPendingOrders} onChange={(e) => setOnlyPendingOrders(e.value)} onLabel="Solo ordenes pendientes" offLabel="Todas las ordenes" onIcon="pi pi-check" offIcon="pi pi-times" style={{ width: "15em" }} />
                <div>{orderShowCompV2}</div>
            </Card>
        </div>
    );
});
