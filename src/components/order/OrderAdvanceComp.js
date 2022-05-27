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

export const OrderAdvanceComp = observer((props) => {
    /*
   Variables
   */
    const [sliderValue, setSliderValue] = useState(0);
    const [damageControl, setDamageControl] = useState(null);
    const [postAdvanceOrder, setPostAdvanceOrder] = useState(null);
    //console.log("props......... ", props);

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
        setSliderValue(props.rowData.quantityShipped);
        //handleQueryOrders();
    };

    const closeDialog = () => {
        props.closeDialog(false);
    };

    const posDataWorkigOrder = (value) => {
        props.action();
    };

    const onChangeSliderComp = (value) => {
        setSliderValue(value);
        props.sliderValue(sliderValue);
    };

    /*
    Inner Components
    */

    /*
    Return
    */
    return (
        <>
            {" "}
            <div>
                <b>Registro avance de orden</b>
            </div>
            <div className="card">
                <div className="grid" style={{ fontSize: "14px", marginTop: "1%" }}>
                    <div className="col-3">
                        <b>Tipo de Orden:</b>
                        <InputText value={props.orderInfo ? props.orderInfo.jdeOrderTypeCode : ""} style={{ border: "none", width: "40%", fontSize: "14px" }} disabled />
                    </div>
                    <div className="col-3 col-offset-1">
                        <b>Order N°:</b>
                        <InputText value={props.orderInfo ? props.orderInfo.jdeOrderId : ""} style={{ border: "none", width: "60%", fontSize: "14px" }} disabled />
                    </div>
                    <div className="col-4">
                        <b>Cliente:</b>
                        <InputText value={props.orderInfo ? props.orderInfo.client.firstName + " " + props.orderInfo.client.lastName : ""} style={{ border: "none", width: "77%", fontSize: "14px" }} disabled />
                    </div>
                </div>
                <div className="grid" style={{ marginBottom: "3%", marginTop: "1%" }}>
                    <div className="col-6 col-offset-1">
                        <b>Avance de Orden: {sliderValue + " [" + props.productInfo.unitOfMeasure.code + "]"}</b>
                    </div>
                </div>
                <div className="grid">
                    <div className="col-3" style={{ textAlign: "right" }}>
                        {0}
                    </div>
                    <div className="col-6">
                        <Tooltip target=".slider>.p-slider-handle" content={`${sliderValue} ${props.productInfo.unitOfMeasure.code}`} position="top" event="focus" />
                        <Slider className="slider" min={0.0} max={props.rowData.quantityRequested} step={0.1} value={sliderValue} onChange={(e) => onChangeSliderComp(e.value < props.rowData.quantityShipped ? sliderValue : e.value)} style={{ width: "100%", height: "10px", marginTop: "1%" }} />
                    </div>
                    <div className="col-3">{`${props.rowData.quantityRequested} ${props.productInfo.unitOfMeasure.description1}`}</div>
                </div>
                <div className="grid" style={{ marginTop: "3%", marginRight: "5%" }}>
                    <div className="col-12" style={{ textAlign: "right" }}>
                        <Button className={"p-button p-button-primary"} style={{ display: "inline-block", borderRadius: "10%" }} onClick={() => posDataWorkigOrder()} label="Aceptar"></Button>
                        &nbsp;
                        <Button className={"p-button p-button-secondary"} style={{ display: "inline-block", borderRadius: "10%" }} onClick={() => closeDialog()} label="Cancelar"></Button>
                    </div>
                </div>
            </div>
        </>
    );
});
