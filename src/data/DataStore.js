export function createDataStore() {
    return {
        authPrincipalUser: null,
        setAuthPrincipalUser(principalUser) {
            this.authPrincipalUser = principalUser;
        },
        removeAuthPrincipalUser() {
            this.authPrincipalUser = null;
        },
    };
}
