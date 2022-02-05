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
        countIncomingTransfers: 1,
        setCountIncomingTransfers(count) {
            this.countInputTransfers = count;
        },
    };
}
