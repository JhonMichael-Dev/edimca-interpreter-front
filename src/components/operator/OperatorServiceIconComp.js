import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

// Prime components
import { Badge } from "primereact/badge";

export const OperatorServiceIconComp = observer((props) => {
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

    /*
  Return
  */
    return (
        <div className="card" style={{ width: "100%", textAlign: "center" }} title={props.serviceType}>
            <i className="p-overlay-badge">
                <img src={"/assets/images/serviceType_" + props.serviceType + ".png"} className="pos-edimca-button-noLabel" style={{ width: "30px", height: "30px" }}></img>
                {props.badgeNumber !== null ? <Badge value={props.badgeNumber ? props.badgeNumber : 0} severity={props.badgeNumber && props.badgeNumber > 0 ? "warning" : "success"}></Badge> : ""}
                
            </i>
            <div style={{ fontSize: 10 }}> {props.serviceType}</div>
            <div style={{ fontSize: 8 }}> {props.statusService}</div>
        </div>
    );
});