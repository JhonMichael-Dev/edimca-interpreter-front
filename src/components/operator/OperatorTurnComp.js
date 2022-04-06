import React, { useEffect } from "react";
import { observer } from "mobx-react";

// Prime components
import { Button } from "primereact/button";
import { OperatorPauseButtonComp } from "./OperatorPauseButtonComp";

export const OperatorTurnComp = observer((props) => {
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
        <React.Fragment>
            <Button
                className={"p-button-rounded p-button-" + (props.status === "NOCTURNO" ? "warning" : props.status === "PENDIENTE" ? "secondary" : props.status === "EN_PROCESO" ? "warning" : props.status === "PAUSADO" ? "info" : props.status === "PARADO" ? "danger" : "success")}
                style={{ fontWeight: "bold", fontSize: 12, justifyContent: "center" }}
            >
                {props.status}
            </Button>
            {props.pauseReason != "" ? (
                <React.Fragment>
                    &nbsp;
                    <div style={{ fontSize: "12px" }}>{props.pauseReason}</div>
                </React.Fragment>
            ) : (
                ""
            )}
        </React.Fragment>
    );
});
