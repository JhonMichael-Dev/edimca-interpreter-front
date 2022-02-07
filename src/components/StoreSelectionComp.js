import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

// Prime components
import { Card } from "primereact/card";
import { confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// Services
import StoreDataService from "../service/StoreDataService";
import { PasswordOperationComp } from "./PasswordOperationComp";

export const StoreSelectionComp = observer((props) => {
    /*
  Variables
  */
    const [visible, setVisible] = useState(false);
    const [lstStores, setLstStores] = useState([]);
    const [selectLstStore, setSelectLstStore] = useState(null);
    const [lstStoreData, setLstStoreData] = useState([]);
    const [visibleMOdal, setVisibleModal] = useState(false);
    const [value2, setValue2] = useState("");
    const [evSelect, setEvSelect] = useState(null);
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
        handleQueryStore();
    };

    const handleQueryStore = () => {
        StoreDataService.queryStores().then((valid) => {
            if (valid.data && valid.data.success) {
                valid.data.obj.map((storeX) => {
                    setLstStoreData((oldArray) => [storeX, ...oldArray]);
                });

                let datax = valid.data.obj.map((storeX) => {
                    return {
                        label: storeX.mcu + " - " + storeX.name,
                        value: storeX.mcu,
                    };
                });
                setLstStores(datax);
            }
        });
    };

    /*
  Inner Components
  */
    const onSelecStore = (e) => {
        setSelectLstStore(e.value);
    };

    const onSelecStoreTbl = (e) => {
        setEvSelect(e);
        setVisibleModal(true);
    };

    const renderFooter = () => {
        return (
            <div>
                <Button label="Ok" icon="pi pi-check" onClick={() => onOk()} autoFocus />
            </div>
        );
    };
    const onHide = () => {
        setVisibleModal(false);
    };

    const onOk = () => {
        props.handleSelectStore(evSelect);
        setVisibleModal(false);
    };

    let digPromesaCliente = () => {
        return (
            <Dialog
                visible={visibleMOdal}
                onHide={() => onHide()}
                style={{
                    width: "50vw",
                    height: "20vw",
                    textAlign: "center",
                }}
                footer={renderFooter}
                className="col-12 lg:col-8 xl:col-6"
                closable
                resizable={false}
                draggable={false}
            >
                <div>
                    <h5>Ingrese la promesa del cliente</h5>
                    <span className="p-float-label">
                        <InputText id="promestClient" value={value2} onChange={(e) => setValue2(e.target.value)} />
                    </span>
                </div>
            </Dialog>
        );
    };
    /*
  Return
  */
    return (
        <>
            {!props.rendered ? (
                ""
            ) : (
                <div className="grid">
                    {true ? (
                        ""
                    ) : (
                        <div className="col-12 xl:col-6">
                            <div className="card">
                                <span className="p-float-label">
                                    <Dropdown id="dropdown" options={lstStores} value={selectLstStore} onChange={onSelecStore} style={{ width: "100%", height: "70px" }}></Dropdown>
                                    <label htmlFor="dropdown">Seleccione una tienda </label>
                                </span>
                            </div>
                        </div>
                    )}
                    <div className="col-12 xl:col-12">
                        <div className="card">
                            <h6>Selección de tienda</h6>
                            <DataTable className="p-datatable-customers" value={lstStoreData} rows={5} selectionMode="single" paginator onSelectionChange={onSelecStoreTbl}>
                                <Column field="mcu" header="Cod." />
                                <Column field="name" header="Nombre" />
                                <Column field="address1" header="Dirección" />
                            </DataTable>
                        </div>
                    </div>
                    {digPromesaCliente()}
                </div>
            )}
        </>
    );
});
