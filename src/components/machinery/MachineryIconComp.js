import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

// Prime components
import { Badge } from "primereact/badge";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

// Images
//import iconLostSale from "../../images/ruteadoIcon.png";

// Services
//import OrderDataService from "../service/OrderDataService";

export const MachineryIconComp = observer((props) => {
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

    /*
  Inner Components
  */

    //let imageName = "/assets/images/machinery_" + props.machineryData.jdeCode + ".png";

    let imageName = "/assets/images/machinery_" + props.machineryData.code + ".png";
    /*
  Return
  */

    // return (
    // <div className="card" style={{ width: "150px", textAlign: "center", alignContent: "center", justifyContent: "center", display: "inline-block" }} title={props.machineryData.jdeCode}>
    //  <i className="p-overlay-badge">
    //<img src={imageName} alt={props.machineryData ? imageName : "-"} className="pos-edimca-button-noLabel" style={{ width: "90px", height: "90px" }}></img>
    //{/*props.badgeNumber !== null ? <Badge value={props.badgeNumber ? props.badgeNumber : 0} severity={props.badgeNumber && props.badgeNumber > 0 ? "warning" : "success"}></Badge> : ""*/}
    // <div style={{ fontSize: 10 }}> {/*props.machineryData.jdeCode*/}</div>
    //</i>
    //</div>
    //);

    return (
        <div className="card" style={{ width: "150px", textAlign: "center", alignContent: "center", justifyContent: "center", display: "inline-block" }} title={props.machineryData.code}>
            <i className="p-overlay-badge">
                <img src={imageName} alt={props.machineryData ? imageName : "-"} className="pos-edimca-button-noLabel" style={{ width: "90px", height: "90px" }}></img>
                {/*props.badgeNumber !== null ? <Badge value={props.badgeNumber ? props.badgeNumber : 0} severity={props.badgeNumber && props.badgeNumber > 0 ? "warning" : "success"}></Badge> : ""*/}
                <div style={{ fontSize: 10 }}> {props.machineryData.code}</div>
            </i>
        </div>
    );
});
