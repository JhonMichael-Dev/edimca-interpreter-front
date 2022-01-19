import React from "react";
import { Password } from "primereact/password";

/**
 * Own labels
 */
import { theme } from "../../theme/theme";

export const PasswordFloatLabel = (props) => {
    /**
     * Return
     */
    return (
        <div className={"p-col-12 p-md-" + props.width}>
            <div className="p-inputgroup" style={{ paddingTop: 10 }}>
                <span className="p-inputgroup-addon" style={theme.styles.spam}>
                    <i className={props.icon}></i>
                </span>
                <div className="p-float-label p-field" style={theme.styles.spam}>
                    <Password id="idInputFloatLabel" value={props.value ? props.value : ""} onChange={(ev) => props.onChange(ev.target.value)} feedback={props.feedback} weakLabel={"Débil"} mediumLabel={"Fuerte"} strongLabel={"Indescifrable"} required={true} autoFocus={props.autoFocus} />
                    <label htmlFor="idInputFloatLabel">{props.label}</label>
                    <small className="p-error p-d-block">{props.log}</small>
                </div>
            </div>
        </div>
    );
};
