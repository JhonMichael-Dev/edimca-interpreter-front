import { observable, action, decorate, extendObservable } from "mobx";
//import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { persist } from "mobx-persist";

class DataStore {
    selStore = null;

    constructor(prop) {
        extendObservable(this, {
            prop,
        });
    }

    setSelStore = (selStore) => {
        this.selStore = selStore;
    };

    getSelStore = () => {
        return this.selStore;
    };

    pushHome = () => {
        this.history.push("/");
    };
}

export default decorate(new DataStore(), {
    selStore: [persist("object"), observable],

    setSelStore: action,
    getSelStore: action,
});
