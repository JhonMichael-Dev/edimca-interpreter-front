export function createDataStore() {
    return {
        // Loading flag
        loading: false,
        setLoading(loading) {
            this.loading = loading;
        },

        // Principal user (chief of warehouse "bodeguero")
        authPrincipalUser: null,
        setAuthPrincipalUser(principalUser) {
            console.log("principalUser", principalUser);
            this.authPrincipalUser = principalUser;
        },
        removeAuthPrincipalUser() {
            this.authPrincipalUser = null;
        },

        // Transfers
        countStopedOrder: 0,
        setCountStopedOrder(count) {
            this.countStopedOrder = count;
        },
        countIncomingTransfers: 0,
        setCountIncomingTransfers(count) {
            this.countInputTransfers = count;
        },

        // Operation , assistants , machinery (Other Order)
        otherOrderOperation: null,
        setOtherOrderOperation(operation) {
            this.otherOrderOperation = operation;
        },
        removeOtherOrderOperation() {
            this.otherOrderOperation = null;
        },
        otherOrderAssistants: null,
        setOtherOrderAssistants(assistants) {
            this.otherOrderAssistants = assistants;
        },
        removeOtherOrderAssistants() {
            this.otherOrderAssistants = null;
        },
        otherOrderMachinery: null,
        setOtherOrderMachinery(machinery) {
            this.otherOrderMachinery = machinery;
        },
        removeOtherOrderMachinery() {
            this.otherOrderMachinery = null;
        },
    };
}
