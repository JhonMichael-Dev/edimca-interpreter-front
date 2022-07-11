import React, { useEffect, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";

// Services
import FileStorageService from "../service/FileStorageService";

export const Dashboard = () => {
    /*
    Variables
    */
    const [leptonFile, setLeptonFile] = useState(null);
    const [fileName, setFileName] = useState();
    const [translate, setTranslate] = useState(false);
    const [download, setDownload] = useState(false);
    const chooseOptions = { label: "Choose", icon: "pi pi-fw pi-plus" };
    const uploadOptions = { label: "Uplaod", icon: "pi pi-upload", className: "p-button-success" };
    const cancelOptions = { label: "Cancel", icon: "pi pi-times", className: "p-button-danger" };

    /*
    Init
    */
    useEffect(() => {}, []);

    /*
    Methods
    */

    const invoiceUploadHandler = ({ files }) => {
        files.map((fileX) => {
            let fileReader = new FileReader();
            fileReader.onload = () => {
                setLeptonFile(null);
                uploadInvoice(fileX);
            };
            fileReader.readAsText(fileX);
        });
    };

    const uploadInvoice = async (file) => {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);
        formData.append("size", file.size);
        formData.append("type", file.type);
        setFileName(file.name);
        FileStorageService.storeLeptonFile(formData).then((valid) => {
            if (valid.data.success) {
                //console.log(valid.data.obj);
                setLeptonFile(valid.data.obj);
                setTranslate(true);
            } else {
                setLeptonFile([]);
            }
        });
    };

    const onInputChange = (e, part, field) => {
        const val = (e.target && e.target.value) || "";
        let _partsLepton = { ...leptonFile };
        //console.log(e.target.value);
        part[field] = val;
        _partsLepton.workList.part.map((partX) => {
            if (partX.id === part.id) {
                partX = part;
            }
        });
        setLeptonFile(_partsLepton);
    };

    const onDownloadSummit = () => {
        FileStorageService.html(fileName).then((response) => {
            if (response) {
                //console.log(response.data);
                const file = new Blob([response.data], { type: "application/xml" });
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            }
        });
    };

    const onUploadSummit = () => {
        FileStorageService.translateFile(leptonFile).then((valid) => {
            if (valid.data.success) {
                console.log(valid.data.obj);
                setDownload(true);
            }
        });
    };
    const onClear = () => {
        setTranslate(false);
        setDownload(false);
        setLeptonFile(null);
    };

    /*
    Inner components
    */
    return (
        <div>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
            <div className="grid" style={{ paddingTop: "1%", display: "block ruby", textAlign: "center" }}>
                <div className="card col-12 lg:col-10">
                    <div className="grid p-card" style={{ textAlign: "left", backgroundColor: "unset", boxShadow: "none" }}>
                        <div className="col-12 lg:col-6">
                            <i className="p-overlay-badge">
                                <FileUpload
                                    name="invoice"
                                    contentStyle={{ fontSize: "10px", border: "none", paddingBlock: "0%" }}
                                    headerStyle={{ border: "none", background: "none", paddingBlock: "1%" }}
                                    customUpload={true}
                                    uploadHandler={invoiceUploadHandler}
                                    onRemove={onClear}
                                    onClear={onClear}
                                    onSelect={onClear}
                                    accept="xml/*"
                                    maxFileSize={1000000}
                                    chooseOptions={chooseOptions}
                                    uploadOptions={uploadOptions}
                                    cancelOptions={cancelOptions}
                                />
                            </i>
                        </div>
                        <div className="grid col-12 lg:col-6" style={{ textAlign: "center" }}>
                            <div className="col-12 lg:col-12">
                                <Button label="TRADUCIR" className="p-button-warning" icon="pi pi-check" iconPos="right" onClick={onUploadSummit} disabled={!translate} />
                            </div>
                            <div className="col-12 lg:col-12">
                                <Button label="VISUALIZAR" className="p-button-warning" icon="pi pi-check" iconPos="right" onClick={onDownloadSummit} disabled={!download} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid">
                {leptonFile !== null
                    ? leptonFile.workList.part.map((part) => {
                          return (
                              <div key={part.id} className="card col-12 lg:col-12">
                                  <h5 style={{ fontWeight: "bold" }}>ID ETIQUETA: {part.id} </h5>
                                  <Accordion multiple activeIndex={false}>
                                      <AccordionTab header="ENCABEZADO">
                                          <div className="grid" style={{ paddingBlock: "1%" }}>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="info1" style={{ fontSize: "13px", height: "22px" }} value={part.info1} onChange={(e) => onInputChange(e, part, "info1")} />
                                                      <label htmlFor="info1">Información 1</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="info2" style={{ fontSize: "13px", height: "22px" }} value={part.info2} onChange={(e) => onInputChange(e, part, "info2")} />
                                                      <label htmlFor="info2">Información 2</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="ean13" style={{ fontSize: "13px", height: "22px" }} value={part.ean13} onChange={(e) => onInputChange(e, part, "ean13")} />
                                                      <label htmlFor="ean13">Código de Barras</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="detalle" style={{ fontSize: "13px", height: "22px" }} value={part.detalle} onChange={(e) => onInputChange(e, part, "detalle")} />
                                                      <label htmlFor="detalle">Detalle</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="material" style={{ fontSize: "13px", height: "22px" }} value={part.material} onChange={(e) => onInputChange(e, part, "material")} />
                                                      <label htmlFor="material">Material</label>
                                                  </span>
                                              </div>
                                          </div>
                                      </AccordionTab>
                                      <AccordionTab header="CORTE">
                                          <div className="grid" style={{ paddingBlock: "1%" }}>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <label htmlFor="veta">Veta: </label>
                                                  <InputSwitch style={{ marginLeft: "1%" }} checked={part.veta} onChange={(e) => onInputChange(e, part, "veta")} />
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="nPiezas" style={{ fontSize: "13px", height: "22px" }} value={part.nPiezas} onChange={(e) => onInputChange(e, part, "nPiezas")} />
                                                      <label htmlFor="nPiezas">Número de Piezas</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="largo" style={{ fontSize: "13px", height: "22px" }} value={part.largo} onChange={(e) => onInputChange(e, part, "largo")} />
                                                      <label htmlFor="largo">Largo</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="ancho" style={{ fontSize: "13px", height: "22px" }} value={part.ancho} onChange={(e) => onInputChange(e, part, "ancho")} />
                                                      <label htmlFor="ancho">Ancho</label>
                                                  </span>
                                              </div>
                                          </div>
                                      </AccordionTab>
                                      <AccordionTab header="LAMINADO">
                                          <div className="grid" style={{ paddingBlock: "1%" }}>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="lamA1" style={{ fontSize: "13px", height: "22px" }} value={part.lamA1} onChange={(e) => onInputChange(e, part, "lamA1")} />
                                                      <label htmlFor="lamA1">A1</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="lamB2" style={{ fontSize: "13px", height: "22px" }} value={part.lamB2} onChange={(e) => onInputChange(e, part, "lamB2")} />
                                                      <label htmlFor="lamB2">B2</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="lamA2" style={{ fontSize: "13px", height: "22px" }} value={part.lamA2} onChange={(e) => onInputChange(e, part, "lamA2")} />
                                                      <label htmlFor="lamA2">A2</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="lamB1" style={{ fontSize: "13px", height: "22px" }} value={part.lamB1} onChange={(e) => onInputChange(e, part, "lamB1")} />
                                                      <label htmlFor="lamB1">B1</label>
                                                  </span>
                                              </div>
                                          </div>
                                      </AccordionTab>
                                      <AccordionTab header="CANAL">
                                          <div className="grid" style={{ paddingBlock: "1%" }}>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="esp" style={{ fontSize: "13px", height: "22px" }} value={part.esp} onChange={(e) => onInputChange(e, part, "esp")} />
                                                      <label htmlFor="esp">Espesor</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="canCara" style={{ fontSize: "13px", height: "22px" }} value={part.canCara} onChange={(e) => onInputChange(e, part, "canCara")} />
                                                      <label htmlFor="canCara">Cara</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="dbl" style={{ fontSize: "13px", height: "22px" }} value={part.dbl} onChange={(e) => onInputChange(e, part, "dbl")} />
                                                      <label htmlFor="dbl">Distancia Borde Lateral</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="canPrf" style={{ fontSize: "13px", height: "22px" }} value={part.canPrf} onChange={(e) => onInputChange(e, part, "canPrf")} />
                                                      <label htmlFor="canPrf">Profundidad Corte</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="canA1" style={{ fontSize: "13px", height: "22px" }} value={part.canA1} onChange={(e) => onInputChange(e, part, "canA1")} />
                                                      <label htmlFor="canA1">A1</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="canB2" style={{ fontSize: "13px", height: "22px" }} value={part.canB2} onChange={(e) => onInputChange(e, part, "canB2")} />
                                                      <label htmlFor="canB2">B2</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="canA2" style={{ fontSize: "13px", height: "22px" }} value={part.canA2} onChange={(e) => onInputChange(e, part, "canA2")} />
                                                      <label htmlFor="canA2">A2</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="canB1" style={{ fontSize: "13px", height: "22px" }} value={part.canB1} onChange={(e) => onInputChange(e, part, "canB1")} />
                                                      <label htmlFor="canB1">B1</label>
                                                  </span>
                                              </div>
                                          </div>
                                      </AccordionTab>
                                      <AccordionTab header="PERFORACIÓN">
                                          <div className="grid" style={{ paddingBlock: "1%" }}>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="dmt" style={{ fontSize: "13px", height: "22px" }} value={part.dmt} onChange={(e) => onInputChange(e, part, "dmt")} />
                                                      <label htmlFor="dmt">Diametro</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="perfCara" style={{ fontSize: "13px", height: "22px" }} value={part.perfCara} onChange={(e) => onInputChange(e, part, "perfCara")} />
                                                      <label htmlFor="perfCara">Cara</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="perfPrf" style={{ fontSize: "13px", height: "22px" }} value={part.perfPrf} onChange={(e) => onInputChange(e, part, "perfPrf")} />
                                                      <label htmlFor="perfPrf">Profundidad</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="dbs" style={{ fontSize: "13px", height: "22px" }} value={part.dbs} onChange={(e) => onInputChange(e, part, "dbs")} />
                                                      <label htmlFor="dbs">Distancia Border Superior</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="dbi" style={{ fontSize: "13px", height: "22px" }} value={part.dbi} onChange={(e) => onInputChange(e, part, "dbi")} />
                                                      <label htmlFor="dbi">Distancia Border Inferior</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="perfA1" style={{ fontSize: "13px", height: "22px" }} value={part.perfA1} onChange={(e) => onInputChange(e, part, "perfA1")} />
                                                      <label htmlFor="perfA1">A1</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="perfB2" style={{ fontSize: "13px", height: "22px" }} value={part.perfB2} onChange={(e) => onInputChange(e, part, "perfB2")} />
                                                      <label htmlFor="perfB2">B2</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="perfA2" style={{ fontSize: "13px", height: "22px" }} value={part.perfA2} onChange={(e) => onInputChange(e, part, "perfA2")} />
                                                      <label htmlFor="perfA2">A2</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="perfB1" style={{ fontSize: "13px", height: "22px" }} value={part.perfB1} onChange={(e) => onInputChange(e, part, "perfB1")} />
                                                      <label htmlFor="perfB1">B1</label>
                                                  </span>
                                              </div>
                                          </div>
                                      </AccordionTab>
                                      <AccordionTab header="SISTEMA 32">
                                          <div className="grid" style={{ paddingBlock: "1%" }}>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="sisCara" style={{ fontSize: "13px", height: "22px" }} value={part.sisCara} onChange={(e) => onInputChange(e, part, "sisCara")} />
                                                      <label htmlFor="sisCara">Cara</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="sisA" style={{ fontSize: "13px", height: "22px" }} value={part.sisA} onChange={(e) => onInputChange(e, part, "sisA")} />
                                                      <label htmlFor="sisA">A</label>
                                                  </span>
                                              </div>
                                              <div className="col-6 lg:col-3" style={{ fontSize: "13px" }}>
                                                  <span className="p-float-label" style={{ paddingBottom: "3%" }}>
                                                      <InputText id="sisB" style={{ fontSize: "13px", height: "22px" }} value={part.sisB} onChange={(e) => onInputChange(e, part, "sisB")} />
                                                      <label htmlFor="sisB">B</label>
                                                  </span>
                                              </div>
                                          </div>
                                      </AccordionTab>
                                  </Accordion>
                              </div>
                          );
                      })
                    : ""}
            </div>
        </div>
    );
};
