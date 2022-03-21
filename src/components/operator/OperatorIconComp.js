import React, { useEffect } from "react";
import { observer } from "mobx-react";

// Prime components

// Services

export const OperatorIconComp = observer((props) => {
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
