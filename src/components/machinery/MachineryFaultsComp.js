import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";

// Prime components
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";

import MasterDataService from "../../service/MasterDataService";

export const MachineryFaultsComp = observer((props) => {

    const [Categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [Damage, setDamage] = useState();
    const [selectedDamages, setSelectedDamages] = useState([]);

    useEffect(() => {
        loadAvailables();
    }, []);

    const loadAvailables = () => {
        handleQueryOrders();
    };

    const handleQueryOrders = () => {
        let payload = {
            cdProduct: "POS_PC",
            cdUserDef: "MD"
        };
        MasterDataService.queryMasterData(payload).then((valid) => {
            if (valid.data && valid.data.success) {
                //console.log(valid.data.obj);
                setCategories(valid.data.obj);
            }
        });
    };

    const onDamageChange = (e) => {

        setSelectedCategory(e.value);
        setSelectedDamages([]);

        if (e.checked) {
            //console.log("checked, value: ", e.value);
            MasterDataService.queryMasterDataByParent(e.value).then((valid) => {
                if (valid.data && valid.data.success) {
                    //console.log(valid.data.obj);
                    setDamage(valid.data.obj);
                }
            });
        }
    }

    const onFaultChange = (e) => {
        let _selectedDamages = [...selectedDamages];

        if (e.checked) {
            _selectedDamages.push(e.value);
        }
        else {
            for (let i = 0; i < _selectedDamages.length; i++) {
                const selectedCategory = _selectedDamages[i];

                if (selectedCategory.key === e.value.key) {
                    _selectedDamages.splice(i, 1);
                    break;
                }
            }
        }

        setSelectedDamages(_selectedDamages);
    }

    return (
        <div className="grid card" >
            <div className="col-3 col-offset-1" style={{ height: "124px", overflow: "auto" }}>
                {
                    Categories ?
                        Categories.map((category) => {
                            return (
                                <div key={category.code} className="field-radiobutton">
                                    <RadioButton
                                        //inputId={category.code}
                                        name="category"
                                        value={category.id}
                                        onChange={(e) => onDamageChange(e)}
                                        checked={selectedCategory === category.id}
                                    />
                                    <label htmlFor={category.code}>{category.description1}</label>
                                </div>
                            )
                        })
                        :
                        ""
                }
            </div>
            <div className="col-7 col-offset-1" style={{ height: "124px", overflow: "auto" }}>
                {
                    Damage ?
                        Damage.map((damage) => {
                            return (
                                <div key={damage.code} className="field-checkbox">
                                    <Checkbox
                                        name="damage"
                                        value={damage}
                                        onChange={onFaultChange}
                                        checked={selectedDamages.some((item) => item.code === damage.code)}
                                    />
                                    <label htmlFor={damage.code}>{damage.description1}</label>
                                </div>
                            )
                        })
                        :
                        ""
                }
            </div>
        </div>
    );
});