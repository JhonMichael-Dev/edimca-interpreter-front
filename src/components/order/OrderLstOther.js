import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import moment from "moment";
//import { computed } from "mobx";

// Prime components

import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { Slider } from "primereact/slider";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Badge } from "primereact/badge";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import OrderDataService from "../../service/OrderDataService";
import OperatorDataService from "../../service/OperatorDataService";
import { OperatorServiceIconComp } from "../operator/OperatorServiceIconComp";
import { MachinerySelectionLstComp } from "../machinery/MachinerySelectionLstComp";
import { OperatorAndAssistantsLstComp } from "../operator/OperatorAndAssistantsLstComp";
// Services
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { render } from "preact/compat";
import { useDataStore } from "../../data/DataStoreContext";
import { LoginPrincipalComp } from "../login/LoginPrincipalComp";
import { OrderStatusComp } from "./OrderStatusComp";
export const OrderLstOther = observer((props) => {
    /*
  Variables
  */
    const [selLstOtherOrders, setSelLstOtherOrders] = useState(null);
    const [onlyPendingOrders, setOnlyPendingOrders] = useState(true);
    const dt = useRef(null);
    const toast = useRef(null);
    const ca1 = useRef(null);
    const ca2 = useRef(null);
    const [lstOrders, setLstOrders] = useState([]);
    const [dialogServ, setDialogServ] = useState(false);
    const [dialogOther, setDialogOther] = useState(false);
    const [timedateIn, setTimedateIn] = useState(null);
    const [timedateFn, setTimedateFn] = useState(null);
    const [date9, setDate9] = useState(null);
    const [date10, setDate10] = useState(null);
    const [clienteNombre, setClienteNombre] = useState("");
    const [an8, setAn8] = useState("");
    const [indentificacion, setIndentificacion] = useState("");
    const [asesor, setAsesor] = useState("");
    const [numOrdern, setNumOrdern] = useState("");
    const [typeOrdern, setTypeOrdern] = useState("");
    const [serveicios, setServeicios] = useState("");

    const [service, setService] = useState([]);
    const [estadoAsig, setEstadoAsig] = useState(false);

    const [lstOperators, setLstOperators] = useState(null);
    const [selectOperators, setSelectOperators] = useState(null);

    const [lstOperatorsA, setLstOperatorsA] = useState(null);
    const [selectOperatorsA, setSelectOperatorsA] = useState(null);

    const [listnumOrdern] = useState([]);

    const [dialogServDetalle, setDialogServDetalle] = useState(false);
    const [dateDetalleHI, setDateDetalleHI] = useState(new Date("December 17, 1995 03:24:00"));
    const [dateDetalleHF, setDateDetalleHF] = useState(new Date("December 17, 1995 16:24:00"));
    const [dateDetalle, setDateDetalle] = useState(new Date());
    const [serAs, setSerAs] = useState(false);
    const [serAsC, setSerAsC] = useState(false);
    const [serAsR, setSerAsR] = useState(false);
    const [lstOrdersFilter, setLstOrdersFilter] = useState([]);
    const [selOrderDetail, setSelOrderDetail] = useState(null);
    const [selMachinery, setSelMachinery] = useState(null);
    const [vmaquina, setVmaquina] = useState("");
    const [vperariosA, setVperariosA] = useState("");
    const [flgAsig, setFlgAsig] = useState(false);
    const [numOrder, setNumOrder] = useState("");
    const [sliderValue, setSliderValue] = useState(0);
    const [dataOtherOrderSelection, setDataOtherOrderSelection] = useState(null);
    /*
    Store
    */
    const dataStore = useDataStore();

    /*
    Init
    */
    useEffect(() => {
        if (selLstOtherOrders) {
            loadAvailables();
            //console.log(new Date().getTime());
        }
    }, [selLstOtherOrders]);
    /*
  Formats
  */
    function formatDate(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2),
            hours = ("0" + date.getHours()).slice(-2),
            minutes = ("0" + date.getMinutes()).slice(-2),
            seconds = ("0" + date.getSeconds()).slice(-2);
        var mySQLDate = [date.getFullYear(), mnth, day].join("-");
        var mySQLTime = [hours, minutes, seconds].join(":");
        return [mySQLDate, mySQLTime].join(" ");
    }

    /*
  Methods
  */

    const onServiceChange = (e) => {
        let selectedService = [...service];
        if (e.checked) selectedService.push(e.value);
        else selectedService.splice(selectedService.indexOf(e.value), 1);
        setService(selectedService);
    };

    const loadAvailables = () => {
        dataStore.setLoading(true);
        let lstPendingStatus = ["PENDIENTE"];
        let mcu = { mcu: dataStore.authPrincipalUser.store.mcu };
        OrderDataService.queryPendingOrdersByStore(mcu).then((valid) => {
            if (valid.data && valid.data.success) {
                let lstFiltered = valid.data.obj.filter((orderX) => !onlyPendingOrders || lstPendingStatus.includes(orderX.status));
                console.log("lstFiltered.. ", lstFiltered);
                setLstOrders(lstFiltered);
                dataStore.setLoading(false);
            }
        });

        OperatorDataService.queryOperatorByStore(props.storeMcu).then((valid) => {
            console.log("props.storeMcu", props.storeMcu);
            if (valid.data && valid.data.success) {
                let lstStoreOperatorFiltered = valid.data.obj.filter((operatorObjX) => true || operatorObjX.store.mcu === props.storeMcu)[0];
                let lstAssistantsFiltered = lstStoreOperatorFiltered.operators.filter((assistantX) => assistantX.skills.includes(props.skill));
                let lstAssitantsSkillsDiferentsFiltered = lstStoreOperatorFiltered.operators.filter((assistantX) => !assistantX.skills.includes(props.skill));
                lstAssistantsFiltered.push.apply(lstAssistantsFiltered, lstAssitantsSkillsDiferentsFiltered);
                setLstOperators(lstAssistantsFiltered);
            }
        });

        OperatorDataService.queryOperatorByStore(props.storeMcu).then((valid) => {
            if (valid.data && valid.data.success) {
                let lstStoreOperatorFiltered = valid.data.obj.filter((operatorObjX) => true || operatorObjX.store.mcu === props.storeMcu)[0];
                let lstAssistantsFiltered = lstStoreOperatorFiltered.operators.filter((assistantX) => assistantX.skills.includes(props.skill));
                let lstAssitantsSkillsDiferentsFiltered = lstStoreOperatorFiltered.operators.filter((assistantX) => !assistantX.skills.includes(props.skill));
                lstAssistantsFiltered.push.apply(lstAssistantsFiltered, lstAssitantsSkillsDiferentsFiltered);
                setLstOperatorsA(lstAssistantsFiltered);
            }
        });
    };

    const tmpStatusOrder = (rowData) => {
        return (
            <React.Fragment>
                <div className="field">
                    <br></br>
                    {rowData.priority}
                </div>
            </React.Fragment>
        );
    };

    let statusComp = (rowData) => {
        return (
            <Button className={"p-button-rounded p-button-" + (rowData.status === "PENDIENTE" ? "secondary" : rowData.status === "EN_PROCESO" ? "warning" : "success")} style={{ fontWeight: "bold", fontSize: 9, justifyContent: "center" }}>
                {rowData.status}
            </Button>
        );
    };

    const tmpCliente = (rowData) => {
        return (
            <React.Fragment>
                <div className="field ">
                    <b>An8: </b>&nbsp; {rowData.client.jdeAn8}
                    <br></br>
                    <b>Nombre:</b>&nbsp; {rowData.client.firstName}
                    <br></br>
                    <b>Identificación:</b>&nbsp; {rowData.client.identification}
                </div>
            </React.Fragment>
        );
    };

    const tmpStatus = (rowData) => {
        if (estadoAsig == true && rowData.jdeOrderId == numOrdern) {
            return (
                <React.Fragment>
                    <div className="p-button-rounded p-button-info mr-2 ">
                        <Badge value="Asigando" severity="info" className="p-mr-2"></Badge>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="field"></div>
                </React.Fragment>
            );
        }
    };

    const accionesBtn = (rowData) => {
        return (
            <React.Fragment>
                <div className="grid">
                    <div className="col-12 lg:col-6 xl:col-6">
                        <Button label="Asignar" className="p-button-sm p-button-info mr-2" disabled={estadoAsig == true && rowData.jdeOrderId == numOrdern} onClick={() => showDlgServicioOtherOrder(rowData)} />
                    </div>
                    <div className="col-12 lg:col-6 xl:col-6">
                        <Button label="Detalle" className="p-button-sm p-button-warning mr-2" disabled={!estadoAsig == true} onClick={() => showDlgOrderDetalle()} />
                    </div>
                </div>
            </React.Fragment>
        );
    };

    const accionesBtnSaveOrder = (serveicios) => {
        return (
            <React.Fragment>
                <div className="field">
                    <div>
                        <Button label="Guardar" className="p-button-rounded p-button-info mr-2" onClick={() => updateOrderAsignation(serveicios)} />{" "}
                    </div>
                </div>
            </React.Fragment>
        );
    };

    const showDlgCrearAsigancionOtherOder = () => {
        if (service.length > 0) {
            setDialogOther(true);
            setEstadoAsig(true);
            setDialogServ(false);
            listnumOrdern.push(numOrdern);
        } else setDialogOther(false);
    };

    const hideDlgServicioOtherOrder = () => {
        console.log("timedateIn  ", moment(timedateIn).format("YYYY-MM-DD hh:mm:ss"));
        console.log("timedateFn  ", moment(timedateFn).format("YYYY-MM-DD hh:mm:ss"));
        setSliderValue(0);
        setEstadoAsig(false);
        setDialogOther(false);
        setTimedateIn(null);
        setTimedateFn(null);
        // setDialogServ(false);
        setSerAs(false);
        setSerAsC(false);
        setSerAsR(false);
        setService([]);
        setVmaquina("");
        setVperariosA("");
    };

    const hideDlgServicio = () => {
        setEstadoAsig(false);
        setDialogOther(false);
        setDialogServ(false);
        setSerAs(false);
        setSerAsC(false);
        setSerAsR(false);
        setService([]);
    };

    const updateOrderAsignation = async (serveicios) => {
        /*      console.log("dataOtherOrderSelection ", dataOtherOrderSelection);
        console.log("dataStore.otherOrderOperation ", dataStore.otherOrderOperation);
        console.log("dataStore.otherOrderMachinery ", dataStore.otherOrderMachinery);
        console.log("props.username", dataStore.otherOrderOperation.username);
        console.log("timedateIn  ", moment(timedateIn).format("YYYY-MM-DD hh:mm:ss"));
        console.log("timedateFn  ", moment(timedateFn).format("YYYY-MM-DD hh:mm:ss")); */

        let _operatorDataService = null;
        dataOtherOrderSelection.quantityShipped = sliderValue;

        let _payload = { username: dataStore.otherOrderOperation.username };
        await OperatorDataService.queryUserposDtoByUsername(_payload).then((valid) => {
            if (valid.data && valid.data.success) {
                console.log("queryUserposDtoByUsername", valid.data.obj);
                _operatorDataService = valid.data.obj;
            }
        });

        let workingOrderPost = {
            idWorkingOrder: dataOtherOrderSelection.idWorkingOrder,
            idMachine: dataStore.otherOrderMachinery.idMachine,
            operatorUsername: dataStore.otherOrderOperation.username,
            assistants: dataStore.otherOrderOperation.assistants,
            workingOrderDto: {
                idWorkingOrder: dataOtherOrderSelection.idWorkingOrder,
                jdeServiceType: dataOtherOrderSelection.jdeServiceType,
                jdeProductCode: dataOtherOrderSelection.jdeProductCode,
                numberOfServicesInProcess: null,
                stopReason: "",
                operator: _operatorDataService,
                status: "EN_PROCESO",
                quantityRequested: dataOtherOrderSelection.quantityRequested,
                quantityShipped: dataOtherOrderSelection.quantityShipped,
            },
            quantityRequested: dataOtherOrderSelection.quantityRequested,
            quantityShipped: dataOtherOrderSelection.quantityShipped,
        };
        console.log("startAndFinishWorkingOrder ", JSON.stringify(workingOrderPost));
        await OrderDataService.startAndFinishWorkingOrder(workingOrderPost).then((valid) => {
            if (valid.data && valid.data.success) {
                console.log("startAndFinishWorkingOrder ", JSON.stringify(valid.data));
                setFlgAsig(false);
                localStorage.setItem("GOrden", true);
                localStorage.setItem("Serveicios", serveicios);
                setTimedateIn(null);
                setTimedateFn(null);
                setDialogOther(false);
                setSerAs(false);
                setService([]);
            }
        });
    };

    const showDlgOtherOder = (dataOrder) => {
        console.log("showDlgOtherOder.. ", dataOrder);
        setFlgAsig(false);
        setServeicios(dataOrder.productDto.serviceType.code.toUpperCase());
        setDataOtherOrderSelection(dataOrder);
        setDialogOther(true);
    };

    const showDlgServicioOtherOrder = (rowData) => {
        localStorage.removeItem("setOperatios");
        localStorage.removeItem("selMachinery");
        setEstadoAsig(true);
        setClienteNombre(rowData.client.firstName);
        setAn8(rowData.client.jdeAn8);
        setIndentificacion(rowData.client.identification);
        setAsesor(rowData.userposUsername);
        setNumOrdern(rowData.jdeOrderId);
        setTypeOrdern(rowData.jdeOrderTypeCode);
        //setDialogOther(true);
        lstOrders.filter((objSer) => {
            if (objSer.jdeOrderId === rowData.jdeOrderId) {
                console.log("...objSer", objSer);
                setLstOrdersFilter(objSer.lstWorkingOrder);
                setNumOrder(rowData.jdeOrderId);
            }
        });
        setDialogServ(true);
    };

    const handleProcessSelectMachinery = (ev) => {
        setSelMachinery(ev);
    };

    const dialogoOrder = () => {
        return (
            <React.Fragment>
                <h5>Asignar Orden Manual</h5>
                <hr></hr>
            </React.Fragment>
        );
    };

    let dataClient = (serveicios) => {
        return (
            <React.Fragment>
                <h6>
                    <div className="grid">
                        <div className="col-6 lg:col-6 xl:col-6">
                            <div className="p-d-flex p-ai-center p-flex-wrap">
                                <b>An8: </b>&nbsp; {an8}
                                <br></br>
                                <b>Nombre:</b>&nbsp; {clienteNombre}
                                <br></br>
                                <b>Identificación:</b>&nbsp; {indentificacion}
                                <br></br>
                                <b>Asesor:</b>&nbsp; {asesor}
                                <br></br>
                                <br></br>
                                {/*console.log("serveicios", serveicios)*/}
                                <Button
                                    label="Asignar Maquinas y Operarios"
                                    className="p-button p-button-info mr-2"
                                    style={{ fontSize: 13, justifyContent: "letf", marginRight: "60px" }}
                                    onClick={() => {
                                        //  machinerySelectionLstComp(serveicios);
                                        setSelOrderDetail(serveicios);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-6 lg:col-6 xl:col-6">
                            <div className="p-d-flex p-ai-center p-flex-wrap">
                                <br></br>
                                <b>Numero Orden:</b>&nbsp; {numOrdern}
                                <br></br>
                                <b>Tipo Orden:</b>&nbsp; {typeOrdern}
                                <br></br>
                                <b>Servicio:</b>&nbsp; {serveicios}
                                <br></br>
                                <b>Servicio asignado:</b>&nbsp; {flgAsig}
                            </div>
                        </div>
                    </div>
                </h6>
                <hr></hr>
            </React.Fragment>
        );
    };

    const dialogoOrderDetalle = () => {
        return (
            <React.Fragment>
                <h5>Asignar Orden Manual</h5>
                <h6>
                    <div className="grid">
                        <div className="col-6 lg:col-6 xl:col-6">
                            <div className="p-d-flex p-ai-center p-flex-wrap">
                                <b>An8: </b>&nbsp; {an8}
                                <br></br>
                                <b>Nombre:</b>&nbsp; {clienteNombre}
                                <br></br>
                                <b>Identificación:</b>&nbsp; {indentificacion}
                                <br></br>
                                <b>Asesor:</b>&nbsp; {asesor}
                            </div>
                        </div>
                        <div className="col-6 lg:col-6 xl:col-6">
                            <div className="p-d-flex p-ai-center p-flex-wrap">
                                <br></br>
                                <b>Numero Orden:</b>&nbsp; {numOrdern}
                                <br></br>
                                <b>Tipo Orden:</b>&nbsp; {typeOrdern}
                                <br></br>
                                <b>Servicio:</b>&nbsp; {serveicios}
                                <br></br>
                                <b>Servicio asignado:</b>&nbsp; {"SI"}
                                <br></br>
                            </div>
                        </div>
                    </div>
                </h6>
                <hr></hr>
            </React.Fragment>
        );
    };

    const showDlgOrderDetalle = () => {
        setDialogServDetalle(true);
    };

    const HiddenDlgOrderDetalle = () => {
        setDialogServDetalle(false);
    };

    const handleSelectUser = (ev) => {
        dataStore.setAuthPrincipalUser(ev);
        setSelLstOtherOrders(ev);
    };

    const onChangeSliderComp = (value) => {
        setSliderValue(value);
        //props.sliderValue(sliderValue);
    };

    // const setLoader = async (ev) => {
    //     if (!ev) await timeout(400);
    //     dataStore.setLoading(ev);
    // };

    // function timeout(delay) {
    //     return new Promise((res) => setTimeout(res, delay));
    // }

    /*
    Inner Components
    */
    let tblLisOrderVL = (
        <DataTable
            value={lstOrders}
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
                header="Prioridad"
                body={tmpStatusOrder}
                style={{
                    textAlign: "center",
                    width: "9%",
                    fontSize: "10px",
                }}
            ></Column>

            <Column
                header="Estado Orden"
                body={statusComp}
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "10px",
                }}
            ></Column>
            <Column
                header="Tipo"
                field="jdeOrderTypeCode"
                style={{
                    textAlign: "center",
                    width: "5%",
                    fontSize: "10px",
                }}
            ></Column>
            <Column
                header="Nùmero"
                field="jdeOrderId"
                style={{
                    textAlign: "left",
                    width: "6%",
                    fontSize: "10px",
                }}
            ></Column>
            <Column
                header="Cliente"
                body={tmpCliente}
                style={{
                    textAlign: "left",
                    width: "15%",
                    fontSize: "10px",
                }}
            ></Column>

            <Column
                header="Acciones"
                body={accionesBtn}
                style={{
                    textAlign: "center",
                    width: "20%",
                    fontSize: "12px",
                }}
            ></Column>
        </DataTable>
    );

    let serviceTypeIconComp = (dataOrder) => {
        let data = dataOrder.productDto.serviceType.code;
        //console.log("...tet dataOrder: ", dataOrder.status !== "COMPLETADO");
        return (
            <div key={data}>
                <div className="card" style={{ width: "100%", textAlign: "center", wordWrap: "break-word" }} title={data.toUpperCase()}>
                    <i className="p-overlay-badge">
                        <img src={"/assets/images/serviceType_" + data.toUpperCase() + ".png"} className="pos-edimca-button-noLabel" style={{ width: "30px", height: "30px" }}></img>
                    </i>
                    <div style={{ fontSize: 10 }}> {data.toUpperCase()}</div>
                    {data && dataOrder.status !== "COMPLETADO" ? (
                        <Button icon="pi pi-check" className="p-button-rounded p-button-text" style={{ width: "30px", height: "30px", fontSize: 7, textAlign: "left" }} onClick={() => showDlgOtherOder(dataOrder)} />
                    ) : (
                        <Button icon="pi pi-check" disabled className="p-button-rounded p-button-danger" style={{ width: "30px", height: "30px", fontSize: 7, textAlign: "left" }} onClick={() => showDlgOtherOder(dataOrder)} />
                    )}
                </div>
            </div>
        );
    };

    let machinerySelectionLstComp = selOrderDetail ? (
        <MachinerySelectionLstComp
            showAsDialog
            handleProcess={(ev) => handleProcessSelectMachinery(ev)}
            storeMcu={null}
            serviceType={selOrderDetail}
            onHide={(ev) => {
                setSelMachinery(null);
                setSelOrderDetail(null);
            }}
        />
    ) : (
        ""
    );
    const handleProcess = (ev) => {
        setSelOrderDetail(null);
        showMessage({ message: "Servicio en proceso para el usuario " + ev, severity: "info" });
        props.handleProcess();
    };

    const showMessage = (ev) => {
        toast.current.show({
            severity: ev.severity,
            summary: ev.summary,
            detail: ev.message,
            life: (ev.message.length / 10) * 1500,
        });
    };

    let operadorOperation = () => {
        //console.log("dataStore.otherOrderOperation: " + dataStore.otherOrderOperation);
        setVperariosA(dataStore.otherOrderOperation.username + "-" + dataStore.otherOrderAssistants);
        //console.log("dataStore.otherOrderMachinery: " + dataStore.otherOrderMachinery);
        setVmaquina(dataStore.otherOrderMachinery.description);
    };

    let operatorAndAssistantsLstComp = selMachinery ? (
        <OperatorAndAssistantsLstComp
            handleProcess={() => handleProcess()}
            storeMcu={null}
            skill={selOrderDetail ? selOrderDetail : null}
            serviceType={selOrderDetail}
            onHide={(ev) => {
                setSelMachinery(null);
                setSelOrderDetail(null);
            }}
            operadorOperation={() => operadorOperation()}
            flag={true}
        />
    ) : (
        ""
    );

    let loginPrincipalComp = !dataStore.authPrincipalUser || !selLstOtherOrders ? <LoginPrincipalComp setSelPrincipalUser={(ev) => handleSelectUser(ev)} username={dataStore.authPrincipalUser ? dataStore.authPrincipalUser.username : null} /> : "";

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
                            <b> Otras Ordenes </b>
                        </h5>{" "}
                        <br></br>
                        <div className="col-12 xl:col-12">{tblLisOrderVL}</div>
                    </div>
                </div>
            </div>
            <Dialog visible={dialogServ} style={{ width: "auto" }} header="Servicio de la orden" modal className="p-fluid" onHide={hideDlgServicio}>
                <div className="grid">{lstOrdersFilter.map((orderX) => serviceTypeIconComp(orderX))}</div>
            </Dialog>
            <Dialog visible={dialogOther} style={{ width: "60%" }} header={dialogoOrder(serveicios)} modal className="p-fluid" onHide={hideDlgServicioOtherOrder} footer={accionesBtnSaveOrder(serveicios)}>
                {dataClient(serveicios)}
                <di>
                    <div className="field">
                        <div className="grid">
                            <div className="col-6 lg:col-6 xl:col-6">
                                <div className="p-d-flex p-ai-center p-flex-wrap">
                                    <b>Maquina Asignada:</b>&nbsp;
                                    <InputText value={vmaquina} only />
                                </div>
                            </div>
                            <div className="col-6 lg:col-6 xl:col-6">
                                <div className="p-d-flex p-ai-center p-flex-wrap">
                                    <b>Operario-Ayudante:</b>&nbsp;
                                    <InputText value={vperariosA} only />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field"></div>
                    <hr></hr>
                    <b>Asignaciòn Tiempo:</b>&nbsp;
                    <br></br>
                    <br></br>
                    <div className="field">
                        <b>Fecha/Hora Inicio:</b>&nbsp; <Calendar id="basic1" value={timedateIn} onChange={(e) => setTimedateIn(e.value)} showTime dateFormat="dd/mm/yy" />
                    </div>
                    <br></br>
                    <div className="field">
                        <b>Fecha/Hora Fin:</b>&nbsp; <Calendar id="basic2" value={timedateFn} onChange={(e) => setTimedateFn(e.value)} showTime dateFormat="dd/mm/yy" />
                    </div>
                    <hr></hr>
                    <div className="grid" style={{ marginBottom: "3%", marginTop: "1%" }}>
                        <div className="col-6 col-offset-1">
                            <b>Avance del servicio: {dataOtherOrderSelection == null ? sliderValue : sliderValue + " [" + dataOtherOrderSelection.productDto.unitOfMeasure.code + "]"}</b>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="col-3" style={{ textAlign: "right" }}>
                            {0}
                        </div>
                        <div className="col-6">
                            <Tooltip target=".slider>.p-slider-handle" content={`${sliderValue} ${dataOtherOrderSelection != null ? dataOtherOrderSelection.productDto.unitOfMeasure.code : ""}`} position="top" event="focus" />
                            <Slider
                                className="slider"
                                min={0.0}
                                max={dataOtherOrderSelection != null ? dataOtherOrderSelection.quantityRequested : 0}
                                step={0.1}
                                value={sliderValue}
                                onChange={(e) => onChangeSliderComp(e.value < dataOtherOrderSelection.quantityShipped ? sliderValue : e.value)}
                                style={{ width: "100%", height: "10px", marginTop: "1%" }}
                            />
                        </div>
                        <div className="col-3">
                            <div className="col-3">{`${dataOtherOrderSelection != null ? dataOtherOrderSelection.quantityRequested : ""} ${dataOtherOrderSelection != null ? dataOtherOrderSelection.productDto.unitOfMeasure.description1 : ""}`}</div>
                        </div>
                    </div>
                </di>
            </Dialog>
            <Dialog visible={dialogServDetalle} style={{ width: "50%" }} header={dialogoOrderDetalle()} modal className="p-fluid" onHide={HiddenDlgOrderDetalle}>
                <b>Asignaciòn Tiempo:</b>&nbsp;
                <br></br>
                <br></br>
                <div className="p-field p-col-6 p-md-2">
                    <Calendar id="time12" placeholder="Hora Inicio" value={dateDetalleHI} onChange={(e) => setDateDetalleHI(e.value)} timeOnly hourFormat="12" styles={{ width: "20%" }} />
                </div>
                <br></br>
                <div className="p-field p-col-6 p-md-2">
                    <Calendar id="time13" placeholder="Hora Fin" value={dateDetalleHF} onChange={(e) => setDateDetalleHF(e.value)} timeOnly hourFormat="12" styles={{ width: "20%" }} />
                </div>
                <br></br>
                <div className="field">
                    <b>Fecha:</b>&nbsp; <Calendar id="basic" value={dateDetalle} onChange={(e) => setDateDetalle(console.log(e.value))} touchUI />
                </div>
                <br></br>
                <div className="field">
                    <b>Operador Principal:</b>&nbsp; <Dropdown value={selectOperators} options={lstOperators} onChange={(e) => setSelectOperators(e.value)} optionLabel="username" placeholder="GPACJACAMA" />
                </div>
                <br></br>
                <div className="field">
                    <b>Operador Ayudante:</b>&nbsp; <Dropdown value={selectOperatorsA} options={lstOperatorsA} onChange={(e) => setSelectOperatorsA(e.value)} optionLabel="username" placeholder="TFUENTES" />
                </div>
                <hr></hr>
            </Dialog>
            {machinerySelectionLstComp}
            {operatorAndAssistantsLstComp}
        </>
    );
});
