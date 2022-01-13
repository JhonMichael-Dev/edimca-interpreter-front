import React from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";
import { InputTextarea } from "primereact/inputtextarea";

/**
 * Own components
 */
import { theme } from "../../theme/theme";

export const InputFloatLabel = (props) => {
    /**
     * Return
     */

    let inputFloatLabelComp = props.number ? (
        <div className="p-float-label p-field" style={theme.styles.spam}>
            <InputNumber
                id="idInputFloatLabelNumber"
                autoFocus={props.autoFocus}
                mode="decimal"
                minFractionDigits={props.minFractionDigits ? props.minFractionDigits : 2}
                maxFractionDigits={props.maxFractionDigits ? props.maxFractionDigits : 2}
                locale="en-US"
                min={props.min ? props.min : 1}
                max={props.max ? props.max : 100000}
                step={props.step ? props.step : 1}
                showButtons={props.showButtons}
                value={props.value ? props.value : null}
                onValueChange={(ev) => props.onChange(ev.value)}
                readOnly={props.readOnly}
                disabled={props.disabled}
            />
            <label htmlFor="idInputFloatLabelNumber">{props.label}</label>
            <small className="p-error p-d-block">{props.log}</small>
        </div>
    ) : props.date ? (
        <div className="p-float-label p-field" style={theme.styles.spam}>
            <InputMask id="idInputFloatLabel" mask="99/99/9999" value={props.value ? props.value : ""} slotChar="mm/dd/yyyy" onChange={(ev) => props.onChange(ev.target.value)} readOnly={props.readOnly} disabled={props.disabled}></InputMask>
            <label htmlFor="idInputFloatLabel">{props.label}</label>
            <small className="p-error p-d-block">{props.log}</small>
        </div>
    ) : props.textArea ? (
        <div className="p-float-label p-field" style={theme.styles.spam}>
            <InputTextarea
                id="idInputFloatLabel"
                autoFocus={props.autoFocus}
                value={props.value ? props.value : ""}
                rows={4}
                autoResize={props.autoResize ? props.autoResize : true}
                onChange={(ev) => {
                    if (!ev.target.value || ev.target.value.length <= (props.maxSize ? props.maxSize : 250)) {
                        props.onChange(ev.target.value);
                    }
                }}
                readOnly={props.readOnly}
                disabled={props.disabled}
                title={props.title}
            />
            <label htmlFor="idInputFloatLabel">{props.label}</label>
            <small className="p-error p-d-block">{props.log}</small>
        </div>
    ) : (
        <div className="p-float-label p-field" style={theme.styles.spam}>
            <InputText id="idInputFloatLabel" value={props.value ? props.value : ""} onChange={(ev) => props.onChange(ev.target.value)} readOnly={props.readOnly} disabled={props.disabled} title={props.title} autoFocus={props.autoFocus} />
            <label htmlFor="idInputFloatLabel">{props.label}</label>
            <small className="p-error p-d-block">{props.log}</small>
        </div>
    );

    return (
        <div className={"p-col-12 p-md-" + props.width}>
            <div className="p-inputgroup" style={{ paddingTop: 10 }}>
                <span className="p-inputgroup-addon" style={theme.styles.spam}>
                    <i className={props.icon}></i>
                </span>
                {inputFloatLabelComp}
            </div>
        </div>
    );
};
