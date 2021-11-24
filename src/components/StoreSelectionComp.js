import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

// Prime components
import { Card } from "primereact/card";
import { confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
// Services
import StoreDataService from "../service/StoreDataService";
import { PasswordOperationComp } from "./PasswordOperationComp";

export const StoreSelectionComp = observer((props) => {
    /*
  Variables
  */
    const [visible, setVisible] = useState(false);
    const [lstStores, setLstStores] = useState([]);
    const [selectLstStore, setSelectLstStore] = useState(null);
    const [lstStoreData, setLstStoreData] = useState([]);
    const [dlgPassword, selDlgPassword] = useState(false);
    let password = "";
    const [btn1, selBtn1] = useState("");
    const [btn2, selBtn2] = useState("");
    const [btn3, selBtn3] = useState("");
    const [btn4, selBtn4] = useState("");
    const [btn5, selBtn5] = useState("");
    const [btn6, selBtn6] = useState("");
    const [btn7, selBtn7] = useState("");
    const [btn8, selBtn8] = useState("");
    const [btn9, selBtn9] = useState("");
    const [btn0, selBtn0] = useState("");

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
    const loadAvailables = () => {
        handleQueryStore();
    };

    const handleQueryStore = () => {
        StoreDataService.queryStores().then((valid) => {
            console.log("handleQueryStore", valid);
            if (valid.data && valid.data.success) {
                valid.data.obj.map((storeX) => {
                    setLstStoreData((oldArray) => [storeX, ...oldArray]);
                });

                let datax = valid.data.obj.map((storeX) => {
                    return {
                        label: storeX.mcu + " - " + storeX.name,
                        value: storeX.mcu,
                    };
                });
                setLstStores(datax);
            }
        });
    };

    const handleProcess = (ev) => {};

    /*
  Inner Components
  */
    const showProcessConfirmDialog = () => {
        confirmDialog({
            message: "Seguro desea procesar..",
            header: "Confirmación",
            icon: "pi pi-exclamation-triangle",
            accept: () => handleProcess(null),
            reject: () => setVisible(false),
            acceptLabel: "Procesar",
            acceptIcon: "pi pi-check",
            rejectIcon: "pi pi-times",
        });
    };

    const onSelecStore = (e) => {
        setSelectLstStore(e.value);
        selDlgPassword(true);
    };

    const onSelecStoreTbl = (e) => {
        selDlgPassword(true);
        props.handleSelectStore(e);
    };
    const onHide = () => {
        selDlgPassword(false);
    };

    const renderFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => onHide()} autoFocus />
            </div>
        );
    };

    const login = (e) => {
        switch (e.target.value) {
            case "1":
                password = password + e.target.value;
                console.log(password);
                break;
            case "2":
                password = password + e.target.value;
                console.log(password);
                break;
            case "3":
                password = password + e.target.value;
                console.log(password);
                break;
            case "4":
                password = password + e.target.value;
                console.log(password);
                break;
            case "5":
                password = password + e.target.value;
                console.log(password);
                break;
            case "6":
                password = password + e.target.value;
                console.log(password);
                break;
            case "7":
                password = password + e.target.value;
                console.log(password);
                break;
            case "8":
                password = password + e.target.value;
                console.log(password);
                break;
            case "9":
                password = password + e.target.value;
                console.log(password);
                break;
            case "0":
                password = password + e.target.value;
                console.log(password);
                break;
            default:
                return password;
        }
    };

    /*    const onclickBtn1 = (e) => {
        console.log(e.target.value);
        case
        password = password + document.getElementById("btn1").value;
        console.log(password)
    }; */

    /*
  Return
  */
    return (
        <>
            {!props.rendered ? (
                ""
            ) : (
                <div className="grid">
                    <div className="col-12 xl:col-6">
                        <div className="card">
                            <span className="p-float-label">
                                <Dropdown id="dropdown" options={lstStores} value={selectLstStore} onChange={onSelecStore} style={{ width: "100%", height: "70px" }}></Dropdown>
                                <label htmlFor="dropdown">Seleccione una tienda </label>
                            </span>
                        </div>
                    </div>
                    <div className="col-12 xl:col-6">
                        <div className="card">
                            <h6>Selección de tienda</h6>
                            <DataTable className="p-datatable-customers" value={lstStoreData} rows={5} selectionMode="single" paginator onSelectionChange={onSelecStoreTbl}>
                                <Column field="mcu" header="Cod." />
                                <Column field="name" header="Nombre" />
                                <Column field="address1" header="Dirección" />
                            </DataTable>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <Dialog header="Clave" visible={dlgPassword} modal={true} style={{ width: "40vw" }} draggable={false} onHide={() => onHide()}>
                    <div className="grid">
                        {" "}
                        <div className="col-12 lg:col-6 xl:col-3">
                            <Button label="1" id="btn1" value="1" onClick={(e) => login(e)} className="p-button-info" style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <Button label="2" id="btn2" value="2" onClick={(e) => login(e)} className="p-button-info" style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <Button label="3" id="btn3" value="3" className="p-button-info" onClick={(e) => login(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <Button label="4" id="btn4" value="4" className="p-button-info" onClick={(e) => login(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <Button label="5" id="btn5" value="5" className="p-button-info" onClick={(e) => login(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <Button label="6" id="btn6" value="6" className="p-button-info" onClick={(e) => login(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <Button label="7" id="btn7" value="7" className="p-button-info" onClick={(e) => login(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <Button label="8" id="btn8" value="8" className="p-button-info" onClick={(e) => login(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <Button label="9" id="btn9" value="9" className="p-button-info" onClick={(e) => login(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <Button label="0" id="btn0" value="0" className="p-button-info" onClick={(e) => login(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <Button label="Aceptar" className="p-button-success" style={{ width: "100%", height: "100%", fontSize: "18px" }} />
                        </div>
                        <div className="col-12 lg:col-6 xl:col-3">
                            <Button label="Cambiar Clave" className="p-button-primary" style={{ width: "100%", height: "100%", fontSize: "15px" }} />
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    );
});
