import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

// Prime components
import { Badge } from "primereact/badge";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

// Images
//import iconLostSale from "../../images/ruteadoIcon.png";

// Services
//import OrderDataService from "../service/OrderDataService";

export const OrderServicesIconComp = observer((props) => {
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
        console.log("handleSelectOrderHeader", ev);
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
        <div className="card" style={{ width: "100px", textAlign: "center", justifyContent: "center" }} title={props.serviceType}>
            <i className="p-overlay-badge">
                <img src={"/assets/images/serviceType_" + props.serviceType + ".png"} className="pos-edimca-button-noLabel" style={{ width: "40px", height: "40px" }}></img>
                {props.badgeNumber !== null ? <Badge value={props.badgeNumber ? props.badgeNumber : 0} severity={props.badgeNumber && props.badgeNumber > 0 ? "warning" : "success"}></Badge> : ""}
                <div style={{ fontSize: 10 }}> {props.serviceType}</div>
            </i>
        </div>
    );
});
