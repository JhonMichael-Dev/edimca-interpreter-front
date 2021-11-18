import { observable, action, decorate, extendObservable } from "mobx";
//import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { persist } from "mobx-persist";
import OrderDataService from "./service/OrderDataService";
import CustomerDataService from "./service/CustomerDataService";
import JdeF0005DataService from "./service/JdeF0005DataService";
import ProductStockDataService from "./service/ProductStockDataService";
import OrderStatusDataService from "./service/OrderStatusDataService";
import { round } from "./component/Utils";
import { decimalFormatter } from "./component/Utils";
import UserPosDataService from "./service/UserPosDataService";
// import PDFDataService from "./service/PDFDataService";
// import printJS from "print-js";

class PosStore {
    user = null;
    history = null;
    customer = null;
    customerValidData = true; // dparedes 20200818
    customerValidDataLog = ""; // dparedes 20200922
    order = null;
    loading = false;
    processingOrder = false;
    message = null;
    creditCustomer = null;
    ordComment = null;
    status = false;
    cashFront = null;
    orderStatus = false;
    lstCashBalanceDetail = [];
    orderHasEmptyProduct = false;
    boolOrderPriceChange = false;
    orderPrint = null;
    countBilling = 0;
    countReBilling = 0;
    countInvoicing = 0;
    countCreateOrder = 0;
    countLiberado = 0;
    ordersProcessingLog = null;

    constructor(prop) {
        this.setCustomerValidData();
        extendObservable(this, {
            prop,
        });
    }

    setCustomerValidData = () => {
        if (this.customer == null) {
            this.customerValidData = true; // dparedes 20201029 (enable to select products with no client)
            //this.customerValidData = false;
        } else {
            CustomerDataService.postValid(this.customer).then((response) => {
                //console.log("setCustomerValidData");
                //console.log(response.data);
                this.customerValidData = response.data && response.data.valid;
                /*
        if(response.data && response.data.valid){
          this.customerValidDataLog = ''
        }
        */
            });
        }
    };

    setUserCash = (param) => {
        //console.log("enter set user cash");
        //console.log(param);
        let cashUserDto = {
            mcu: param.mcu,
            user: this.user.username,
        };

        UserPosDataService.userCashByStore(cashUserDto).then((response) => {
            if (response && response.data) {
                //console.log(response.data);
                if (!response.data.success) {
                    this.updateMessage({
                        text: "error en asignar caja: \n" + response.data.log,
                        header: "Advertencia",
                        className: "modal-sm warning-modal",
                        warning: true,
                    });
                } else {
                    //console.log(response.data);
                    this.cashFront = response.data.obj;
                }
            }
        });

        //this.user.cash = param;
    };

    setBoolOrderPriceChange = (boolOrderPriceChange0) => {
        this.boolOrderPriceChange = boolOrderPriceChange0;
    };

