import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

// Prime components
import { confirmDialog } from "primereact/confirmdialog";

// Images
//import iconLostSale from "../../images/ruteadoIcon.png";

// Services
//import OrderDataService from "../service/OrderDataService";

export const OperatorIconComp = observer((props) => {
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

    let imageName = "/assets/images/operator_" + props.operatorUsername + ".png";

    /*
  Return
  */
  return (
    <div
      className="p-card"
      style={{ textAlign: "center", backgroundColor: "unset", boxShadow: "none" }}
      title={props.operatorUsername}>
      <i className="p-overlay-badge">
        <img src={imageName} alt={props.operatorUsername ? imageName : "-"} className="pos-edimca-button-noLabel" style={{ width: "70px", height: "70px" }}></img>
        {/*props.badgeNumber !== null ? <Badge value={props.badgeNumber ? props.badgeNumber : 0} severity={props.badgeNumber && props.badgeNumber > 0 ? "warning" : "success"}></Badge> : ""*/}
        <div style={{ fontSize: 10 }}> {props.operatorUsername}</div>
      </i>
    </div>
  );
});
