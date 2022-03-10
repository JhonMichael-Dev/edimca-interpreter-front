import React, { useRef } from "react";
import { observer } from "mobx-react";
import { Toast } from "primereact/toast";

import { OperatorAndServiceLstComp } from "./operator/OperatorAndServiceLstComp"

export const ServicesInProcessComp = observer((props) => {
    /*
    Variables
    */
      const toast = useRef(null);

    /*
    Init
    */

    /*
    Context  
    */

    /*
    Formats
    */

    /*
    Methods
    */

    /*
    Inner components
    */
    /*
    Return
    */
    return (
        <div className="p-fluid p-grid">
            <Toast ref={toast} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
            <OperatorAndServiceLstComp
                storeMcu={null}
            />
        </div>
    );
});