    // YW: If order type is VR and is changing price
    isVRPriceChange = () => {
        if (this.order && this.order.jdeOrderType) {
            if (this.order.jdeOrderType.code === "VR" && this.boolOrderPriceChange) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    };

    isAuthenticated = () => {
        //alert(JSON.stringify(this));
        //alert(this.user ? true : false);
        return this.user ? true : false;
    };

    isSelectedCustomer = () => {
        return this.customer && this.customer.idClient ? true : false;
    };

    getCreditCustomerStatus = () => {
        if (!this.creditCustomer) {
            return "R";
        }
        if (this.creditCustomer && !this.creditCustomer.creditHoldExempt) {
            /*
      if (this.creditCustomer.orderOnHold) {
        return "R";
      } else if (this.creditCustomer.cxcBlocking) {
        return "CXC";
      }
      */
            if (this.creditCustomer.cxcBlocking) {
                return "CXC";
            } else if (this.creditCustomer.orderOnHold) {
                return "R";
            }
        } else if (this.creditCustomer.cxcBlocking) {
            return "CXC";
        }
        return "G";
    };

    getCreditCustomerStatusIsBlocking = () => {
        return (
            this.getCreditCustomerStatus() === "R" || this.getCreditCustomerStatus() === "CXC"
            //this.getCreditCustomerStatus() === "CXC"
        );
    };

    getCustomerStatusUnableToBilling = () => {
        return (
            !this.customerValidData ||
            //(this.creditCustomer && this.getCreditCustomerStatusIsBlocking())
            (this.creditCustomer && this.getCreditCustomerStatus() === "CXC")
        );
    };

    /*
  getCreditCustomer = () => {
    return this.creditCustomer;
  };
  */

    setHistory = (history) => {
        this.history = history;
    };

    setStatus = (status) => {
        this.status = status;
    };

    setCustomer = (cus0) => {
        this.customer = cus0;
        // dparedes 20200818
        this.setCustomerValidData();
        this.setProcessingOrder(false);
    };

    setOrderComment = (ordComment) => {
        this.ordComment = ordComment;
    };

    setCreditCustomer = (credCus0) => {
        //console.log(this);

        this.creditCustomer = credCus0;
    };

    setOrdersProcessingLog = (obj) => {
        this.ordersProcessingLog = obj;
    };

    isOrderProcessingLogHasLogMessage = () => {
        return this.orderProcessingLog && !this.orderProcessingLog.success;
    };

    isOrderProcessingLogHasBlockProcess = () => {
        return this.isOrderProcessingLogHasLogMessage() && this.ordersProcessingLog.obj.blockProcess;
    };

    setCustomerOrder = (cus0) => {
        //console.log(this);
        if (this.order) {
            this.order.client = cus0;
        }
    };

    setUserPosOrder = (userPos0) => {
        //console.log(this);
        if (this.order) {
            this.order.userpos = userPos0;
        }
    };

    remCustomer = () => {
        this.customer = null;
        this.setCustomerValidData();
        this.setProcessingOrder(false);
        this.creditCustomer = null;
        this.orderDocTypes = null;
        this.order = null;
        this.ordComment = null;
        this.countBilling = 0;
        this.countReBilling = 0;
        this.countLiberado = 0;
        // this.cancelOrder();
        if (window.location.hash === "#/order") {
            this.setStatus(true);
        }
    };

    remOnlyCustomer = () => {
        this.setLoading(true);
        //console.log("remOnlyCustomer");
        this.customer = null;
        this.setCustomerValidData();
        this.setProcessingOrder(false);
        this.creditCustomer = null;
        this.orderDocTypes = null;
        //this.order = null;
        //this.ordComment = null;
        // this.cancelOrder();

        // Audit who remove client from order
        if (this.order && this.order.idOrder) {
            OrderDataService.getById(this.order.idOrder).then(async (response) => {
                if (response && response.data) {
                    // Order audit // dparedes 20201219
                    let orderAuditDto = {
                        posOrderId: response.data.id,
                        status: "AUDIT_ORDER_REMOVE_CLIENT",
                        user: this.user.username,
                    };
                    OrderStatusDataService.createOrderStatusDetail(orderAuditDto).then((response1) => {
                        if (response1) {
                        }
                    });
                }
            });
        }

        let ebmDto = {
            obj: this.order,
            user: this.user.username,
            originModule: "POS_FRONT",
        };

        OrderDataService.removeClientPlusRecalcPrices(ebmDto).then((response) => {
            if (response && response.data) {
                //console.log(response.data);
                if (!response.data.success) {
                    this.updateMessage({
                        text: "No se pudo quitar cliente de la orden, error: \n" + response.data.log,
                        header: "Advertencia",
                        className: "modal-sm warning-modal",
                        warning: true,
                    });
                } else {
                    this.setOrder(response.data.obj);
                    this.order.type = response.data.obj.jdeOrderType ? response.data.obj.jdeOrderType.code : null;
                }
            }
            this.setLoading(false);
        });
        //this.setLoading(false);
    };

    setUser = (param) => {
        //window.sessionStorage.setItem("auth", JSON.stringify(param));
        this.user = param;
        //this.history.push("/home");
        //console.log("setUserStore_0");
        //console.log(this.user.mcu);
    };

    pushHome = () => {
        this.history.push("/home");
    };

    setUserStore = (param) => {
        //window.sessionStorage.setItem("auth", JSON.stringify(param));
        //console.log("setUserStore_1");
        //console.log(this.user.store.mcu);
        this.user.store = param;
        //console.log("setUserStore_2");
        //console.log(this.user.store.mcu);
        //this.history.push("/home");
    };

    remAuth = () => {
        //window.sessionStorage.setItem("auth", JSON.stringify(param));
        this.user = null;
        this.customer = null;
        this.setCustomerValidData();
        this.creditCustomer = null;
        this.orderDocTypes = null;
        this.order = null;
        window.location.href = "/login";
    };

    setOrder = (order0) => {
        //console.log(order0);
        this.order = order0;
    };

    setOrderPrint = (order0) => {
        //console.log(order0);
        this.orderPrint = order0;
    };

    setLoading = (loading0) => {
        this.loading = loading0;
    };

    setProcessingOrder = (processingOrder0) => {
        this.processingOrder = processingOrder0;
    };

    setCountBilling = (countBilling0) => {
        //console.log(order0);
        this.countBilling = countBilling0;
    };
    setCountReBilling = (countReBilling0) => {
        //console.log(order0);
        this.countReBilling = countReBilling0;
    };
    setCountInvoicing = (countInvoicing0) => {
        //console.log(order0);
        this.countInvoicing = countInvoicing0;
    };
    setCountCreateOrder = (countCreateOrder0) => {
        //console.log(order0);
        this.countCreateOrder = countCreateOrder0;
    };
    setCountLiberado = (countLiberado0) => {
        //console.log(order0);
        this.countLiberado = countLiberado0;
    };

    handleDelivery = () => {
        OrderDataService.orderDeliveryDate(this.order).then((response) => {
            if (response && response.data) {
                this.setOrder(response.data.obj);
                this.order.type = response.data.obj.jdeOrderType.code;
            }
        });
    };

    isOrderSpecial = () => {
        if (this.order && this.order.jdeOrderType) {
            if (this.order.jdeOrderType.code === "VP" || (this.order.jdeOrderType.code === "VD" && this.order.specialOrder)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };
    isOrderSpecialOrderPrint = () => {
        if (this.orderPrint && this.orderPrint.jdeOrderType) {
            if (this.orderPrint.jdeOrderType.code === "VP" || (this.orderPrint.jdeOrderType.code === "VD" && this.orderPrint.specialOrder)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    isOrderRePrint = () => {
        if (this.orderPrint && this.orderPrint.firstPrintDate) {
            return true;
        } else {
            return false;
        }
    };

    cancelOrder = () => {
        if (this.order) {
            if (this.order.status === "C2" || this.order.status === "M2" || this.order.status === "MN" || this.order.status === "RECAUDADO" || this.order.status === "RETENIDO" || this.order.status === "LIBERADO") {
                this.order = null;
            } else {
                let ebmDto = {
                    obj: this.order,
                    user: this.user.username,
                    originModule: "POS_FRONT",
                };

                //OrderDataService.cancel(this.order.id).then((response) => {
                OrderDataService.cancel(ebmDto).then((response) => {
                    if (response && response.data) {
                        //console.log("cancel order response");
                        //console.log(response.data);
                        if (!response.data.sucess) {
                            if (response.data.log) {
                                this.updateMessage({
                                    text: response.data.log,
                                    danger: "true",
                                });
                            }
                        }
                        this.order = null;

                        // window.location.reload(true);
                    }
                });
            }
            this.customer = null;
            this.setCustomerValidData();
            this.orderDocTypes = null;
            this.creditCustomer = null;
        }
    };

    updateMessage = (obj) => {
        this.message = obj;
    };

    isOrderWithoutStock = () => {
        if (this.order && this.order.lstOrderDetail) {
            return this.order.lstOrderDetail.some((od0) => {
                return od0.quantityStock < od0.quantity;
            });
        }
        return true;
    };

    isPaymentWithoutDuplicate = () => {
        if (this.order && this.order.lstPaymentDetail) {
            //console.log(this.order);
            let isSpecialCredit = false;
            let isValidC1 = true;
            let isValidC2 = true;
            //console.log(this.order.lstPaymentDetail.length);
            this.order.lstPaymentDetail.map((obj) => {
                if (obj.paymentMethod.code === "C1" || obj.paymentMethod.code === "C2") {
                    //console.log("hay credito contra entrega");
                    isSpecialCredit = true;
                }
                //console.log(obj);
            });
            let arr0 = this.order.lstPaymentDetail.filter((obj1) => obj1.paymentMethod.code === "C1" || obj1.paymentMethod.code === "C2");
            let arrC1 = this.order.lstPaymentDetail.filter((obj1) => obj1.paymentMethod.code === "C1");
            let arrC2 = this.order.lstPaymentDetail.filter((obj1) => obj1.paymentMethod.code === "C2");
            /*if (arrC1.length > 0) {
        if (this.order.total > 500) {
          isValidC1 = false;
        }
      }
      if (arrC2.length > 0) {
        if (this.order.total > 4000) {
          isValidC2 = false;
        }
      }*/
            // Si la orden tiene mas de 1 metodo de pago
            if (isSpecialCredit && this.order.lstPaymentDetail.length > 1) {
                // Si existe C1 y C2 al mismo tiempo
                if (arr0.length > 1 && isSpecialCredit) {
                    return false;
                } else {
                    return true;
                    /*if (isValidC1 && isValidC2) {
            return true;
          } else {
            return false;
          }*/
                }
            }
            // Cuando la orden solo tiene 1 metodo de pago
            else {
                if (isValidC1 && isValidC2) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    };

    // YW: Consumidor final y total orden
    isFinalConsumerBillable = () => {
        if (this.order && this.order.client && this.order.total) {
            //this.user.role.includes("EDMVT")
            //console.log(this.order.client);
            if (this.order.client.fullName.toUpperCase().includes("CONSUMIDOR FINAL")) {
                if (decimalFormatter(this.order.total) > 5) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        } else {
            return true;
        }
    };

    isProductWithoutStock = () => {
        let finalValue;
        if (this.order && this.order.lstOrderDetail) {
            this.order.lstOrderDetail.map((obj) => {
                if (obj.quantityStock < obj.quantity && !(obj.product.jdeLineType.code === "WP" || obj.product.jdeLineType.code === "N" || obj.product.jdeLineType.code === "W")) {
                    finalValue = true;
                }
            });
        }

        if (finalValue) {
            return false;
        } else {
            return true;
        }
    };

    isOrderEmpty = () => {
        return !(this.order && this.order.lstOrderDetail && this.order.lstOrderDetail.length > 0 ? true : false);
    };

    isValidOrderServices = () => {
        if (this.order.containsServices) {
            return this.order.lstOrderDetail.filter((odX) => !odX.productAService).filter((odX) => odX.markAsService).length >= 1;
        }
        return true;
    };

    selectCustomer = async (cus0) => {
        // this.setCustomer(cus0);
        this.setLoading(true);

        if (this.order && !this.order.client) {
            this.setCustomerOrder(cus0);
            await OrderDataService.update(this.order).then((response) => {
                if (response && response.data) {
                    this.setOrder(response.data);
                }
            });
        }
        if (cus0) {
            let obj0 = {
                an8: cus0.jdeAn8,
                mcu: "    " + this.user.store.mcu,
            };
            await CustomerDataService.postCredit(obj0).then(async (response) => {
                if (response && response.data && response.data.success) {
                    //console.log(response.data);
                    await this.setCreditCustomer(response.data.obj);
                    if (this.getCreditCustomerStatus() === "R") {
                        this.updateMessage({
                            text: "Cliente en C2, por favor comuniquese con Cartera.",
                            header: "Advertencia",
                            className: "modal-sm warning-modal",
                            warning: true,
                        });
                    } else if (this.getCreditCustomerStatus() === "CXC") {
                        this.updateMessage({
                            text: this.creditCustomer.cxcBlockingLog,
                            header: "Advertencia",
                            className: "modal-sm warning-modal",
                            warning: true,
                        });
                    }
                    await this.loadDocumentTypes(this.creditCustomer.orderOnHold);
                }
                this.setLoading(false);
            });

            // dparedes 20210406
            await this.validOrdersOnProcessOrErrorForSameClient(cus0);
        }
        this.setCustomer(cus0);
    };

    validOrdersOnProcessOrErrorForSameClient = async (param) => {
        this.setLoading(true);
        if (param) {
            let payload = {
                clientAn8: param.jdeAn8,
            };
            await OrderDataService.validOrdersOnProcessOrErrorForSameClient(payload).then(async (response) => {
                await this.setOrdersProcessingLog(response.data);
                if (!response.data.success && response.data.obj.showWarning) {
                    this.updateMessage({
                        text: response.data.log,
                        header: "Advertencia",
                        className: "modal-sm warning-modal",
                        warning: true,
                    });
                }
            });
        }
        this.setLoading(false);
    };

    loadDocumentTypes = async (param) => {
        let searchDto = {
            mcu: this.user.store.mcu,
            obj: param,
        };
        JdeF0005DataService.getOrderDocType(searchDto).then((response) => {
            //console.log(response.data);
            let data = response.data.map((purchaseDestinationOption, idx) => {
                return {
                    label: purchaseDestinationOption.code,
                    value: purchaseDestinationOption.code,
                };
            });
            this.orderDocTypes = data;
        });
    };

    getWarehouseList = async (param) => {
        let qntyValue0 = null;
        //console.log(this.state.optSearch);
        qntyValue0 = 999999999;
        let obj1 = {
            mcu: this.user.store.mcu,
            quickSearch: param,
            excludeMcu: true,
            prodStockQnty: qntyValue0,
        };
        ProductStockDataService.quickSearchWarehouse(obj1)
            .then((response) => {
                if (response && response.data) {
                    //console.log("Response Warehouse");
                    //console.log(response.data);
                    let arr0 = response.data.filter((warehouseDetail) => {
                        return warehouseDetail.selectable;
                    });

                    let data = arr0.map((warehouseOption, idx) => {
                        return {
                            label: warehouseOption.storeName,
                            value: warehouseOption.store,
                        };
                    });

                    this.orderWarehouseTypes = data;
                    //console.log("Warehouse Types");
                    //console.log(this.orderWarehouseTypes);
                }
            })
            .finally(() => {});
    };

    isOrderToBilling = () => {
        if (this.order && this.order.jdeOrderType) {
            return (
                this.isSelectedCustomer() &&
                !this.isOrderEmpty() &&
                !this.isVRPriceChange() &&
                this.isValidOrderServices() &&
                this.order.jdeOrderType.code &&
                !this.order.invalidDocType &&
                //this.order.status != "FACTURADO" &&
                (this.isProductWithoutStock() || this.isOrderSpecial())
            );
        } else {
            return this.isSelectedCustomer() && !this.isOrderEmpty() && !this.isVRPriceChange() && this.isValidOrderServices() && this.order.jdeOrderType && !this.order.invalidDocType && (this.isProductWithoutStock() || this.isOrderSpecial());
        }
    };

    isOrderInvoiced = () => {
        return this.getOrderStatus();
    };

    getOrderStatus = async () => {
        if (this.order) {
            await OrderDataService.getOrderStatusById(this.order.id).then((response) => {
                if (response && response.data) {
                    //console.log(response.data);
                    if (response.data === "FACTURADO") {
                        this.orderStatus = true;
                        return true;
                    } else {
                        this.orderStatus = false;
                        return false;
                    }
                }
            });
        } else {
            this.orderStatus = false;
            return false;
        }
    };
    messageOrderToBilling = () => {
        let strMess0 = "";
        if (this.getCustomerStatusUnableToBilling()) {
            if (!this.isSelectedCustomer()) {
                strMess0 += "Seleccionar cliente" + String.fromCharCode(10);
            } else if (!this.customerValidData) {
                strMess0 += "Para continuar debe completar los datos del cliente." + String.fromCharCode(10);
            }
            if (this.getCreditCustomerStatusIsBlocking()) {
                strMess0 += this.creditCustomer ? this.creditCustomer.cxcBlockingLog + String.fromCharCode(10) : "";
            }
        }
        if (this.isVRPriceChange()) strMess0 += " Orden Tipo VR no puede modificar precio ";
        if (!this.isFinalConsumerBillable()) strMess0 += " Consumidor Final supera los 5 dólares, seleccione otro cliente ";

        if (this.isOrderEmpty()) strMess0 += "Seleccionar al menos un producto" + String.fromCharCode(10);
        if (!this.order.jdeOrderType) strMess0 += "Seleccionar el tipo de documento" + String.fromCharCode(10);
        if (this.order.invalidDocType) {
            strMess0 += "Detalle de orden invalida para el tipo de documento seleccionado" + String.fromCharCode(10);
            return strMess0;
        }
        if (this.order.status === "FACTURADO") {
            strMess0 += "No se puede recaudar orden facturada";
        }
        if (!this.isValidOrderServices()) strMess0 += "Marcar al menos un producto para los servicios" + String.fromCharCode(10);
        return strMess0;
    };

    isApproverUser = () => {
        if (this.user && this.user.role) {
            if (this.user.role.includes("EDMVT") || this.user.role.includes("EDMJS")) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    getOrderTotalPending = () => {
        if (this.order) {
            let arr0 = [...this.order.lstPaymentDetail];
            let sum0 = arr0.reduce((a, b) => {
                return a + b.value;
            }, 0);
            sum0 = round(sum0);
            //return round(this.order.total - sum0);
            let totalRounded = round(this.order.total);
            return round(totalRounded - sum0);
        }
        return -1;
    };
}

export default decorate(new PosStore(), {
    user: [persist("object"), observable],
    cashFront: [persist("object"), observable],
    // history: [observable],
    // customer: [observable],
    // order: [observable],
    countBilling: [persist("object"), observable],
    countReBilling: [persist("object"), observable],
    countInvoicing: [persist("object"), observable],
    countCreateOrder: [persist("object"), observable],
    countLiberado: [persist("object"), observable],
    history: [persist("object"), observable],
    customer: [persist("object"), observable],
    customerValidData: [persist("object"), observable],
    order: [persist("object"), observable],
    processingOrder: [persist("object"), observable],
    orderPrint: [persist("object"), observable],
    creditCustomer: [persist("object"), observable],
    status: [persist("object"), observable],
    ordComment: [persist("object"), observable],
    orderDocTypes: [persist("object"), observable],
    boolOrderPriceChange: [persist("object"), observable],
    orderWarehouseTypes: [persist("object"), observable],
    orderHasEmptyProduct: [persist("object"), observable],
    loading: [observable],
    orderStatus: [observable],
    message: [observable],

    isAuthenticated: action,
    setCustomer: action,
    isOrderInvoiced: action,
    setCreditCustomer: action,
    getCreditCustomerStatus: action,
    getCreditCustomerStatusIsBlocking: action,
    getCustomerStatusUnableToBilling: action,
    //getCreditCustomer: action,
    setCustomerOrder: action,
    setUserPosOrder: action,
    remCustomer: action,
    remOnlyCustomer: action,
    setHistory: action,
    setUser: action,
    setUserStore: action,
    setUserCash: action,
    pushHome: action,
    remAuth: action,
    setOrder: action,
    setOrderPrint: action,
    isProductWithoutStock: action,
    setLoading: action,
    setProcessingOrder: action,
    setStatus: action,
    setBoolOrderPriceChange: action,
    setOrderComment: action,
    cancelOrder: action,
    handleDelivery: action,
    isOrderSpecial: action,
    selectCustomer: action,
});
