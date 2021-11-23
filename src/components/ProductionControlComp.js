import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";

// Prime components
import { Button as PrimeButton } from "primereact/button";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import moment from "moment";

// Own components
import { OrderSelectionComp } from "./OrderSelectionComp";

// Services
import StoreDataService from "../service/StoreDataService";

export const ProductionControlComp = observer((props) => {
    /*
  Variables
  */
    const [selStore, setSelStore] = useState(null);
    const [lstStores, setLstStores] = useState([]);
    const [selDateTo, setSelDateTo] = useState(moment().set({ hour: 23, minute: 59, second: 59, millisecond: 0 }));
    const growl = useRef(null);
    const dt = useRef(null);
    const [visible, setVisible] = useState(false);

    /*
  Init
  */
    useEffect(() => {
        loadAvailables();
    }, [selStore, lstStores]);

    /*
  Context  
  */

    /*
  Formats
  */
    const statusFormater = (row) => {
        return (
            <div
                style={{
                    color: row.accountStateStatus === "PROCESANDO" ? "#2471A3" : row.accountStateStatus === "GENERADO" ? "green" : row.accountStateStatus === "EXPIRADO" ? "gray" : row.accountStateStatus === "ERROR_DE_DESCARGA" ? "IndianRed" : "black",
                    fontWeight: row.accountStateStatus === "GENERADO" ? "bold" : "normal",
                }}
            >
                {row.accountStateStatus}
            </div>
        );
    };

    /*
  Methods
  */
    const loadAvailables = () => {
        handleQueryStores();
    };

    const handleQueryStores = () => {
        StoreDataService.queryStores().then((valid) => {
            console.log("handleQueryStores:", valid);
            if (valid.data && valid.data.success) {
                setLstStores(valid.data.obj);
            }
        });
    };

    const handleProcess = (ev) => {};

    const showMess = (message, severity) => {
        growl.current.show({
            severity: severity,
            summary: "",
            detail: message,
            life: (message.length / 10) * 1000,
        });
    };

    const showProcessConfirmDialog = () => {
        confirmDialog({
            message: "Seguro desea procesar un nuevo estado de cuenta (An8: " + selStore.jdeAn8 + " y Fecha: " + selDateTo.format("YYYY-MM-DD") + ") ?",
            header: "Confirmación",
            icon: "pi pi-exclamation-triangle",
            accept: () => handleProcess(selStore),
            reject: () => setVisible(false),
            acceptLabel: "Procesar",
            acceptIcon: "pi pi-check",
            rejectIcon: "pi pi-times",
        });
    };

    /*
  Options
  */

    /*
  Return
  */
    return (
        <>
            <Toast ref={growl} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
            <OrderSelectionComp DataStore={props.DataStore} rendered={!selStore} />
        </>
    );
});
