import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";
// Prime components
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ToggleButton } from "primereact/togglebutton";
import { Checkbox } from "primereact/checkbox";
import { SelectButton } from "primereact/selectbutton";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { addLocale } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import OrderDataService from "../../service/OrderDataService";
import { InputMask } from "primereact/inputmask";
// Services
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useDataStore } from "../../data/DataStoreContext";
import { LoginPrincipalComp } from "../login/LoginPrincipalComp";
export const OrderLstVLComp = observer((props) => {
    /*
  Variables
  */
    const [selLstOrdersVL, setSelLstOrdersV] = useState(null);
    const dt = useRef(null);
    const [lstOrders, setLstOrders] = useState([]);
    const [dialogVL, setDialogVL] = useState(false);
    const [date1, setDate1] = useState(null);
    const [val1, setVal1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [service, setService] = useState([]);
    const toast = useRef(null);
    /*
    Store
    */
    const dataStore = useDataStore();

    /*
    Init
    */
    useEffect(() => {
        if (selLstOrdersVL) {
            loadAvailables();
        }
    }, [selLstOrdersVL]);
    /*
  Formats
  */

    /*
  Methods
  */
    const loadAvailables = () => {
        OrderDataService.queryIncomingOrdersByStoreVL(props.storeMcu).then((valid) => {
            if (valid.data && valid.data.success) {
                let lstOrderVL = valid.data.obj.filter((OrObjX) => true || OrObjX.store.mcu === props.storeMcu)[0];
                //console.log("lstOrderVL", lstOrderVL);
                setLstOrders(valid.data.obj);
            }
        });
    };

    const tmpCliente = (rowData) => {
        return (
            <React.Fragment>
                <div className="field">
                    <b>Categoria: </b>&nbsp; {rowData.numeroDoc}
                </div>
                <div className="field">
                    <b>Ident:</b>&nbsp; {rowData.client.identification}
                </div>
                <div className="field">
                    <b>Nombre:</b>&nbsp; {rowData.client.firstName}
                </div>
                <div className="field">
                    <b>Servicion:</b>&nbsp; {rowData.service}
                </div>
            </React.Fragment>
        );
    };

    const showDLGVL = () => {
        setDialogVL(true);
    };

    const hideDLGVL = () => {
        setDialogVL(false);
        setVal1("");
        setDate1("");
        setService([]);
    };

    const onServiceChange = (e) => {
        let selectedService = [...service];
        if (e.checked) selectedService.push(e.value);
        else selectedService.splice(selectedService.indexOf(e.value), 1);
        setService(selectedService);
    };

    const statusProducciom = (rowData) => {
        return (
            <React.Fragment>
                <div className="p-button-rounded p-button-info mr-2 ">
                    <Badge value={rowData.status} severity="info" className="p-mr-2"></Badge>
                </div>
            </React.Fragment>
        );
    };

    const handleSelectUser = (ev) => {
        dataStore.setAuthPrincipalUser(ev);
        setSelLstOrdersV(ev);
    };

    const setLoader = async (ev) => {
        if (!ev) await timeout(400);
        dataStore.setLoading(ev);
    };

    function timeout(delay) {
        return new Promise((res) => setTimeout(res, delay));
    }
    const showMessage = (ev) => {
        toast.current.show({
            severity: ev.severity,
            summary: ev.summary,
            detail: ev.message,
            life: (ev.message.length / 10) * 1000,
        });
    };

    /*
Inner Components
*/
    let tblLisOrderVL = (
        <DataTable
            value={lstOrders}
            /*
        selectionMode="single"
        selection={selOrderDetail}
        onSelectionChange={(e) => setSelOrderDetail(e.value)}
        onRowSelect={onRowSelect}
        onRowUnselect={onRowUnselect}
        */
            dataKey="code"
            ref={dt}
            responsiveLayout="stack"
            scrollable
            scrollHeight="380px"
            style={{ width: "auto" }}
            virtualScrollerOptions={{ itemSize: 46 }}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last}, de {totalRecords}"
        >
            <Column
                header="Secuencia"
                field="jdeOrderId"
                style={{
                    textAlign: "center",
                    width: "9%",
                    fontSize: "12px",
                }}
                // sortable={true}
            ></Column>
            <Column
                header="Tipo"
                field="jdeOrderType.code"
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "12px",
                }}
            ></Column>
            <Column
                header="Estado"
                body={statusProducciom}
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "12px",
                }}
            ></Column>
            <Column
                header="Detalle"
                field="client"
                body={tmpCliente}
                style={{
                    textAlign: "left",
                    width: "10%",
                    fontSize: "10px",
                }}
            ></Column>
            <Column
                header="Fecha"
                field="fecha"
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "12px",
                }}
            ></Column>
        </DataTable>
    );

    let loginPrincipalComp = !dataStore.authPrincipalUser || !selLstOrdersVL ? <LoginPrincipalComp setSelPrincipalUser={(ev) => handleSelectUser(ev)} username={dataStore.authPrincipalUser ? dataStore.authPrincipalUser.username : null} /> : "";

    /*
  Return
  */
    return (
        <>
            <Toast ref={toast} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
            {loginPrincipalComp}
            <div className="p-fluid p-grid">
                <div className="col-12 xl:col-12">
                    <div className="card">
                        <h5>
                            <b>Lista de VLS</b>
                        </h5>{" "}
                        <div className="field">
                            {" "}
                            <Button label="Agregar VL" className="p-button-rounded p-button-info mr-2" style={{ width: "20%" }} onClick={() => showDLGVL()} />
                        </div>
                        <br></br>
                        <div className="col-12 xl:col-12">{tblLisOrderVL}</div>
                    </div>
                </div>
            </div>
            <Dialog visible={dialogVL} style={{ width: "500px" }} header="Crear VL" modal className="p-fluid" onHide={hideDLGVL}>
                <div className="field">
                    <b>Numero Documento:</b>&nbsp; <InputMask focus id="basic" mask="999-999-999999999" value={val1} placeholder="000-000-000000000" onChange={(e) => setVal1(e.value)}></InputMask>
                </div>
                {/*
                    <div className="field">
                    <b>Nombre Cliente:</b>&nbsp; <InputText value={value2} onChange={(e) => setValue2(e.target.value)} />
                    </div>
                    <div className="field">
                    <b>Indentificaciòn Cliente: </b>&nbsp; <InputText value={value3} onChange={(e) => setValue3(e.target.value)} />
                    </div>*/}

                <div className="field">
                    Fecha: <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} touchUI />
                </div>

                <hr></hr>
                <div className="grid">
                    <div className="col-6 lg:col-6 xl:col-6">
                        <Checkbox inputId="service1" name="service" value="Corte" onChange={onServiceChange} checked={service.indexOf("Corte") !== -1} />
                        &nbsp; <label htmlFor="service1">Corte</label>
                    </div>
                    <div className="col-6 lg:col-6 xl:col-6">
                        <Checkbox inputId="service2" name="service" value="Ruteado" onChange={onServiceChange} checked={service.indexOf("Ruteado") !== -1} />
                        &nbsp; <label htmlFor="service2">Ruteado</label>
                    </div>

                    <div className="col-6 lg:col-6 xl:col-6">
                        <Checkbox inputId="service3" name="service" value="Enchapado" onChange={onServiceChange} checked={service.indexOf("Enchapado") !== -1} />
                        &nbsp; <label htmlFor="service3">Enchapado</label>
                    </div>
                    <div className="col-6 lg:col-6 xl:col-6">
                        <Checkbox inputId="service3" name="service" value="Perforado" onChange={onServiceChange} checked={service.indexOf("Perforado") !== -1} />
                        &nbsp; <label htmlFor="service3">Perforado</label>
                    </div>
                </div>

                <div className="field">
                    <Button label="Generar VL" className="p-button-rounded p-button-info mr-2" onClick={() => hideDLGVL()} />
                </div>
            </Dialog>
        </>
    );
});
