import React, { useEffect, useState, useContext, useRef } from "react";
import { observer } from "mobx-react";
import { Dialog } from "primereact/dialog";
import { useDataStore } from "../../data/DataStoreContext";

export const LoadingDialogComp = observer((props) => {
    /*
    Store
    */
    const dataStore = useDataStore();

    /**
     * Return
     */
    return (
        <Dialog
            header="Procesando.."
            visible={dataStore.loading}
            onHide={(ev) => dataStore.setLoading(false)}
            style={{
                width: "240px",
                textAlign: "center",
            }}
            closable
            resizable={false}
        >
            <img src={"/assets/images/loader6.gif"} className="pos-edimca-button-noLabel" style={{ width: "160px", height: "120px" }}></img>
        </Dialog>
    );
});
