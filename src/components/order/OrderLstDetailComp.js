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
import ProductDataService from "../../service/ProductDataService";
import { OrderShowComp } from "./OrderShowComp";
import { OrderServicesIconComp } from "./OrderServicesIconComp";
import { OrderServicesIconResumeComp } from "./OrderServicesIconResumeComp";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { OperatorIconComp } from "../operator/OperatorIconComp";
import { OrderStatusComp } from "./OrderStatusComp";
import { OperatorAndAssistantsLstComp } from "../operator/OperatorAndAssistantsLstComp";
import { MachinerySelectionLstComp } from "../machinery/MachinerySelectionLstComp";
import { ProductInfoComp } from "../product/ProductInfoComp";

export const OrderLstDetailComp = observer((props) => {
    /*
  Variables
  */
    const [onlyPendingOrders, setOnlyPendingOrders] = useState(true);
    const [selOrderDetail, setSelOrderDetail] = useState(null);
    const [selMachinery, setSelMachinery] = useState(null);
    const dt = useRef(null);
    const toast = useRef(null);

    const [expandedRows, setExpandedRows] = useState(null);

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

    const handleProcessSelectMachinery = (ev) => {
        //console.log("handleProcessSelectMachinery", ev);
        setSelMachinery(ev);
    };

    const handleSelectOperators = (ev) => {
        //console.log("handleSelectOperators", ev.username);
        setSelOrderDetail(null);
        //showMessage({ message: "Servicio en proceso para el usuario " + ev, severity: "info" });
        let payload = {
            idWorkingOrder: selOrderDetail.idWorkingOrder,
            machinery: selMachinery,
            operator: ev,
        };
        props.handleProcess(payload);
    };

    const handleQueryProductByJdeCode = async (jdeProductCode) => {
        await ProductDataService.queryProductByCode(jdeProductCode).then((valid) => {
            //console.log("handleQueryProductByJdeCode", valid);
            if (valid && valid.data.success) {
                //console.log("valid.data.obj", jdeProductCode, valid.data.obj);
                return valid.data.obj;
            }
        });
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="datatable-rowexpansion-demo">
                <h6>Ordenes para el grupo {data.group}</h6>
                <DataTable value={data.lstWorkingOrderDetail} responsiveLayout="scroll">
                    <Column header="Operador" body={operatorIconComp} style={{ width: "130px", textAlign: "center", alignContent: "center" }} sortable sortField="operator.username"></Column>
                    <Column header="Estado" body={statusComp} style={{ width: "160px", textAlign: "center", alignContent: "center" }} sortable sortField="status"></Column>
                    <Column header="Cantidad" field="quantityRequested" style={{ width: "20%", textAlign: "center" }} sortable sortField="quantityRequested"></Column>
                    <Column header="Producto" body={productComp} style={{ width: "30%" }} sortable sortField="productDto.description1"></Column>
                    <Column header="Tipo servicio" body={serviceTypeIconComp} style={{ width: "25%" }} sortable sortField="product.serviceType.description1"></Column>
                    <Column header="Seleccionar" body={selectionComp} style={{ width: "20%" }}></Column>
                </DataTable>
            </div>
        );
    }

    /*
  Inner Components
  */
    let productComp = (rowData) => {
        //console.log("rowData", rowData);
        return <ProductInfoComp jdeProductCode={rowData.jdeProductCode} code description1 />;
    };

    let statusComp = (rowData) => {
        return (
            <OrderStatusComp status={rowData.status} />
            /*
            <Button key={rowData.idWorkingOrder} className={"p-button-rounded p-button-" + (rowData.status === "PENDIENTE" ? "secondary" : rowData.status === "EN_PROCESO" ? "warning" : "success")} style={{ fontWeight: "bold", fontSize: 12 }}>
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
            <div key={rowData.idWorkingOrder}>
                <OrderServicesIconComp serviceType={rowData.jdeServiceType} badgeNumber={null} />
            </div>
        );
    };

    let selectionComp = (rowData) => {
        let lstSelectableStatus = ["PENDIENTE", "PAUSADO"];
        let isSelectable = lstSelectableStatus.includes(rowData.status);
        return (
            <Button
                key={rowData.idWorkingOrder}
                onClick={() => {
                    setSelOrderDetail(rowData);
                }}
                icon="pi pi-check"
                className={"p-button-rounded p-button-secondary " + (isSelectable ? "" : "p-button-raised p-button-text")}
                disabled={!isSelectable}
                style={{ fontWeight: "bold", fontSize: 13, height: "70px", width: "80px" }}
            ></Button>
        );
    };

    const transformador = () => {
        let lstTemp = [...props.selOrder.lstWorkingOrder];
        let grupos = [];
        lstTemp.map((x) => {
            grupos.push(x.productionGroup);
        });
        const uniqueArr = [...new Set(grupos)];
        //console.log("grupos: " + uniqueArr)
        let lstWorkingOrder = [];
        uniqueArr.map((u) =>{
            let lstWorkingOrderDetail = lstTemp.filter(f => f.productionGroup == u)
            let g = {
                group: u,
                completeServices: lstWorkingOrderDetail.filter(service => service.status === 'COMPLETADO').length,
                lstWorkingOrderDetail: lstWorkingOrderDetail
            };
            lstWorkingOrder.push(g);
        });

        //console.log(lstWorkingOrder2.lstWorkingOrder);
        return(
            <DataTable
                value={lstWorkingOrder}
                /*
                selectionMode="single"
                selection={selOrderDetail}
                onSelectionChange={(e) => setSelOrderDetail(e.value)}
                onRowSelect={onRowSelect}
                onRowUnselect={onRowUnselect}
                */
                expandedRows={expandedRows} 
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="group"
                ref={dt}
                responsiveLayout="scroll"
                scrollable
                scrollHeight="480px"
                virtualScrollerOptions={{ itemSize: 46 }}
                lazy
            >
                <Column expander style={{ width: '3em'}} />
                <Column field="group" header="Grupos de Ordenes" />
                <Column field="completeServices" header="Ordenes completadas"> </Column>

            </DataTable>
        );
    }

    let orderDetailTableComp =
        props.selOrder && props.selOrder.lstWorkingOrder && props.selOrder.lstWorkingOrder.length > 0 ? transformador() : (
            <></>
        );

    let machinerySelectionLstComp = selOrderDetail ? (
        <MachinerySelectionLstComp
            showAsDialog
            handleProcess={(ev) => handleProcessSelectMachinery(ev)}
            storeMcu={null}
            serviceType={selOrderDetail.jdeServiceType}
            onHide={(ev) => {
                setSelMachinery(null);
                setSelOrderDetail(null);
            }}
        />
    ) : (
        ""
    );

    let operatorAndAssistantsLstComp = selMachinery ? (
        <OperatorAndAssistantsLstComp
            handleProcess={(ev) => handleSelectOperators(ev)}
            storeMcu={null}
            skill={selOrderDetail ? selOrderDetail.jdeServiceType : null}
            onHide={(ev) => {
                setSelMachinery(null);
                setSelOrderDetail(null);
            }}
        />
    ) : (
        ""
    );

    /*
  Return
  */
    return (
        <>
            <Toast ref={toast} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
            <Dialog
                header={"Detalle de servicios, orden: " + props.selOrder.jdeOrderTypeCode + " " + props.selOrder.jdeOrderId}
                visible={props.selOrder !== null}
                onHide={(ev) => props.setSelOrder(null)}
                style={{
                    //width: "100%",
                    //height: "100%",
                    textAlign: "center",
                }}
                className="col-12 lg:col-10 xl:col-9"
                modal
                closable
                draggable={false}
                resizable={false}
            >
                {orderDetailTableComp}
            </Dialog>
            {machinerySelectionLstComp}
            {operatorAndAssistantsLstComp}
        </>
    );
});
