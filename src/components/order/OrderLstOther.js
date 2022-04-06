import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";
// Prime components

import { Checkbox } from "primereact/checkbox";

import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Badge } from "primereact/badge";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
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
export const OrderLstOther = observer((props) => {
    /*
  Variables
  */
    const [onlyPendingOrders, setOnlyPendingOrders] = useState(true);
    const dt = useRef(null);
    const toast = useRef(null);
    const [lstOrders, setLstOrders] = useState([]);
    const [dialogServ, setDialogServ] = useState(false);
    const [dialogOther, setDialogOther] = useState(false);
    const [date1, setDate1] = useState(null);
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

    /*
    Init
    */
    useEffect(() => {
        loadAvailables();
        //console.log(new Date().getTime());
    }, []);
    /*
  Formats
  */

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
        let lstPendingStatus = ["PENDIENTE", "EN_PROCESO"];
        OrderDataService.queryOrdersByStore(props.selStore).then((valid) => {
            if (valid.data && valid.data.success) {
                let lstFiltered = valid.data.obj.filter((orderX) => !onlyPendingOrders || lstPendingStatus.includes(orderX.status));
                //console.log(lstFiltered);
                setLstOrders(lstFiltered);
            }
        });

        OperatorDataService.queryOperatorByStore(props.storeMcu).then((valid) => {
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

    const tmpCliente = (rowData) => {
        return (
            <React.Fragment>
                <div className="field">
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
        setEstadoAsig(false);
        setDialogOther(false);
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

    const updateOrderAsignation = (serveicios) => {
        setFlgAsig(false);
        localStorage.setItem("GOrden", true);
        localStorage.setItem("Serveicios", serveicios);

        setDialogOther(false);
        setSerAs(false);
        setService([]);
    };

    const showDlgOtherOder = (data) => {
        //console.log(localStorage.getItem("GOrden"));
        setFlgAsig(false);
        setServeicios(data.toUpperCase());
        setDialogOther(true);
        //console.log(localStorage.getItem("Serveicios"));
    };

    const showDlgServicioOtherOrder = (rowData) => {
        localStorage.removeItem("setOperatios");
        localStorage.removeItem("selMachinery");
        setEstadoAsig(true);
        setClienteNombre(rowData.client.firstName);
        setAn8(rowData.client.jdeAn8);
        setIndentificacion(rowData.client.identification);
        setAsesor(rowData.asesor);
        setNumOrdern(rowData.jdeOrderId);
        setTypeOrdern(rowData.jdeOrderTypeCode);
        //setDialogOther(true);
        lstOrders.filter((objSer) => {
            if (objSer.jdeOrderId === rowData.jdeOrderId) {
                setLstOrdersFilter(objSer.lstWorkingOrder);
                setNumOrder(rowData.jdeOrderId);
            }
        });
        setDialogServ(true);
    };

    const handleProcessSelectMachinery = (ev) => {
        setSelMachinery(ev);
    };

    const dialogoOrder = (serveicios) => {
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
                                <br></br>
                                <Button
                                    label="Asignar Maquinas y Operarios"
                                    className="p-button-rounded p-button-info mr-2"
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
                                <br></br>
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
                header="Priodidad"
                field="priority"
                style={{
                    textAlign: "center",
                    width: "9%",
                    fontSize: "10px",
                }}
            ></Column>
            <Column
                header="Tipo"
                field="jdeOrderType.code"
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
                header="Estado"
                body={tmpStatus}
                style={{
                    textAlign: "center",
                    width: "10%",
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

    let serviceTypeIconComp = (data) => {
        return (
            <div key={data}>
                <div className="card" style={{ width: "100%", textAlign: "center", wordWrap: "break-word" }} title={data.toUpperCase()}>
                    <i className="p-overlay-badge">
                        <img src={"/assets/images/serviceType_" + data.toUpperCase() + ".png"} className="pos-edimca-button-noLabel" style={{ width: "30px", height: "30px" }}></img>
                    </i>
                    <div style={{ fontSize: 10 }}> {data.toUpperCase()}</div>
                    {data ? (
                        <Button icon="pi pi-check" className="p-button-rounded p-button-text" style={{ width: "30px", height: "30px", fontSize: 7, textAlign: "left" }} onClick={() => showDlgOtherOder(data)} />
                    ) : (
                        <Button icon="pi pi-check" className="p-button-rounded p-button-danger" style={{ width: "30px", height: "30px", fontSize: 7, textAlign: "left" }} onClick={() => showDlgOtherOder(data)} />
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
    let operadorOperation = (ev) => {
        setVperariosA(localStorage.getItem("setOperatios"));
        setVmaquina(localStorage.getItem("selMachinery"));
    };

    let operatorAndAssistantsLstComp = selMachinery ? (
        <OperatorAndAssistantsLstComp
            handleProcess={() => handleProcess()}
            storeMcu={null}
            skill={selOrderDetail ? selOrderDetail : null}
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

    /*
  Return
  */
    return (
        <>
            {" "}
            <Toast ref={toast} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
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
            <Dialog visible={dialogServ} style={{ width: "500px" }} header="Servicio de la orden" modal className="p-fluid" onHide={hideDlgServicio}>
                <div className="grid">{lstOrdersFilter.map((orderX) => serviceTypeIconComp(orderX.jdeServiceType))}</div>
            </Dialog>
            <Dialog visible={dialogOther} style={{ width: "50%" }} header={dialogoOrder(serveicios)} modal className="p-fluid" onHide={hideDlgServicioOtherOrder} footer={accionesBtnSaveOrder(serveicios)}>
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
                                    <b>Lista Operarios/Ayudantes:</b>&nbsp;
                                    <InputText value={vperariosA} only />
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="field"></div>
                    <hr></hr>
                    <b>Asignaciòn Tiempo:</b>&nbsp;
                    <br></br>
                    <br></br>
                    <div className="field">
                        <b>Fecha/Hora Inicio:</b>&nbsp; <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} touchUI />
                    </div>
                    <br></br>
                    <div className="field">
                        <b>Fecha/Hora FIn:</b>&nbsp; <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} touchUI />
                    </div>
                    <hr></hr>
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
