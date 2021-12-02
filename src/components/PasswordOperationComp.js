import React, { useEffect, useState, useRef } from "react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
export const PasswordOperationComp = (data) => {
    /*
  Variables
  */
    const [showDlg, setShowDlg] = useState([data.data]);
    /*
  Init
  */
    useEffect(() => {
        setShowDlg(data.data);
        //console.log(showDlg);
        //loadAvailables();
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
    /*
  Inner Components
  */

    const onHide = () => {
        setShowDlg(false);
    };

    const renderFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => onHide()} autoFocus />
            </div>
        );
    };
    /*
  Return
  */
    return (
        <div>
            <Dialog header="Header" visible={showDlg} modal={false} style={{ width: "50vw" }} footer={renderFooter()} onHide={() => onHide()}>
                <p className="p-m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </Dialog>
        </div>
    );
};
