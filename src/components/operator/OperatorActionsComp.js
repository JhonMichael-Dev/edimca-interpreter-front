import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

// Prime components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { Slider } from "primereact/slider";

import { OperatorPauseButtonComp } from "./OperatorPauseButtonComp";
import { OperatorServiceIconComp } from "./OperatorServiceIconComp";
import { MachineryFaultsComp } from "../machinery/MachineryFaultsComp";

import OrderDataService from "../../service/OrderDataService";

export const OperatorActionsComp = observer((props) => {
    /*
   Variables
   */
    const [loading, setLoading] = useState(false);
    const [pauseControl, setPauseControl] = useState(null);
    const [damageControl, setDamageControl] = useState(null);
    const [lstOrders, setLstOrders] = useState([]);
    const [orderInfo, setOrderInfo] = useState(null);
    const [pauseDisabled, setPauseDisabled] = useState(null);

    const categories = [
        { name: "Daño mecánico", key: "M" },
        { name: "Daño neumático", key: "N" },
        { name: "Daño eléctrico", key: "E" },
    ];
    const [selectedCategory, setSelectedCategory] = useState([]);

    const damage = [
        { name: "Falla guillotina", key: "G" },
        { name: "Falla Calderin", key: "C" },
        { name: "Falla retestador", key: "RE" },
        { name: "Falla rascacolas", key: "A" },
    ];
    const [selectedDamages, setSelectedDamages] = useState([]);

    const [sliderValue, setSliderValue] = useState(0);
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
        handleQueryOrders();
    };

    const handleQueryOrders = () => {
        OrderDataService.queryOrdersByStore(props.selOrder.store).then((valid) => {
            if (valid.data && valid.data.success) {
                setLstOrders(valid.data.obj);
            }
        });
        setPauseDisabled(props.action === "Pausa" ? false : false);
    };

    const onLoadingClick = (selAction) => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            switch (selAction) {
                case "Play":
                    break;
                case "Pausa":
                    setPauseControl(true);
                    break;
                case "Daño":
                    setDamageControl(true);
                    let lstFiltered = lstOrders.filter((orderX) => orderX.jdeOrderId === props.selOrder.jdeOrderId);
                    setOrderInfo(lstFiltered[0]);
                    break;
                case "Fin":
                    break;
                default:
                    break;
            }
        }, 500);
    };

    const onDamageChange = (e) => {
        let _selectedDamages = [...selectedDamages];

        if (e.checked) {
            _selectedDamages.push(e.value);
        } else {
            for (let i = 0; i < _selectedDamages.length; i++) {
                const selectedCategory = _selectedDamages[i];

                if (selectedCategory.key === e.value.key) {
                    _selectedDamages.splice(i, 1);
                    break;
                }
            }
        }

        setSelectedDamages(_selectedDamages);
    };

    const onPauseReasonClick = (selAction) => {
        console.log(selAction.target.textContent);
        setPauseControl(null);
    };

    /*
    Inner Components
    */
    let pauseOptions = (
        <div className="grid">
            <div className="col-4">
                <OperatorPauseButtonComp
                    status="warning"
                    label="REABASTECIMIENTO"
                    onClick={(e) => {
                        onPauseReasonClick(e);
                    }}
                />
                <OperatorPauseButtonComp
                    status="warning"
                    label="NO COINCIDEN PLANOS"
                    onClick={(e) => {
                        onPauseReasonClick(e);
                    }}
                />
                <OperatorPauseButtonComp
                    status="warning"
                    label="INCONFORMIDAD DE MATERIALES"
                    onClick={(e) => {
                        onPauseReasonClick(e);
                    }}
                />
                <OperatorPauseButtonComp
                    status="warning"
                    label="ALMUERZO / CENA"
                    onClick={(e) => {
                        onPauseReasonClick(e);
                    }}
                />
            </div>
            <div className="col-4">
                <OperatorPauseButtonComp
                    status="info"
                    label="PAUSA ACTIVA"
                    onClick={(e) => {
                        onPauseReasonClick(e);
                    }}
                />
                <OperatorPauseButtonComp
                    status="info"
                    label="BAÑO"
                    onClick={(e) => {
                        onPauseReasonClick(e);
                    }}
                />
            </div>
            <div className="col-4">
                <OperatorPauseButtonComp
                    status="success"
                    label="MANTENIMIENTO PREVENTIVO"
                    onClick={(e) => {
                        onPauseReasonClick(e);
                    }}
                />
                <OperatorPauseButtonComp
                    status="success"
                    label="CAMBIO DE HERRAMIENTA"
                    onClick={(e) => {
                        onPauseReasonClick(e);
                    }}
                />
                <OperatorPauseButtonComp
                    status="success"
                    label="FINAL DE JORNADA"
                    onClick={(e) => {
                        onPauseReasonClick(e);
                    }}
                />
            </div>
        </div>
    );

    let damageOptions = (
        <React.Fragment>
            <div className="grid">
                <div className="col-4" style={{ textAlign: "center" }}>
                    <div style={{ display: "inline-block" }}>
                        <OperatorServiceIconComp serviceType={props.rowData.jdeServiceType} badgeNumber={null} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="col-12 lg:col-12 xl:col-12">
                        <b>MAQUINARIA:</b>
                        {props.rowData.machine}
                    </div>
                    <div className="col-12 lg:col-12 xl:col-12">
                        <b>ID ORDEN TRABAJO:</b>
                        {props.rowData.productDto.jdeId}
                    </div>
                </div>
                <div className="col-4">
                    <div className="col-12 lg:col-12 xl:col-12">
                        <b>JEFE DE SUCURSAL:</b>
                    </div>
                    <div className="col-12 lg:col-12 xl:col-12">Pilar Gutierrez</div>
                </div>
            </div>
            <div className="grid">
                <div className="col-2 col-offset-1">
                    <b>Motivo:</b>
                </div>
            </div>

            <MachineryFaultsComp />
            
            <div className="grid" style={{ fontSize: "14px", marginTop: "1%" }}>
                <div className="col-3 col-offset-1">
                    <b>Order N°:</b>
                    <InputText value={orderInfo ? orderInfo.jdeOrderId : ""} style={{ border: "none", width: "60%", fontSize: "14px" }} disabled />
                </div>
                <div className="col-4">
                    <b>Cliente:</b>
                    <InputText value={orderInfo ? orderInfo.client.firstName + " " + orderInfo.client.lastName : ""} style={{ border: "none", width: "77%", fontSize: "14px" }} disabled />
                </div>
                <div className="col-3">
                    <b>Tipo de Orden:</b>
                    <InputText value={orderInfo ? orderInfo.jdeOrderType.code : ""} style={{ border: "none", width: "40%", fontSize: "14px" }} disabled />
                </div>
            </div>

            <div className="grid" style={{ marginBottom: "3%", marginTop: "1%" }}>
                <div className="col-6 col-offset-1">
                    <b>Avance de Orden:</b>
                </div>
            </div>
            <div className="grid">
                <div className="col-3" style={{ textAlign: "right" }}>
                    {0}
                </div>
                <div className="col-6">
                    <Tooltip target=".slider>.p-slider-handle" content={`${sliderValue} ${props.rowData.units.unitCode}`} position="top" event="focus" />
                    <Slider className="slider" max={props.rowData.units.quantityRequested} step={0.1} value={sliderValue} onChange={(e) => setSliderValue(e.value)} style={{ width: "100%", height: "10px", marginTop: "1%" }} />
                </div>
                <div className="col-3">{`${props.rowData.units.quantityRequested} ${props.rowData.units.unitDescription}`}</div>
            </div>
            <div className="grid" style={{ marginTop: "3%", marginRight: "5%" }}>
                <div className="col-12" style={{ textAlign: "right" }}>
                    <Button className={"p-button p-button-primary"} style={{ display: "inline-block", borderRadius: "10%" }} onClick={() => setDamageControl(null)} label="Aceptar"></Button>
                    &nbsp;
                    <Button className={"p-button p-button-secondary"} style={{ display: "inline-block", borderRadius: "10%" }} onClick={() => setDamageControl(null)} label="Cancelar"></Button>
                </div>
            </div>
        </React.Fragment>
    );
    /*
    Return
    */
    return (
        <React.Fragment>
            <Button
                className={"p-button-rounded p-button-" + props.color}
                style={{ fontSize: 15, justifyContent: "center", width: "100%" }}
                loading={loading}
                onClick={() => onLoadingClick(props.action)}
                disabled={
                    props.rowData.status === "PAUSADO"
                        ? props.action === "Pausa"
                            ? true
                            : false
                        : props.rowData.status === "EN_PROCESO"
                        ? props.action === "Play"
                            ? true
                            : false
                        : props.rowData.status === "COMPLETADO"
                        ? props.action === "Play" || props.action === "Pausa" || props.action === "Daño"
                            ? true
                            : false
                        : false
                }
                label={props.action}
                icon={"pi pi-" + props.icon}
            ></Button>
            <Dialog
                header={"Motivos Pausa"}
                visible={pauseControl !== null}
                onHide={() => setPauseControl(null)}
                style={{
                    width: "50%",
                    textAlign: "center",
                }}
                modal
                closable
                draggable={false}
                resizable={false}
            >
                {pauseOptions}
            </Dialog>
            <Dialog
                header={"Registro de Daño"}
                visible={damageControl !== null}
                onHide={() => setDamageControl(null)}
                style={{
                    width: "45%"
                }}
                modal
                closable
                draggable={false}
                resizable={false}
            >
                {damageOptions}
            </Dialog>
        </React.Fragment>
    );
});
