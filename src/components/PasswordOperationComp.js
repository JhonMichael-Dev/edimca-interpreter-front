import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

// Services
import OperatorDataService from "../service/OperatorDataService";

export const PasswordOperationComp = observer((props) => {
    /*
  Variables
  */

    const toast = useRef(null);
    const [lstStoreData, setLstStoreData] = useState([]);
    //const [dlgPassword, selDlgPassword] = useState(true);
    const [password, setPassword] = useState("");
    const [operatorHasPin, setOperatorHasPin] = useState(false);
    const [wantToChangePin, setWantToChangePin] = useState(false);
    //let password = "";
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
        validateOperatorHasPin();
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
    const validateOperatorHasPin = () => {
        let _payload = {
            username: props.operatorUsername,
        };
        OperatorDataService.operatorHasPin(_payload).then((valid) => {
            if (valid && valid.data) {
                setOperatorHasPin(valid.data.success);
            }
        });
    };

    const showMessage = (ev) => {
        toast.current.show({
            severity: ev.severity,
            summary: ev.summary,
            detail: ev.message,
            life: (ev.message.length / 10) * 1200,
        });
    };

    const onClickBtnOld = (e) => {
        switch (e.target.value) {
            case "1":
                password = password + e.target.value;
                break;
            case "2":
                password = password + e.target.value;
                break;
            case "3":
                password = password + e.target.value;
                break;
            case "4":
                password = password + e.target.value;
                break;
            case "5":
                password = password + e.target.value;
                break;
            case "6":
                password = password + e.target.value;
                break;
            case "7":
                password = password + e.target.value;
                break;
            case "8":
                password = password + e.target.value;
                break;
            case "9":
                password = password + e.target.value;
                break;
            case "0":
                password = password + e.target.value;
                break;
            default:
                return password;
        }
    };

    const onClickBtn = (e) => {
        setPassword(password + e.target.value);
        //console.log("password", password);
    };

    const login = () => {
        if (password.length > 0) {
            if (password.length === 4) {
                localStorage.setItem("passwordLocal", password);
                let _payload = {
                    username: props.operatorUsername,
                    pin: password,
                };
                OperatorDataService.loginOperator(_payload).then((valid) => {
                    //console.log("loginOperator", valid);
                    if (valid && valid.data.success) {
                        //showMessage({ message: "Clave ingresada correctamente", severity: "success" });
                        props.handleLogin();
                        //console.log("props.handleLogin()", valid.data);
                    } else if (valid && valid.data) {
                        showMessage({ message: valid.data.log, severity: "warn" });
                        setPassword("");
                    }
                });
            } else {
                showMessage({ message: "La clave debe de contener 4 digitos", severity: "error" });
                setPassword("");
            }
        } else {
            showMessage({ message: "Por favor ingresa tu clave de operador", severity: "warn" });
        }
    };

    const updateUserposPin = () => {
        let _payload = {
            username: props.operatorUsername,
            pin: password,
        };
        OperatorDataService.updateOperatorPin(_payload).then((valid) => {
            //console.log("updateOperatorPin", valid);
            if (valid && valid.data.success) {
                showMessage({ message: valid.data.log, severity: "info" });
                setOperatorHasPin(true);
            }
        });
    };

    const validateLast4DigitsFromIdentificationNumber = () => {
        let _payload = {
            username: props.operatorUsername,
            identificationNumber: password,
        };
        OperatorDataService.validateLast4DigitsFromIdentificationNumber(_payload).then((valid) => {
            //console.log("validateLast4DigitsFromIdentificationNumber", valid);
            if (valid && valid.data.success) {
                showMessage({ message: "Cédula validada, ingrese su nuevo PIN", severity: "info" });
                setOperatorHasPin(false);
                setWantToChangePin(false);
                setPassword("");
            } else if (valid.data) {
                showMessage({ message: valid.data.log, severity: "warn" });
                setPassword("");
            }
        });
    };

    /*
  Inner Components
  */

    const onHide = () => {
        //selDlgPassword(false);
        props.onHide();
    };

    /*
  Return
  */
    return (
        <div>
            <Dialog header="Clave" visible={true} modal={true} style={{ width: "60vw" }} draggable={false} onHide={() => onHide()}>
                <div className="grid">
                    <Toast ref={toast} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
                    <div className="col-12 lg:col-12 xl:col-12">{props.operatorUsername ? props.operatorUsername : "operatorUsername not send as props"} </div>
                    <div className="col-12 lg:col-12 xl:col-12" style={{ color: "green" }}>
                        {operatorHasPin ? "" : "Por favor registre su PIN (4 dígitos)"}
                        {wantToChangePin ? "Ingrese sus 4 últimos dígitos de cédula" : ""}
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="1" id="btn1" value="1" disabled={password.length === 4} onClick={(e) => onClickBtn(e)} className="p-button-info" style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="2" id="btn2" value="2" disabled={password.length === 4} onClick={(e) => onClickBtn(e)} className="p-button-info" style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="3" id="btn3" value="3" disabled={password.length === 4} className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="4" id="btn4" value="4" disabled={password.length === 4} className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="5" id="btn5" value="5" disabled={password.length === 4} className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="6" id="btn6" value="6" disabled={password.length === 4} className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="7" id="btn7" value="7" disabled={password.length === 4} className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="8" id="btn8" value="8" disabled={password.length === 4} className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="9" id="btn9" value="9" disabled={password.length === 4} className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4"></div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="0" id="btn0" value="0" disabled={password.length === 4} className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4"></div>
                    {wantToChangePin ? (
                        <div className="col-12 lg:col-6 xl:col-6">
                            <Button label="Validar" icon="pi pi-check-circle" disabled={password.length < 4} className="p-button-help" onClick={() => validateLast4DigitsFromIdentificationNumber()} style={{ width: "100%", height: "100%", fontSize: "18px" }} />
                        </div>
                    ) : operatorHasPin ? (
                        <>
                            <div className="col-12 lg:col-6 xl:col-6">
                                <Button label={props.aceptLabel ? props.aceptLabel : "Aceptar"} icon={props.icon} disabled={password.length < 4} className="p-button-success" onClick={() => login()} style={{ width: "100%", height: "100%", fontSize: "18px" }} />
                            </div>
                            <div className="col-12 lg:col-6 xl:col-6">
                                <Button
                                    label="Cambiar Clave"
                                    icon="pi pi-refresh"
                                    onClick={(ev) => {
                                        setWantToChangePin(true);
                                        setPassword("");
                                    }}
                                    className="p-button-primary"
                                    style={{ width: "100%", height: "100%", fontSize: "15px" }}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="col-12 lg:col-6 xl:col-6">
                            <Button label="Guardar" icon="pi pi-save" disabled={password.length < 4} className="p-button-success" onClick={() => updateUserposPin()} style={{ width: "100%", height: "100%", fontSize: "18px" }} />
                        </div>
                    )}
                </div>
            </Dialog>
        </div>
    );
});
