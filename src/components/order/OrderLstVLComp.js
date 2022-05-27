import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
// Prime components
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Badge } from "primereact/badge";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
// Services
import OrderDataService from "../../service/OrderDataService";
import { useDataStore } from "../../data/DataStoreContext";
import MachineryDataService from "../../service/MachineryDataService";
// Components
import { LoginPrincipalComp } from "../login/LoginPrincipalComp";
import { MachineryIconComp } from "../machinery/MachineryIconComp";

export const OrderLstVLComp = observer((props) => {
    /*
    Variables
    */
    const [selLstOrdersVL, setSelLstOrdersV] = useState(null);
    const dt = useRef(null);
    const [lstOrders, setLstOrders] = useState([]);
    const [lstProducts, setLstProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [dialogVL, setDialogVL] = useState(false);
    const [dialogAlert, setDialogAlert] = useState(false);
    const [dialogAlertDocumentNumber, setDialogAlertDocumentNumber] = useState(false);
    const [date, setDate] = useState(null);
    const [documentNumber, setDocumentNumber] = useState("");
    const [selectedService, setSelectedService] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [machineryTypes, setMachineryType] = useState([]);
    const [quantityRequest, setQuantityRequest] = useState(0);

    const toast = useRef(null);
    /*
    Store
    */
    const dataStore = useDataStore();

    /*
    Init
    */
    useEffect(() => {
        if (selLstOrdersVL) {
            loadAvailables();
        }
    }, [selLstOrdersVL]);
    /*
    Formats
    */

    /*
    Methods
    */
    const loadAvailables = () => {

        MachineryDataService.getServiceType().then((valid) => {
            setMachineryType(valid.data);

        });

        let payload = {
            mcu: dataStore.authPrincipalUser.store.mcu,
            type: "VL"
        }
        
        OrderDataService.queryOrdersByMcuAndType(payload).then((valid) => {
            //console.log("valid: " + valid.data.obj.length);
            setLstOrders(valid.data.obj);
        });
    };

    const showDLGVL = () => {
        setDialogVL(true);
    };

    const validDocumentNumber = () => {
        let exist = false;
        lstOrders.map((order) =>{
            //console.log("numero documento: " + order.jdeInvoiceNumber + " documentNumber: " + documentNumber);
            if(order.jdeInvoiceNumber === documentNumber)
                exist = true;
        });
        if(!exist){
            saveOrder();
        }else{
            setDialogAlertDocumentNumber(true);
        }
    }

    const setDefault = () => {
        setDialogVL(false);
        setDocumentNumber("");
        setDate(null);
    }

    const saveOrder = () => {
        let lstWorkingOrder = [];
        products.map((product) => {
            let workingOrder = {
                jdeProductCode: product.product,
                jdeServiceType: product.serviceType,
                status: "CREADO",
                jdeStoreMcu: dataStore.authPrincipalUser.store.mcu,
                quantityRequested: product.quantityRequest
            }
            lstWorkingOrder.push(workingOrder);
        });

        let order = {
            status: "PENDIENTE",
            priority: "NORMAL",
            jdeOrderTypeCode: "VL",
            userposUsername: dataStore.authPrincipalUser.username,
            jdeStoreMcu: dataStore.authPrincipalUser.store.mcu,
            transactionDate: date,
            jdeInvoiceNumber: documentNumber,
            lstWorkingOrder: lstWorkingOrder
        }
        OrderDataService.createOrder(order).then((valid) => {
            //Actualización lista de VLs por mcu
            loadAvailables();
        });
        setDefault();
    };

    const hideDLGVL = () => {
        setDialogVL(false);
        setDocumentNumber("");
        setDate(null);
        setProducts([]);
    };

    const hideDlgService = () => {
        setSelectedService(null);
        setQuantityRequest(0);
        setSelectedProduct(null);
    };

    const addService = () => {
        let exist = false;
        let _products = [...products];
        _products.map((product) => {
            //console.log("product.code: " + product.product + " selectedProduct.code: " + selectedProduct.code);
            if(product.product === selectedProduct.code)
                exist = true;
        });
        if (!exist) {
            let product = {
                product: selectedProduct.code,
                serviceType: selectedProduct.serviceType.description1,
                quantityRequest: quantityRequest
            }
            _products.push(product);
            setProducts(_products);
        }else{
            setDialogAlert(true);
        }
        hideDlgService();
    }

    const onClickService = (service) => {
        let searchDto = {
            originalType: service.skill
        };

        MachineryDataService.productsByServiceType(searchDto).then((valid) => {
            //console.log("products: " + valid.data.obj.products);
            setLstProducts(valid.data.obj.products);
        });
        setSelectedService(service.skill);
    };

    const onProductChange = (e) => {
        setSelectedProduct(e.value);
    }

    const statusProducciom = (rowData) => {
        return (
            <React.Fragment>
                <div className="p-button-rounded p-button-info mr-2 ">
                    <Badge value={rowData.status} severity="info" className="p-mr-2"></Badge>
                </div>
            </React.Fragment>
        );
    };

    const handleSelectUser = (ev) => {
        dataStore.setAuthPrincipalUser(ev);
        setSelLstOrdersV(ev);
    };

    const deleteService = (rowData) => {
        let _products = products.filter(product => product !== rowData);
        setProducts(_products);
    };

    /*
    Inner Components
    */

    const workingOrderDetail = (rowData) => {
        return (
            <React.Fragment>
                <div className="field">
                    <b>Prioridad: </b>&nbsp; {rowData.priority}
                </div>
                <div className="field">
                    <b>Usuario:</b>&nbsp; {rowData.userposUsername}
                </div>
                
            </React.Fragment>
        );
    };


    const workingOrderDate = (rowData) => {
        var date = new Date(rowData.transactionDate);
        let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        return (
            <div className="field">
                <b>{formatted_date}</b>
            </div>
        );
    }

    let tblLisOrderVL = (
        <DataTable
            value={lstOrders}
            dataKey="id"
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
                header="N° Orden"
                field="idOrder"
                style={{
                    textAlign: "center",
                    width: "9%",
                    fontSize: "12px",
                }}
            />
            <Column
                header="N° Factura"
                field="jdeInvoiceNumber"
                style={{
                    textAlign: "center",
                    width: "9%",
                    fontSize: "12px",
                }}
            />
            <Column
                header="Tipo"
                field="jdeOrderTypeCode"
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "12px",
                }}
            ></Column>
            <Column
                header="Estado"
                body={statusProducciom}
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "12px",
                }}
            ></Column>
            <Column
                header="Detalle"
                body={workingOrderDetail}
                style={{
                    textAlign: "left",
                    width: "10%",
                    fontSize: "10px",
                }}
            ></Column>
            <Column
                header="Fecha"
                body={workingOrderDate}
                style={{
                    textAlign: "center",
                    width: "10%",
                    fontSize: "12px",
                }}
            ></Column>
        </DataTable>
    );

    const productOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{`${option.code} - ${option.description1}`}</div>
            </div>
        );
    }

    let buttonDelete = (rowData) =>{
        return(
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" aria-label="Cancel" onClick={() => deleteService(rowData)}/>
        );
    }

    let loginPrincipalComp = !dataStore.authPrincipalUser || !selLstOrdersVL ? <LoginPrincipalComp setSelPrincipalUser={(ev) => handleSelectUser(ev)} username={dataStore.authPrincipalUser ? dataStore.authPrincipalUser.username : null} /> : "";

    /*
    Return
    */
    return (
        <>
            <Toast ref={toast} style={{ alignItems: "left", alignContent: "left", top: "60px" }} />
            {loginPrincipalComp}
            <div className="p-fluid p-grid">
                <div className="col-12 xl:col-12">
                    <div className="card">
                            <b>Lista de VLS (Ordenes Manuales)</b>
                        <div className="field">
                            <Button label="Agregar VL" className="p-button-rounded p-button-info mr-2" style={{ width: "20%", marginTop: "1%" }} onClick={() => showDLGVL()} />
                        </div>
                        <br></br>
                        <div className="col-12 xl:col-12">{tblLisOrderVL}</div>
                    </div>
                </div>
            </div>
            <Dialog visible={dialogVL} style={{ width: "50%" }} header="Crear VL" modal className="p-fluid" onHide={hideDLGVL} draggable={false}>
                <div className="grid">
                    <div className="col-6">
                        <div className="field">
                            <b>Número Documento:</b>&nbsp;
                            <InputMask focus id="basic" mask="999-999-999999999" value={documentNumber} placeholder="000-000-000000000" onChange={(e) => setDocumentNumber(e.value)} />
                        </div>

                    </div>
                    <div className="col-6 field">
                        <div className="field">
                            <b>Fecha:</b>&nbsp;
                            <Calendar id="basic" placeholder="dd/mm/yy" value={date} onChange={(e) => setDate(e.value)} dateFormat={"dd/mm/yy"} />
                        </div>
                    </div>
                </div>
                <div className="grid">
                        {
                            machineryTypes.map((x) => {
                                return (
                                    <div className="col-3">
                                        <button type="button" className="p-link" style={{ boxShadow: "none" }} onClick={() => onClickService(x)}>
                                            <MachineryIconComp machineryData={x.skill} type={"service"} width={"30px"} height={"30px"} />
                                        </button>
                                    </div>
                                );
                            })
                    }
                </div>
                <div className="card">
                    <DataTable 
                        value={products} 
                        responsiveLayout="scroll" 
                        emptyMessage={"No hay servicios"}
                        scrollable
                        scrollHeight="180px">
                        <Column field="product" header="Servicios" />
                        <Column field="quantityRequest" header="Cantidad" />
                        <Column header="Opción" body={buttonDelete}/>
                    </DataTable>
                </div>

                <div className="field">
                    <Button
                        label="Generar VL"
                        className="p-button-rounded p-button-info mr-2"
                        onClick={() => validDocumentNumber()}
                        disabled={documentNumber.length > 0 && date != null && products.length > 0 ? false : true} />
                </div>
            </Dialog>

            <Dialog
                visible={selectedService ? true : false}
                style={{ width: "40%" }}
                header="Detalles del servicio"
                modal
                className="p-fluid"
                onHide={hideDlgService}
                draggable={false}
            >
                <div className="grid">
                    <div className="col-4">
                        <MachineryIconComp machineryData={selectedService ? selectedService : ""} type={"service"} width={"40px"} height={"40px"} />
                    </div>
                    <div className="col-8">
                        <div className="card">
                            <div className="grid">
                                <div className="col-12">
                                    <div className="grid">
                                        <div className="col-4">
                                            <label htmlFor="minmax">Cantidad:</label>
                                        </div>
                                        <div className="field col-5">
                                            <InputNumber value={quantityRequest} onValueChange={(e) => setQuantityRequest(e.value)}
                                                min={0} max={100} showButtons mode="decimal"
                                                style={{ height: "23px", textAlign: "center" }}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className="col-12">
                                    <div className="grid">
                                        <div className="col-4">
                                            <label htmlFor="minmax">Servicio:</label>
                                        </div>
                                        <div className="field col-8">
                                            <Dropdown
                                                value={selectedProduct}
                                                options={lstProducts}
                                                onChange={onProductChange}
                                                optionLabel="code"
                                                filter showClear
                                                filterBy="code,description1"
                                                placeholder="Selección"
                                                itemTemplate={productOptionTemplate}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field" style={{ display: "contents" }}>
                        <Button label="Agregar Servicio" className="p-button-rounded p-button-info mr-2" onClick={() => addService()} />
                    </div>
                </div>
            </Dialog>
            <Dialog visible={dialogAlert} style={{ width: "20%" }} header="Alerta" modal className="p-fluid" onHide={() => setDialogAlert(false)} draggable={false}>
                <Message severity="warn" text="El servicio ya se encuentra en la lista de servicios." />
            </Dialog>
            <Dialog visible={dialogAlertDocumentNumber} style={{ width: "20%" }} header="Alerta" modal className="p-fluid" onHide={() => setDialogAlertDocumentNumber(false)} draggable={false}>
                <Message severity="warn" text="El número de documento ya se encuentra registrado en otra orden." />
            </Dialog>
        </>
    );
});
