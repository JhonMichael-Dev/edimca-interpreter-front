import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";

// Prime components
import { ToggleButton } from "primereact/togglebutton";
import { confirmDialog } from "primereact/confirmdialog";

// Services
import OrderDataService from "../../service/OrderDataService";
import { OrderServicesIconResumeComp } from "../order/OrderServicesIconResumeComp";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OrderStatusComp } from "../order/OrderStatusComp";
import { TransfersLstDetailComp } from "./TransfersLstDetailComp";
import { TransfersLstIncomingDetailComp } from "./TransfersLstIncomingDetailComp";

export const TransfersLstIncomingComp = observer((props) => {
    /*
  Variables
  */
    const [onlyPendingOrders, setOnlyPendingOrders] = useState(true);
    const [lstOrders, setLstOrders] = useState([]);
    const dt = useRef(null);
    const [selOrderIncoming, setSelOrderIncoming] = useState(null);

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
            //handleQueryOrders(onlyPendingOrders);
        }
    };

    const handleQueryOrders = (onlyPendingOrders) => {
        let lstPendingStatus = ["PENDIENTE", "EN_PROCESO"];

        if (props.selStore) {
            props.setLoading(true);
            OrderDataService.queryOrdersByStore(props.selStore).then((valid) => {
                if (valid.data && valid.data.success) {
                    let lstFiltered = valid.data.obj.filter((orderX) => !onlyPendingOrders || lstPendingStatus.includes(orderX.status));
                    //setLstOrders(valid.data.obj);
                    setLstOrders(lstFiltered);
                }
                props.setLoading(false);
            });
        }
    };

    /*
    const handleFilterOrders = (ev) => {
        handleQueryOrders(ev);
        setOnlyPendingOrders(ev);
    };
    */

    const handleProcess = (ev) => {
        //console.log("ev: ", ev);
        setSelOrderIncoming(null);
        props.showMessage({ severity: "info", summary: "Aviso", message: "Servicio ha sido asignado a: " + ev.operator.username + ", prioridad: " + ev.priority.name });
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
            acceptLabel: "Procesar",
            acceptIcon: "pi pi-check",
            rejectIcon: "pi pi-times",
        });
    };

    let orderShowComp =
        lstOrders && lstOrders.length > 0
            ? lstOrders.map((orderX) => {
                  return (
                      <div key={orderX.jdeOrderId} className="grid">
                          <div className="p-grid col-4 lg:col-2 xl:col-2">{orderX.jdeOrderType.code}</div>
                          <div className="p-grid col-4 lg:col-2 xl:col-2">{orderX.jdeOrderId}</div>
                          <OrderServicesIconResumeComp selOrder={orderX} />
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
    let clientCompPromes = (rowData) => {
        return (
            <div>
                <div className="col-12 lg:col-12 xl:col-12">
                    <b>{rowData.promise}</b>
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
            "row-boContainsInProcessDevolutions": data.priority && data.priority.code === "EMERGENTE",
        };
    };

    let orderLstIncomingComp =
        lstOrders && lstOrders.length > 0 ? (
            <DataTable
                value={lstOrders}
                selectionMode="single"
                selection={selOrderIncoming}
                onSelectionChange={(e) => setSelOrderIncoming(e.value)}
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
                <Column header="Origen" body={priorityComp} style={{ width: "10%", textAlign: "center", alignContent: "center" }} sortable sortField="priority.code"></Column>
                <Column header="Tipo orden" field="jdeOrderType.code" style={{ width: "8%" }} sortable sortField="jdeOrderType.code"></Column>
                <Column header="Num. orden" field="jdeOrderId" style={{ width: "8%" }} sortable sortField="jdeOrderId"></Column>
                <Column header="Estado" body={statusComp} style={{ width: "160px", textAlign: "center", alignContent: "center", justifyContent: "center" }} sortable sortField="status"></Column>
                <Column header="Cliente" body={clientComp} style={{ width: "25%" }} sortable sortField="client.firstName"></Column>
                <Column header="Promesa Cliente" body={clientCompPromes} style={{ width: "25%" }} sortable sortField="client.firstName"></Column>
                <Column
                    header="Servicios pendientes"
                    body={orderServicesIconResumeComp}
                    style={{
                        width: "50%",
                    }}
                ></Column>
            </DataTable>
        ) : (
            <></>
        );

    let orderLstIncomingDetailComp = selOrderIncoming ? <TransfersLstIncomingDetailComp selOrder={selOrderIncoming} setSelOrder={(ev) => setSelOrderIncoming(ev)} handleProcess={(ev) => handleProcess(ev)} /> : "";

    /*
  Return
  */
    return (
        <div className="grid card">
            <div className="grid col-12 lg:col-12 xl:col-12">
                <div className="col-12 lg:col-5 xl:col-5asdf" style={{ textAlign: "left" }}>
                    <b>{props.header ? props.header : "Lista de órdenes de trabajo"}</b>
                </div>
            </div>
            <div>
                {orderLstIncomingComp}
                {orderLstIncomingDetailComp}
            </div>
        </div>
    );
});
