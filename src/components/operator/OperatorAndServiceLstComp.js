import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { OperatorIconComp } from "./OperatorIconComp";
import { OperatorTurnComp } from "./OperatorTurnComp";
import { OperatorServicesIconResumeComp } from "./OperatorServicesIconResumeComp";

import OperatorDataService from "../../service/OperatorDataService";
import OrderDataService from "../../service/OrderDataService";
import { OperatorCountComp } from "./OperatorCountComp";

export const OperatorAndServiceLstComp = observer((props) => {

    /*
    Variables
    */

    const [lstOperators, setLstOperators] = useState(null);
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
        OperatorDataService.queryServicesByOperator(props.storeMcu).then((valid) =>{
            if (valid.data && valid.data.success) {
                setLstOperators(valid.data.obj);
                //console.log(valid.data.obj);
            }
        });
    };

    /*
    Inner Components
    */

    let operatorIconComp = (rowData) => {
        return <OperatorIconComp operatorUsername={rowData.operator.username} />;
    };

    let operatorTurnComp = (rowData) => {
        return (
            <OperatorTurnComp status={rowData.operator.turno}/>
        );
    };

    let operatorCountComp = (rowData) => {
        return (
            <OperatorCountComp services = {rowData.lstServices} />
        );
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
                <OperatorServicesIconResumeComp services={rowData.lstServices} selStore={props.storeMcu}/>
            </div>
        );
    };

    let operatorTableComp = (
        <DataTable
            value={lstOperators}
            dataKey="username"
            ref={dt}
            responsiveLayout="scroll"
            scrollable
            scrollHeight="700px"
            virtualScrollerOptions={{ itemSize: 46 }}
        >
            <Column header="Operador" body={operatorIconComp} style={{ width: "50px", textAlign: "center", alignContent: "center" }} sortable sortField="username"></Column>
            <Column header="Turno" body={operatorTurnComp} style={{ width: "20px", textAlign: "center", alignContent: "center", justifyContent: "center" }} sortable sortField="turno"></Column>
            <Column header="Servicios asignados" body={operatorCountComp} style={{ width: "30px", textAlign: "center", alignContent: "center", justifyContent: "center" }}></Column>
            <Column
                    header="Servicios pendientes"
                    body={orderServicesIconResumeComp}
                    style={{
                        width: "40%",
                        textAlign: "center", alignContent: "center", justifyContent: "center"
                    }}
                ></Column>
        </DataTable>
    );


    return (
        <div>
            {operatorTableComp}
        </div>
    );
});