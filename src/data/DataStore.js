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
    };
}
