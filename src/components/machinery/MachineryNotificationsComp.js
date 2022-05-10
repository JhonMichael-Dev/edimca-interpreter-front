import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

// Prime components
import { Badge } from "primereact/badge";

export const MachineryNotificationsComp = observer((props) => {
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
        <div style={{ width: "60px", textAlign: "center", marginTop: "20%"}} title={props.serviceType}>
            <i className="p-overlay-badge">
                <img src={"/assets/images/serviceType_" + props.serviceType + ".png"} className="pos-edimca-button-noLabel" style={{ width: "20px", height: "20px" }} />
                {props.badgeNumber !== null ? 
                    <Badge
                        value={props.badgeNumber ? props.badgeNumber : 0} 
                        severity={props.badgeNumber && props.badgeNumber > 0 ? "warning" : "success"} /> 
                : ""}
                <div style={{ fontSize: 8 }}> {props.serviceType}</div>
            </i>
            <div style={{ fontSize: 8 }}> {props.jdeStatusCode}</div>
        </div>
    );
});
