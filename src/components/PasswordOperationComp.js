import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export const PasswordOperationComp = observer((props) => {
    /*
  Variables
  */

    const toast = useRef(null);
    const [lstStoreData, setLstStoreData] = useState([]);
    //const [dlgPassword, selDlgPassword] = useState(true);
    const [password, setPassword] = useState("");
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
    useEffect(() => {}, []);
    /*
  Context  
  */

    /*
  Formats
  */

    /*
  Methods
  */
    const showMessage = (ev) => {
        toast.current.show({
            severity: ev.severity,
            summary: ev.summary,
            detail: ev.message,
            life: (ev.message.length / 10) * 1000,
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
                //showMessage({ message: "Clave ingresada correctamente", severity: "success" });
                //selDlgPassword(false);
                props.handleLogin();
            } else {
                showMessage({ message: "La clave debe de contener 4 digitos", severity: "error" });
                setPassword("");
            }
        } else {
            showMessage({ message: "Por favor ingresa tu clave de operador", severity: "warn" });
        }
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
            <Toast ref={toast} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
            <Dialog header="Clave" visible={true} modal={true} style={{ width: "40vw" }} draggable={false} onHide={() => onHide()}>
                <div className="grid">
                    {" "}
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
                    <div className="col-12 lg:col-6 xl:col-6">
                        <Button label={props.aceptLabel ? props.aceptLabel : "Aceptar"} icon={props.icon} disabled={password.length < 4} className="p-button-success" onClick={() => login()} style={{ width: "100%", height: "100%", fontSize: "18px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-6">
                        <Button label="Cambiar Clave" className="p-button-primary" style={{ width: "100%", height: "100%", fontSize: "15px" }} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
});
