import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { FileUpload } from "primereact/fileupload";

// Prime components

// Services
import FileStorageService from "../../service/FileStorageService";

export const FileUploadComp = observer((props) => {
    /*
Variables
*/
    const toast = useRef(null);
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

    const loadAvailables = () => {};

    const invoiceUploadHandler = ({ files }) => {
        files.map((fileX) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => {
                uploadInvoice(fileX);
            };
            fileReader.readAsText(fileX);
        });
    };

    const uploadInvoice = async (file) => {
        let formData = new FormData();
        //console.log(file.name);
        formData.append("file", file);
        formData.append("name", file.name);
        formData.append("size", file.size);
        formData.append("type", file.type);
        FileStorageService.storeOperatorFile(formData, props.operator.username).then((valid) => {
            if (valid.success) {
                //console.log("OK");
                props.onUpdate();
            } else {
                //console.log("WRONG");
            }
        });
    };

    /*
Inner Components
*/

    /*
Return
*/
    return (
        <div className="p-card" style={{ textAlign: "center", backgroundColor: "unset", boxShadow: "none" }}>
            <i className="p-overlay-badge">
                <FileUpload name="invoice" accept="image/*" customUpload={true} uploadHandler={invoiceUploadHandler} mode="basic" chooseLabel="SUBIR" />
            </i>
        </div>
    );
});
