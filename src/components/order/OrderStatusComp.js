import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";

// Prime components
import { Button } from "primereact/button";

// Services
//import OrderDataService from "../service/OrderDataService";

export const OrderStatusComp = observer((props) => {
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
        <Button className={"p-button-rounded p-button-" + (props.status === "PENDIENTE" ? "secondary" : props.status === "EN_PROCESO" ? "warning" : props.status === "EN_PAUSA" ? "info" : "success")} style={{ fontWeight: "bold", fontSize: 12 }}>
            {props.status}
        </Button>
    );
});
