import React, { useEffect } from 'react';
import { observer } from "mobx-react";

// Prime components
import { Button } from "primereact/button";

export const OperatorActionsComp = observer((props) => {
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
    const loadAvailables = () => { };

    /*
    Inner Components
    */

    /*
    Return
    */
    return (
        <Button
            className={"p-button-rounded"}
            style={{ fontWeight: "bold", fontSize: 12, justifyContent: "center" }}
        >
            {props.action}
        </Button>
    );
});