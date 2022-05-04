import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";

// Prime components

// Services
import OperatorDataService from "../../service/OperatorDataService";

export const OperatorIconComp2 = observer((props) => {
    /*
    Variables
    */
    const [selOperator, setSelOperator] = useState(null);

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
        if (props.operator) {
            setSelOperator(props.operator);
        } else {
            // Query operator by username
            let _payload = { username: props.username };
            OperatorDataService.queryUserposDtoByUsername(_payload).then((valid) => {
                //console.log("props.username", props.username);
                //console.log("queryUserposDtoByUsername", valid);
                if (valid.data && valid.data.success) {
                    setSelOperator(valid.data.obj);
                }
            });
        }
    };

    let imageName = "/assets/images/default.png";

    /*
Inner Components
*/

    /*
Return
*/
    return selOperator ? (
        <div className="p-card" style={{ textAlign: "center", backgroundColor: "unset", boxShadow: "none" }} title={selOperator.username}>
            <i className="p-overlay-badge">
                <img src={OperatorDataService.getAccountStateFilePath(selOperator.fileName)} alt="Sin Foto" style={{ width: "70px", height: "70px" }} />
                <div style={{ fontSize: 10 }}> {selOperator.username}</div>
            </i>
        </div>
    ) : (
        props.username
    );
});
