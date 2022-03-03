import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
//import { computed } from "mobx";
// Prime components
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ToggleButton } from "primereact/togglebutton";
import { Checkbox } from "primereact/checkbox";
import { SelectButton } from "primereact/selectbutton";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { addLocale } from "primereact/api";
import { InputText } from "primereact/inputtext";
import OrderDataService from "../../service/OrderDataService";
// Services
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
export const OrderLstVLComp = observer((props) => {
    /*
  Variables
  */
    const dt = useRef(null);
    const [visible, setVisible] = useState(false);
    const [lstOrders, setLstOrders] = useState([]);
    const [dialogVL, setDialogVL] = useState(false);
    const [date1, setDate1] = useState(null);
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [checked, setChecked] = useState(false);

    /*
Init
*/
    useEffect(() => {
        loadAvailables();
    }, []);
    /*
  Formats
  */

    /*
  Methods
  */
    const loadAvailables = () => {
        OrderDataService.queryIncomingOrdersByStoreVL(props.storeMcu).then((valid) => {
            if (valid.data && valid.data.success) {
                let lstOrderVL = valid.data.obj.filter((OrObjX) => true || OrObjX.store.mcu === props.storeMcu)[0];
                console.log("lstOrderVL", lstOrderVL);
                setLstOrders(valid.data.obj);
            }
        });
    };

    const tmpCliente = (rowData) => {
        return (
            <React.Fragment>
                <div className="field">
                    <b>Categoria: </b>&nbsp; {rowData.numeroDoc}
                </div>
                <div className="field">
                    <b>Ident:</b>&nbsp; {rowData.client.identification}
                </div>
                <div className="field">
                    <b>Nombre:</b>&nbsp; {rowData.client.firstName}
                </div>
                <div className="field">
                    <b>Servicion:</b>&nbsp; {rowData.service}
                </div>
            </React.Fragment>
        );
    };

    const showDLGVL = () => {
        setDialogVL(true);
    };

    const hideDLGVL = () => {
        setDialogVL(false);
    };

    /*
Inner Components
*/
    let tblLisOrderVL = (
        <DataTable
            value={lstOrders}
            /*
        selectionMode="single"
        selection={selOrderDetail}
        onSelectionChange={(e) => setSelOrderDetail(e.value)}
        onRowSelect={onRowSelect}
        onRowUnselect={onRowUnselect}
        */
            dataKey="code"
            ref={dt}
            responsiveLayout="stack"
            scrollable
            scrollHeight="380px"
            style={{ width: "auto" }}
            virtualScrollerOptions={{ itemSize: 46 }}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last}, de {totalRecords}"
        >
            <Column
                header="Secuencia"
                field="jdeOrderId"
                style={{
                    textAlign: "center",
                    width: "9%",
                    fontSize: "12px",
                }}
                // sortable={true}
            ></Column>
            <Column
                header="Tipo"
                field="jdeOrderType.code"
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "12px",
                }}
            ></Column>
            <Column
                header="Estado"
                field="status"
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "12px",
                }}
            ></Column>
            <Column
                header="Detalle"
                field="client"
                body={tmpCliente}
                style={{
                    textAlign: "left",
                    width: "10%",
                    fontSize: "10px",
                }}
            ></Column>
            <Column
                header="Fecha"
                field="fecha"
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "12px",
                }}
            ></Column>
        </DataTable>
    );

    /*
  Return
  */
    return (
        <>
            {" "}
            <div className="p-fluid p-grid">
                <div className="col-12 xl:col-12">
                    <div className="card">
                        <h5>
                            <b>Lista de VLS</b>
                        </h5>{" "}
                        <div className="field">
                            {" "}
                            <Button label="Agregar VL" className="p-button-rounded p-button-info mr-2" style={{ width: "20%" }} onClick={() => showDLGVL()} />
                        </div>
                        <br></br>
                        <div className="col-12 xl:col-12">{tblLisOrderVL}</div>
                    </div>
                </div>
            </div>
            <Dialog visible={dialogVL} style={{ width: "500px" }} header="Crear VL" modal className="p-fluid" onHide={hideDLGVL}>
                <div className="field">
                    <b>Numero Doc:</b>&nbsp; <InputText value={value1} onChange={(e) => setValue1(e.target.value)} />
                </div>
                <div className="field">
                    <b>Nombre Cliente:</b>&nbsp; <InputText value={value2} onChange={(e) => setValue2(e.target.value)} />
                </div>
                <div className="field">
                    <b>Ind Cliente: </b>&nbsp; <InputText value={value3} onChange={(e) => setValue3(e.target.value)} />
                </div>
                <div className="field">
                    Fecha: <Calendar id="basic" value={date1} onChange={(e) => setDate1(e.value)} />
                </div>
                <hr></hr>
                <div className="col-12">
                    <Checkbox inputId="cb1" value="Corte" onChange={true} checked={true}></Checkbox>
                    <label htmlFor="cb1" className="p-checkbox-label">
                        Corte
                    </label>
                </div>
                <div className="col-12">
                    <Checkbox inputId="cb2" value="Ruteado" checked={checked} onChange={(e) => setChecked(e.checked)}></Checkbox>
                    <label htmlFor="cb2" className="p-checkbox-label">
                        Ruteado
                    </label>
                </div>
                <div className="col-12">
                    <Checkbox inputId="cb3" value="Enchapado" checked={checked} onChange={(e) => setChecked(e.checked)}></Checkbox>
                    <label htmlFor="cb3" className="p-checkbox-label">
                        Enchapado
                    </label>
                </div>
                <div className="col-12">
                    <Checkbox inputId="cb3" value="Perforado" checked={checked} onChange={(e) => setChecked(e.checked)}></Checkbox>
                    <label htmlFor="cb3" className="p-checkbox-label">
                        Perforado
                    </label>
                </div>

                <div className="field">
                    <Button label="Generar VL" className="p-button-rounded p-button-info mr-2" onClick={() => hideDLGVL()} />
                </div>
            </Dialog>
        </>
    );
});
