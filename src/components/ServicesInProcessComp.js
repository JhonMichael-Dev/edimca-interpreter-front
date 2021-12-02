import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
// Prime components
import { Button as PrimeButton } from "primereact/button";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import moment from "moment";

// Own components
import { StoreSelectionComp } from "./StoreSelectionComp";
import { PasswordOperationComp } from "./PasswordOperationComp";

// Services
import StoreDataService from "../service/StoreDataService";
import { Dialog } from "primereact/dialog";

export const ServicesInProcessComp = observer((props) => {
    /*
  Variables
  */
    const [selStore, setSelStore] = useState(null);
    const [lstStores, setLstStores] = useState([]);
    const [selDateTo, setSelDateTo] = useState(moment().set({ hour: 23, minute: 59, second: 59, millisecond: 0 }));
    const toast = useRef(null);
    const dt = useRef(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

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
            if (valid.data && valid.data.success) {
                setLstStores(valid.data.obj);
            }
        });
    };

    const handleSelectStore = (ev) => {
        setSelStore(ev);
    };

    const handleProcess = (ev) => {};

    const showMessage = (ev) => {
        toast.current.show({
            severity: ev.severity,
            summary: ev.summary,
            detail: ev.message,
            life: (ev.message.length / 10) * 1000,
        });
    };

    const setLoader = async (ev) => {
        if (!ev) await timeout(400);
        setLoading(ev);
    };

    function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
    }

    /*
  Inner components
  */
    let passwordComp = selStore ? <PasswordOperationComp selStore={selStore}></PasswordOperationComp> : "";
    /*
  Return
  */
    return (
        <div className="p-fluid p-grid">
            <Toast ref={toast} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
            {passwordComp}
            <Dialog
                header="Procesando.."
                visible={loading}
                onHide={(ev) => setLoading(false)}
                style={{
                    width: "240px",
                    textAlign: "center",
                }}
                closable
                resizable={false}
            >
                <img src={"/assets/images/loader6.gif"} className="pos-edimca-button-noLabel" style={{ width: "160px", height: "120px" }}></img>
                {/*
                    4 ++
                    6 +++
                     */}
            </Dialog>
        </div>
    );
});
