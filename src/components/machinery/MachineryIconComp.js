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

    let imageName = "/assets/images/" + (props.type === "machine" ? "machinery_": "serviceType_") + (props.machineryData.jdeCode == undefined ? props.machineryData : props.machineryData.jdeCode) + ".png";
    /*
  Return
  */

    return (
        <div className="card" style={{ width: "150px", textAlign: "center", alignContent: "center", justifyContent: "center", display: "inline-block" }} title={props.machineryData.jdeCode}>
            <i className="p-overlay-badge">
                <img src={imageName} alt={props.machineryData ? imageName : "-"} className="pos-edimca-button-noLabel" style={{ width: props.width ? props.width : "90px", height: props.height ? props.height : "90px" }}></img>
                <div style={{ fontSize: 10 }}> {props.machineryData.jdeCode == undefined ? props.machineryData : props.machineryData.jdeCode}</div>
            </i>
        </div>
    );
});
