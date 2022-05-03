import React, { useEffect, useState, useContext, useRef } from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import UserProductionControlDataService from "../../service/UserProductionControlDataService";
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
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    /*
    Prime
    */
    const toast = useRef(null);

    /*
    Context  
    */
    const history = useHistory();

    /*
    Init
    */
    useEffect(() => {
        loadUserFromProps();
    }, []);

    const loadUserFromProps = () => {
        setUsername(props.username ? props.username : null);
    };

    const handleLogin = async () => {
        if (validateLoginData()) {
            let obj0 = {
                username: username.trim(),
                password: password.trim(),
            };
            await UserProductionControlDataService.login(obj0, () => toast.current.show({ severity: "warn", summary: "", detail: "Error del servicio", life: 3000 })).then((response) => {
                console.log("LoginUserCP", response);
                if (response && !response.data.logged) {
                    // this.showError(response.data.message);
                    toast.current.show({ severity: "warn", summary: "", detail: response.data.message, life: 3000 });
                } else if (response && response.data.logged) {
                    //this.props.PosStore.setHistory(this.props.history);
                    toast.current.show({ severity: "success", summary: "Bienvenido!", detail: "Ha ingresado a " + response.data.store.name, life: 3000 });
                    props.setSelPrincipalUser(response.data);
                    setDialogVisible(false);
                }
            });
        }
    };

    const validateLoginData = () => {
        //console.log("user", user);
        //console.log("password", password);
        if (!username || !password) {
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
                        <InputFloatLabel value={username} width="4" autoFocus icon="pi pi-user" label="Usuario" log={""} onChange={(e) => setUsername(e)} />
                        &nbsp;
                        <PasswordFloatLabel value={password ? password : ""} log={""} width="4" feedback={false} icon="pi pi-key" label="Contraseña" onChange={(e) => setPassword(e)} autoFocus={username} />
                    </div>
                </div>
            </div>
        </Dialog>
    );
});
