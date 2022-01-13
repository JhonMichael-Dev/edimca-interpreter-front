import React, { useEffect, useState, useContext, useRef } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

/*
Own Components
*/
import { InputFloatLabel } from "../base/InputFloatLabel";
import { PasswordFloatLabel } from "../base/PasswordFloatLabel";

export const LoginPrincipalComp = observer((props) => {
    /*
    Variables
    */
    const [dialogVisible, setDialogVisible] = useState(true);
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    /*
    Prime
    */
    const toast = useRef(null);

    /*
    Context  
    */
    const history = useHistory();

    const handleLogin = () => {
        if (validateLoginData()) {
            let payload = {
                userpos: { user, password },
                store: {
                    mcu: "2CM00101",
                    name: "BODEGA FISICA MATRIZ QUITO",
                    jdeCode: "124",
                    address1: "AV. DE LOS GRANADOS E12-70               di2",
                    businessUnit: {
                        code: "BD",
                        description1: "Bodega",
                    },
                },
            };
            toast.current.show({ severity: "success", summary: "Bienvenido!", detail: "Ha ingresado a " + payload.store.name, life: 3000 });
            props.setSelPrincipalUser(payload);
            setDialogVisible(false);
        }
    };

    const validateLoginData = () => {
        //console.log("user", user);
        //console.log("password", password);
        if (!user || !password) {
            toast.current.show({ severity: "warn", summary: "", detail: "Debe ingresar un usuario y contraseña", life: 3000 });
            return false;
        } else {
            return true;
        }
    };

    const dialogFooter = <Button label="Login" icon="pi pi-user" onClick={() => handleLogin()} />;

    /**
     * Return
     */
    return (
        <Dialog header="Sistema de Control de la Producción" visible={dialogVisible} footer={dialogFooter} onHide={() => setDialogVisible(false)} closable={false} draggable={false} modal>
            <Toast ref={toast} />
            <div className="p-grid p-fluid" style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <img src={"assets/images/loader4.gif"} alt="logo" style={{ width: "190px", height: "150px" }} />

                <div className="p-col-12 p-lg-12">
                    <div className="p-grid" style={{ padding: 40 }}>
                        <InputFloatLabel value={user} width="4" autoFocus icon="pi pi-user" label="Usuario" log={""} onChange={(e) => setUser(e)} />
                        &nbsp;
                        <PasswordFloatLabel value={password ? password : ""} log={""} width="4" feedback={false} icon="pi pi-key" label="Contraseña" onChange={(e) => setPassword(e)} />
                    </div>
                </div>
            </div>
        </Dialog>
    );
});
