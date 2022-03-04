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
import OrderDataService from "../../service/OrderDataService";
import OperatorDataService from "../../service/OperatorDataService";
// Services
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
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

    const [service, setService] = useState([]);
    const [estadoAsig, setEstadoAsig] = useState(false);

    const [lstOperators, setLstOperators] = useState(null);
    const [selectOperators, setSelectOperators] = useState(null);

    const [lstOperatorsA, setLstOperatorsA] = useState(null);
    const [selectOperatorsA, setSelectOperatorsA] = useState(null);
    const itemsC = [
        {
            label: "Contadora recta 01",
        },
        {
            label: "Contadora recta 02",
        },
    ];
    const itemsR = [
        {
            label: "Ruteadora 01",
        },
        {
            label: "Ruteadora 03",
        },
        {
            label: "Ruteadora 90",
        },
    ];
    const itemsE = [
        {
            label: "Enchapadora 01",
        },
        {
            label: "Enchapadora 09",
        },
        {
            label: "Enchapadora 71",
        },
    ];
    const itemsP = [
        {
            label: "Perforadora 01",
        },
        {
            label: "Perforadora 01",
        },
    ];

    const [listnumOrdern] = useState([]);

    const [dialogServDetalle, setDialogServDetalle] = useState(false);
    const [dateDetalleHI, setDateDetalleHI] = useState(new Date("December 17, 1995 03:24:00"));
    const [dateDetalleHF, setDateDetalleHF] = useState(new Date("December 17, 1995 16:24:00"));
    const [dateDetalle, setDateDetalle] = useState(new Date());
    /*
    Init
    */
    useEffect(() => {
        loadAvailables();
        console.log(new Date().getTime());
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
        setDialogServ(false);
        setService([]);
    };

    const updateOrderAsignation = () => {
        setDialogOther(false);
        setService([]);
    };

    const showDlgServicioOtherOrder = (rowData) => {
        setEstadoAsig(true);
        setClienteNombre(rowData.client.firstName);
        setAn8(rowData.client.jdeAn8);
        setIndentificacion(rowData.client.identification);
        setAsesor(rowData.asesor);
        setNumOrdern(rowData.jdeOrderId);
        setTypeOrdern(rowData.jdeOrderType.code);
        setDialogServ(true);
    };

    const dialogoOrder = () => {
        return (
            <React.Fragment>
                <h5>Asignar Orden Manual</h5>
                <h6>
                    <div className="grid">
                        <div className="col-6 lg:col-6 xl:col-6">
                            <b>An8: </b>&nbsp; {an8}
                            <br></br>
                            <b>Nombre:</b>&nbsp; {clienteNombre}
                            <br></br>
                            <b>Identificación:</b>&nbsp; {indentificacion}
                            <br></br>
                            <b>Asesor:</b>&nbsp; {asesor}
                            <br></br>
                            <b>Numero Orden:</b>&nbsp; {numOrdern}
                            <br></br>
                            <b>Tipo Orden:</b>&nbsp; {typeOrdern}
                        </div>
                        <div className="col-6 lg:col-6 xl:col-6">
                            <div className="p-d-flex p-ai-center p-flex-wrap">
                                <SplitButton label="Corte" className="p-button-sm p-button-link p-button-info" style={{ display: service.indexOf("Corte") !== -1 ? "" : "none" }} onClick={() => {}} model={itemsC} />
                                <br></br>
                                <SplitButton label="Ruteado" className="p-button-link p-button-info" style={{ display: service.indexOf("Ruteado") !== -1 ? "" : "none" }} onClick={() => {}} model={itemsR} />
                                <br></br>
                                <SplitButton label="Enchapado" className="p-button-link p-button-info" style={{ display: service.indexOf("Enchapado") !== -1 ? "" : "none" }} onClick={() => {}} model={itemsE} />
                                <br></br>
                                <SplitButton label="Perforado" className="p-button-link p-button-info" style={{ display: service.indexOf("Perforado") !== -1 ? "" : "none" }} onClick={() => {}} model={itemsP} />
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
                            <b>An8: </b>&nbsp; {an8}
                            <br></br>
                            <b>Nombre:</b>&nbsp; {clienteNombre}
                            <br></br>
                            <b>Identificación:</b>&nbsp; {indentificacion}
                            <br></br>
                            <b>Asesor:</b>&nbsp; {asesor}
                            <br></br>
                            <b>Numero Orden:</b>&nbsp; {numOrdern}
                            <br></br>
                            <b>Tipo Orden:</b>&nbsp; {typeOrdern}
                        </div>
                        <div className="col-6 lg:col-6 xl:col-6">
                            <div className="p-d-flex p-ai-center p-flex-wrap">
                                <SplitButton label="Corte" className="p-button-sm p-button-link p-button-info" style={{ display: service.indexOf("Corte") !== -1 ? "none" : "" }} onClick={() => {}} model={itemsC} />
                                <br></br>
                                <SplitButton label="Ruteado" className="p-button-link p-button-info" style={{ display: service.indexOf("Ruteado") !== -1 ? "" : "none" }} onClick={() => {}} model={itemsR} />
                                <br></br>
                                <SplitButton label="Enchapado" className="p-button-link p-button-info" style={{ display: service.indexOf("Enchapado") !== -1 ? "none" : "" }} onClick={() => {}} model={itemsE} />
                                <br></br>
                                <SplitButton label="Perforado" className="p-button-link p-button-info" style={{ display: service.indexOf("Perforado") !== -1 ? "" : "none" }} onClick={() => {}} model={itemsP} />
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
                field="priority.code"
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

    /*
  Return
  */
    return (
        <>
            {" "}
            <Toast ref={toast}></Toast>
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
            <Dialog visible={dialogServ} style={{ width: "500px" }} header="Seleccionar Servicio" modal className="p-fluid" onHide={hideDlgServicioOtherOrder}>
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
                <br></br>

                <div>
                    <Button label="Asignar" style={{ width: "100%" }} className="p-button-rounded p-button-info mr-2" onClick={() => showDlgCrearAsigancionOtherOder()} />
                </div>
            </Dialog>
            <Dialog visible={dialogOther} style={{ width: "50%" }} header={dialogoOrder()} modal className="p-fluid" onHide={hideDlgServicioOtherOrder}>
                <b>Asignaciòn Tiempo:</b>&nbsp;
                <br></br>
                <br></br>
                <div className="p-field p-col-6 p-md-2">
                    <Calendar id="time12" placeholder="Hora Inicio" value={date9} onChange={(e) => setDate9(e.value)} timeOnly hourFormat="12" styles={{ width: "20%" }} />
                </div>
                <br></br>
                <div className="p-field p-col-6 p-md-2">
                    <Calendar id="time13" placeholder="Hora Fin" value={date10} onChange={(e) => setDate10(e.value)} timeOnly hourFormat="12" styles={{ width: "20%" }} />
                </div>
                <br></br>
                <div className="field">
                    <b>Fecha:</b>&nbsp; <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} />
                </div>
                <br></br>
                <div className="field">
                    <b>Operador Principal:</b>&nbsp; <Dropdown value={selectOperators} options={lstOperators} onChange={(e) => setSelectOperators(e.value)} optionLabel="username" placeholder="Seleciones" />
                </div>
                <br></br>
                <div className="field">
                    <b>Operador Ayudante:</b>&nbsp; <Dropdown value={selectOperatorsA} options={lstOperatorsA} onChange={(e) => setSelectOperatorsA(e.value)} optionLabel="username" placeholder="Seleciones" />
                </div>
                <hr></hr>
                <div className="field">
                    <Button label="Asignar orden" className="p-button-rounded p-button-info mr-2" onClick={() => updateOrderAsignation()} />
                </div>
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
                    <b>Fecha:</b>&nbsp; <Calendar id="basic" value={dateDetalle} onChange={(e) => setDateDetalle(console.log(e.value))} />
                </div>
                <br></br>
                <div className="field">
                    <b>Operador Principal:</b>&nbsp; <Dropdown value={selectOperators} options={lstOperators} onChange={(e) => setSelectOperators(e.value)} optionLabel="username" placeholder="GPACJACAMA" />
                </div>
                <br></br>
                <div className="field">
                    <b>Operador Ayudante:</b>&nbsp; <Dropdown value={selectOperatorsA} options={lstOperatorsA} onChange={(e) => setSelectOperatorsA(e.value)} optionLabel="username" placeholder="GMERA" />
                </div>
                <hr></hr>
            </Dialog>
        </>
    );
});
