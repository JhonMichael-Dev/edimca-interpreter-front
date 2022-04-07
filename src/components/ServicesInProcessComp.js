import React, { useRef } from "react";
import { observer } from "mobx-react";
import { Toast } from "primereact/toast";

import { OperatorAndServiceLstComp } from "./operator/OperatorAndServiceLstComp";
import { useDataStore } from "../data/DataStoreContext";

export const ServicesInProcessComp = observer((props) => {
    /*
    Variables
    */
    const toast = useRef(null);

    /*
    Init
    */

    /*
    Store
    */
    const dataStore = useDataStore();

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
            <OperatorAndServiceLstComp storeMcu={dataStore.authPrincipalUser.store.mcu} />
        </div>
    );
});
