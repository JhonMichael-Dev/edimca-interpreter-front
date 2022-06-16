import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

// Prime components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import { Slider } from "primereact/slider";
import { Toast } from "primereact/toast";

import { OperatorPauseButtonComp } from "./OperatorPauseButtonComp";
import { OperatorServiceIconComp } from "./OperatorServiceIconComp";
import { MachineryFaultsComp } from "../machinery/MachineryFaultsComp";
import { OrderAdvanceComp } from "../order/OrderAdvanceComp";
import { OrderLstComp } from "../order/OrderLstComp";

import OrderDataService from "../../service/OrderDataService";
import ProductDataService from "../../service/ProductDataService";
import { useDataStore } from "../../data/DataStoreContext";

export const OperatorActionsComp = observer((props) => {
    /*
   Variables
   */
    const [loading, setLoading] = useState(false);
    const [pauseControl, setPauseControl] = useState(null);
    const [dataPostPauseWorkingOrder, setDataPostPauseWorkingOrder] = useState(null);
    const [damageControl, setDamageControl] = useState(null);
    const [dataPostFinishedWorkingOrder, setDataPostFinishedWorkingOrder] = useState(null);

    const [lstOrders, setLstOrders] = useState([]);
    const [orderInfo, setOrderInfo] = useState(null);
    const [productInfo, setProductInfo] = useState(null);
    const [pauseDisabled, setPauseDisabled] = useState(null);
    const [stopReason, setStopReason] = useState(null);
    const [selectedDamages, setSelectedDamages] = useState([]);
    const [sliderValue, setSliderValue] = useState(0);
    const toast = useRef(null);
    /*
    Init
    */
    useEffect(() => {
        //console.log("useEffect", props.rowData);
        loadAvailables();
    }, []);

    /*
    Context  
    */
    const dataOrderInProcess = useDataStore();
    /*
    Formats
    */

    /*
    Methods
    */
    const loadAvailables = () => {
        setSliderValue(props.rowData.quantityShipped);
        //handleQueryOrders();
    };

    const handleQueryOrders = () => {
        OrderDataService.queryOrdersByStore(props.selOrder.store).then((valid) => {
            if (valid.data && valid.data.success) {
                setLstOrders(valid.data.obj);
            }
        });
        setPauseDisabled(props.action === "Pausa" ? false : false);
    };

    const handleQueryOrderHeaderAndProductInfo = () => {
        handleQueryOrderHeaderInfo();
        handleQueryProductInfo();
    };

    const handleQueryOrderHeaderInfo = async () => {
        //let _payload = { idWorkingOrder: props.selOrder.idWorkingOrder };
        let _payload = { idWorkingOrder: props.rowData.idWorkingOrder };
        OrderDataService.queryOrderHeaderByWorkingOrderId(_payload).then((valid) => {
            //console.log("handleQueryOrderHeaderInfo", valid);
            if (valid && valid.data.success) {
                setOrderInfo(valid.data.obj);
                setDamageControl(true);
            }
        });
    };

    const handleQueryProductInfo = async () => {
        //let _payload = { idWorkingOrder: props.rowData.idWorkingOrder };
        ProductDataService.queryProductByCode(props.rowData.jdeProductCode).then((valid) => {
            //console.log("handleQueryProductInfo", valid);
            if (valid && valid.data.success) {
                setProductInfo(valid.data.obj);
                setDamageControl(true);
            }
        });
    };

    const handleQueryOrderHeaderAndProductInfoPause = () => {
        handleQueryOrderHeaderInfoPause();
        handleQueryProductInfoPause();
    };

    const handleQueryOrderHeaderInfoPause = async () => {
        //let _payload = { idWorkingOrder: props.selOrder.idWorkingOrder };
        let _payload = { idWorkingOrder: props.rowData.idWorkingOrder };
        OrderDataService.queryOrderHeaderByWorkingOrderId(_payload).then((valid) => {
            //console.log("handleQueryOrderHeaderInfo", valid);
            if (valid && valid.data.success) {
                setOrderInfo(valid.data.obj);
                setDataPostPauseWorkingOrder(true);
            }
        });
    };

    const handleQueryProductInfoPause = async () => {
        //let _payload = { idWorkingOrder: props.rowData.idWorkingOrder };
        ProductDataService.queryProductByCode(props.rowData.jdeProductCode).then((valid) => {
            //console.log("handleQueryProductInfo", valid);
            if (valid && valid.data.success) {
                setProductInfo(valid.data.obj);
                setDataPostPauseWorkingOrder(true);
            }
        });
    };

    const handleQueryOrderHeaderAndProductInfoFinished = () => {
        handleQueryOrderHeaderInfoFinished();
        handleQueryProductInfoFinished();
    };

    const handleQueryOrderHeaderInfoFinished = async () => {
        //let _payload = { idWorkingOrder: props.selOrder.idWorkingOrder };
        let _payload = { idWorkingOrder: props.rowData.idWorkingOrder };
        OrderDataService.queryOrderHeaderByWorkingOrderId(_payload).then((valid) => {
            //console.log("handleQueryOrderHeaderInfo", valid);
            if (valid && valid.data.success) {
                setOrderInfo(valid.data.obj);
                setDataPostFinishedWorkingOrder(true);
            }
        });
    };

    const handleQueryProductInfoFinished = async () => {
        //let _payload = { idWorkingOrder: props.rowData.idWorkingOrder };
        ProductDataService.queryProductByCode(props.rowData.jdeProductCode).then((valid) => {
            //console.log("handleQueryProductInfo", valid);
            if (valid && valid.data.success) {
                setProductInfo(valid.data.obj);
                setDataPostFinishedWorkingOrder(true);
            }
        });
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
                    //let lstFiltered = lstOrders.filter((orderX) => orderX.jdeOrderId === props.selOrder.jdeOrderId);
                    //setOrderInfo(lstFiltered[0]);
                    //setDamageControl(true);
                    handleQueryOrderHeaderAndProductInfo();
                    break;
                case "Fin":
                    handleQueryOrderHeaderAndProductInfoFinished();
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
        // console.log(selAction.target.textContent);
        setStopReason(selAction.target.textContent);
        handleQueryOrderHeaderAndProductInfoPause();
        //setPauseControl(null);
    };

    //cerrar dialogos

    const onCloseDialogDamageControl = (value) => {
        setDamageControl(value);
    };

    const onCloseDialogPostPauseWorkingOrder = (value) => {
        setDataPostPauseWorkingOrder(value);
    };
    const onCloseDialogPostFinishedWorkingOrder = (value) => {
        setDataPostFinishedWorkingOrder(value);
    };

    //envio de data a los servicios WS de wrokingOrder

    const onPosDataWorkingOrderWsPause = () => {
        props.rowData.quantityShipped = sliderValue;
        //props.rowData.stopReason = stopReason;
        props.rowData.stopReason = "REAB";
        let _payloadWorkingOrderWsPause = props.rowData;
        //console.log("_payload.....", _payload);
        OrderDataService.pauseWorkingOrder(_payloadWorkingOrderWsPause).then((valid) => {
            console.log("pauseWorkingOrder.valid", valid);
            if (valid && valid.data.success) {
                toast.current.show({ severity: "info", summary: "Aviso", detail: "Servicio en pause" });
                setDataPostPauseWorkingOrder(false);
                setPauseControl(null);
                props.handleHideDialog();
            }
        });
    };

    const onPosDataWorkingOrderWsDamage = () => {
        console.log("....", props.rowData.idWorkingOrder);
        let _playWorkingOrderTracking = {
            idWorkingOrder: props.rowData.idWorkingOrder,
            stopReason: "MD",
            quantityShipped: sliderValue,
        };
        OrderDataService.stopWorkingOrder(_playWorkingOrderTracking).then((valid) => {
            console.log("stopWorkingOrder.valid", valid);
            if (valid && valid.data.success) {
                toast.current.show({ severity: "error", summary: "Aviso", detail: "Servicio fue detenido" });
                setDamageControl(false);
                props.handleHideDialog();
            }
        });
    };

    const onPosDataWorkingOrderWsFinished = () => {
        props.rowData.quantityShipped = sliderValue;
        let _payloadWorkingOrderWsFinished = props.rowData;
        console.log("_payloadWorkingOrderWsPause.....", _payloadWorkingOrderWsFinished);
        OrderDataService.finishWorkingOrder(_payloadWorkingOrderWsFinished).then((valid) => {
            //console.log("pauseWorkingOrder.valid", valid);
            if (valid && valid.data.success) {
                toast.current.show({ severity: "success", summary: "Aviso", detail: "Servicio en finalizado" });
                setDataPostPauseWorkingOrder(false);
                props.handleHideDialog();
            }
        });
    };

    const onChangeSlider = (value) => {
        setSliderValue(value);
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
                <OperatorPauseButtonComp
                    status="info"
                    label="ALMUERZO / CENA"
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

    let damageOptions =
        damageControl && orderInfo && productInfo ? (
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
                            {props.rowData.idWorkingOrder}
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
                <OrderAdvanceComp action={onPosDataWorkingOrderWsDamage} closeDialog={onCloseDialogDamageControl} orderInfo={orderInfo} productInfo={productInfo} sliderValue={onChangeSlider} rowData={props.rowData} stopReason={stopReason} />
            </React.Fragment>
        ) : (
            ""
        );

    let postPauseWorkingOrder =
        dataPostPauseWorkingOrder && orderInfo && productInfo ? (
            <React.Fragment>
                {" "}
                <OrderAdvanceComp action={onPosDataWorkingOrderWsPause} closeDialog={onCloseDialogPostPauseWorkingOrder} orderInfo={orderInfo} productInfo={productInfo} sliderValue={onChangeSlider} rowData={props.rowData} stopReason={stopReason} />
            </React.Fragment>
        ) : (
            ""
        );

    let postFinishedWorkingOrder =
        dataPostFinishedWorkingOrder && orderInfo && productInfo ? (
            <React.Fragment>
                {" "}
                <OrderAdvanceComp action={onPosDataWorkingOrderWsFinished} closeDialog={onCloseDialogPostFinishedWorkingOrder} orderInfo={orderInfo} productInfo={productInfo} sliderValue={onChangeSlider} rowData={props.rowData} stopReason={stopReason} />
            </React.Fragment>
        ) : (
            ""
        );

    /*
    Return
    */
    return (
        <>
            <Toast ref={toast} />
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
                {damageControl ? (
                    <Dialog
                        header={"Registro de Daño"}
                        visible={damageControl !== null}
                        onHide={() => setDamageControl(null)}
                        style={{
                            width: "45%",
                        }}
                        modal
                        closable
                        draggable={false}
                        resizable={false}
                    >
                        {damageOptions}
                    </Dialog>
                ) : (
                    ""
                )}
                {dataPostPauseWorkingOrder ? (
                    <Dialog
                        visible={dataPostPauseWorkingOrder !== null}
                        onHide={() => setDataPostPauseWorkingOrder(false)}
                        style={{
                            width: "45%",
                        }}
                        modal
                        closable
                        draggable={false}
                        resizable={false}
                    >
                        {postPauseWorkingOrder}
                    </Dialog>
                ) : (
                    ""
                )}
                {dataPostFinishedWorkingOrder ? (
                    <Dialog
                        visible={dataPostFinishedWorkingOrder !== null}
                        onHide={() => setDataPostFinishedWorkingOrder(false)}
                        style={{
                            width: "45%",
                        }}
                        modal
                        closable
                        draggable={false}
                        resizable={false}
                    >
                        {postFinishedWorkingOrder}
                    </Dialog>
                ) : (
                    ""
                )}
            </React.Fragment>
        </>
    );
});
