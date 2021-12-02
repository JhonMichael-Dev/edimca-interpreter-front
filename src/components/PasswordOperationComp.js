import React, { useEffect, useState, useRef } from "react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
export const PasswordOperationComp = (data) => {
    /*
  Variables
  */
    console.log("............ ");
    const toast = useRef(null);
    const [lstStoreData, setLstStoreData] = useState([]);
    const [dlgPassword, selDlgPassword] = useState(true);
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
        //selDlgPassword(data.data);
        //console.log(dlgPassword);
        //loadAvailables();
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
    const showMessage = (ev) => {
        toast.current.show({
            severity: ev.severity,
            summary: ev.summary,
            detail: ev.message,
            life: (ev.message.length / 10) * 1000,
        });
    };

    const onClickBtn = (e) => {
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

    const login = () => {
        if (password.length > 0) {
            if (password.length === 4) {
                localStorage.setItem("passwordLocal", password);
                showMessage({ message: "Clave ingresada correctamente", severity: "success" });
                selDlgPassword(false);
            } else {
                showMessage({ message: "La clave debe de contener 4 digitos", severity: "error" });
                password = "";
            }
        } else {
            showMessage({ message: "Por favor ingresa tu clave de operador", severity: "warn" });
        }
    };

    /*
  Inner Components
  */

    const onHide = () => {
        selDlgPassword(false);
    };

    /*
  Return
  */
    return (
        <div>
            <Toast ref={toast} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
            <Dialog header="Clave" visible={dlgPassword} modal={true} style={{ width: "40vw" }} draggable={false}>
                <div className="grid">
                    {" "}
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="1" id="btn1" value="1" onClick={(e) => onClickBtn(e)} className="p-button-info" style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="2" id="btn2" value="2" onClick={(e) => onClickBtn(e)} className="p-button-info" style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="3" id="btn3" value="3" className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="4" id="btn4" value="4" className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="5" id="btn5" value="5" className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="6" id="btn6" value="6" className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="7" id="btn7" value="7" className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="8" id="btn8" value="8" className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="9" id="btn9" value="9" className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4"></div>
                    <div className="col-12 lg:col-6 xl:col-4">
                        <Button label="0" id="btn0" value="0" className="p-button-info" onClick={(e) => onClickBtn(e)} style={{ width: "100%", height: "100%", fontSize: "40px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-4"></div>
                    <div className="col-12 lg:col-6 xl:col-6">
                        <Button label="Aceptar" className="p-button-success" onClick={() => login()} style={{ width: "100%", height: "100%", fontSize: "18px" }} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-6">
                        <Button label="Cambiar Clave" className="p-button-primary" style={{ width: "100%", height: "100%", fontSize: "15px" }} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
