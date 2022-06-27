import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { Button } from "primereact/button";

import MaintenanceOrderService from "../../service/MaintenanceOrderService"

export const MaintenanceOrderStatus = observer((props) => {
    /*
Variables
*/
    const toast = useRef(null);
    /*
Init
*/
    useEffect(() => {
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

    const queryMaintenanceOrderStatus = (rowData) => {
        //console.log(rowData);

        let machineryDto = {
            jdeCode: rowData.jdeCode
        };

        MaintenanceOrderService.queryMachineryMaintenanceOrdersByAssetNumber(machineryDto).then((valid) => {
            //console.log(valid.data.obj);
            props.onSearch(valid.data.obj);
        });
        //props.onSearch();
    }

    /*
Inner Components
*/

    /*
Return
*/
    return (
        <Button
            label="Consultar"
            style={{ width: "100%", fontSize: "10px" }}
            className="p-button-sm p-button-info"
            onClick={() => queryMaintenanceOrderStatus(props.machinery)} />
    );
});
