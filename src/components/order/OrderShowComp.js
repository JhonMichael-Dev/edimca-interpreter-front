import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";

// Prime components
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

// Services
//import OrderDataService from "../service/OrderDataService";

export const OrderShowComp = observer((props) => {
    /*
  Variables
  */
    const [visible, setVisible] = useState(false);
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
    const loadAvailables = () => {};

    const handleProcess = (ev) => {};

    const handleSelectOrderHeader = (ev) => {
        //console.log("handleSelectOrderHeader", ev);
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
            reject: () => setVisible(false),
            acceptLabel: "Procesar",
            acceptIcon: "pi pi-check",
            rejectIcon: "pi pi-times",
        });
    };

    /*
  Return
  */
    return (
        <div onClick={(ev) => handleSelectOrderHeader(props.selOrder)} className="grid" style={{ width: "90vw" }}>
            <div className="grid" style={{ marginBottom: "1em" }}>
                <div className="col-12 lg:col-6 xl:col-4">Hola</div>
                <div className="col-12 lg:col-6 xl:col-3">Cómo estás</div>
            </div>
        </div>
    );
});
