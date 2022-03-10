import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { OperatorIconComp } from "./OperatorIconComp";
import { OperatorTurnComp } from "./OperatorTurnComp";
import { OperatorServicesIconResumeComp } from "./OperatorServicesIconResumeComp";
import { OperatorCountComp } from "./OperatorCountComp";
import { OperatorServiceIconComp } from "./OperatorServiceIconComp";
import { OperatorActionsComp } from "./OperatorActionsComp";

import OperatorDataService from "../../service/OperatorDataService";

export const OperatorAndServiceLstComp = observer((props) => {
    /*
    Variables
    */

    const [lstOperators, setLstOperators] = useState(null);
    const [selOperator, setSelOperator] = useState(null);
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
        handleQueryOperatorsByStore();
    };

    const handleQueryOperatorsByStore = () => {
        OperatorDataService.queryServicesByOperator(props.storeMcu).then((valid) => {
            if (valid.data && valid.data.success) {
                setLstOperators(valid.data.obj);
            }
        });
    };

    /*
    Inner Components
    */

    let operatorIconComp = (rowData) => {
        return <OperatorIconComp operatorUsername={rowData.operator.username} />;
    };

    let operatorIconComp2 = () => {
        return <OperatorIconComp operatorUsername={selOperator.operator.username} />;
    };

    let operatorTurnComp = (rowData) => {
        return <OperatorTurnComp status={rowData.operator.turno} />;
    };

    let operatorTurnComp2 = (rowData) => {
        //console.log(rowData.status);
        return <OperatorTurnComp status={rowData.status} />;
    };

    let operatorActionsComp = (rowData) => {
        //console.log(rowData);
        return (
            <div className="grid">
                <div className="col-3">
                    <OperatorActionsComp action={"Play"} icon={"play"} color={"warning"} rowData={rowData} selOrder={selOperator} />
                </div>
                <div className="col-3">
                    <OperatorActionsComp action={"Stop"} icon={"pause"} color={"info"} rowData={rowData} selOrder={selOperator} />
                </div>
                <div className="col-3">
                    <OperatorActionsComp action={"Daño"} icon={"exclamation-triangle"} color={"danger"} rowData={rowData} selOrder={selOperator} />
                </div>
                <div className="col-3">
                    <OperatorActionsComp action={"Fin"} icon={"shopping-cart"} color={"success"} rowData={rowData} selOrder={selOperator} />
                </div>
            </div>
        );
    };

    let operatorCountComp = (rowData) => {
        return <OperatorCountComp services={rowData.lstServices} />;
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
                <OperatorServicesIconResumeComp services={rowData.lstServices} selStore={props.storeMcu} />
            </div>
        );
    };

    let serviceComp = (rowData) => {
        return (
            <div>
                <div className="col-12 lg:col-12 xl:col-12">
                    <b>{rowData.product.code}</b>
                </div>
                <div className="col-12 lg:col-12 xl:col-12">{rowData.product.description1}</div>
            </div>
        );
    };

    let serviceTypeIconComp = (rowData) => {
        return (
            <div key={rowData.idOrderDetail}>
                <OperatorServiceIconComp serviceType={rowData.product.serviceType} badgeNumber={null} />
            </div>
        );
    };

    let operatorTableComp = (
        <DataTable value={lstOperators} selectionMode="single" onRowSelect={(e) => setSelOperator(e.data)} dataKey="username" ref={dt} responsiveLayout="scroll" scrollable scrollHeight="700px" virtualScrollerOptions={{ itemSize: 46 }}>
            <Column header="Operador" body={operatorIconComp} style={{ width: "50px", textAlign: "center", alignContent: "center" }} sortable sortField="username"></Column>
            <Column header="Turno" body={operatorTurnComp} style={{ width: "20px", textAlign: "center", alignContent: "center", justifyContent: "center" }} sortable sortField="turno"></Column>
            <Column header="Servicios asignados" body={operatorCountComp} style={{ width: "30px", textAlign: "center", alignContent: "center", justifyContent: "center" }}></Column>
            <Column
                header="Servicios pendientes"
                body={orderServicesIconResumeComp}
                style={{
                    width: "40%",
                    textAlign: "center",
                    alignContent: "center",
                    justifyContent: "center",
                }}
            ></Column>
        </DataTable>
    );

    let operatorServiceComp = (selOperator) => {
        console.log(selOperator);
        return (
            <DataTable value={selOperator.lstServices} selectionMode="single" responsiveLayout="scroll" scrollable scrollHeight="700px" virtualScrollerOptions={{ itemSize: 46 }}>
                <Column header="Operador" body={operatorIconComp2} style={{ width: "15%", textAlign: "center", alignContent: "center" }} sortable sortField="username"></Column>
                <Column header="Estado" body={operatorTurnComp2} style={{ width: "10%", textAlign: "center", alignContent: "center", justifyContent: "center" }} sortable sortField="Estado"></Column>
                <Column header="Producto" body={serviceComp} style={{ width: "15%" }}></Column>
                <Column header="Tipo servicio" body={serviceTypeIconComp} style={{ width: "10%" }}></Column>
                <Column header="Seleccionar" body={operatorActionsComp} style={{ width: "30%", textAlign: "center", alignContent: "center", justifyContent: "center" }}></Column>
            </DataTable>
        );
    };

    return <div>{selOperator === null ? operatorTableComp : operatorServiceComp(selOperator)}</div>;
});
