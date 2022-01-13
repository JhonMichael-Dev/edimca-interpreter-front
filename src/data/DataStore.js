export function createDataStore() {
    return {
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
