//import { DefaultTheme } from "react-native-paper";
//import { StyleSheet } from "react-native";

export const theme = {
    //...DefaultTheme,
    colors: {
        //...DefaultTheme.colors,
        text: "#000000",
        primary: "#1498bf",
        secondary: "#414757",
        error: "#f13a59",
    },
    general: {
        iconPackName: "material", // https://material.io/resources/icons/?search=save&style=baseline
        buttonType: "solid", // solid, clear, outline
        backgroundColor: "white",
    },
    //styles: StyleSheet.create({
    styles: {
        avatarMainPage: { width: 150, height: 50 },
        avatarMainPageResumeContainer: {
            width: "40%",
            alignItems: "center",
            alignContent: "flex-start",
            flexDirection: "row",
            justifyContent: "flex-start",
        },
        avatarMainPageResume: {
            width: 80,
            height: 40,
            paddingHorizontal: 4,
        },
        avatarDialog: { width: "100%", height: 200 },
        iconButtonOnConfirm: { backgroundColor: "#a2ce85" },
        iconButtonOnCancel: { backgroundColor: "#ce9285" },
        buttonMainPage: {
            width: "100%",
            paddingTop: 2,
            backgroundColor: "transparent",
        },
        buttonInsideDialogContainer: {
            padding: 5,
            borderRadius: 10,
        },
        buttonInsideDialog: {
            width: "20%",
            paddingTop: 2,
            paddingVertical: 2,
            alignItems: "center",
            alignContent: "center",
        },
        buttonIcon: {
            paddingHorizontal: 10,
            //fontSize: 18,
            color: "white",
            borderColor: "white",
            textShadowColor: "white",
        },
        buttonGroup: {
            height: 30,
            //marginBottom: 0,
            marginVertical: 1,
            borderRadius: 10,
        },
        buttonStyle: {
            borderRadius: 10,
        },
        buttonStyleCancelButton: {
            borderRadius: 10,
            backgroundColor: "#8cb6cd",
        },
        bottomButtomView: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            paddingHorizontal: 4,
        },
        dialogView: {
            margin: 10,
            //backgroundColor: "white",
            //borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "black",
            shadowOffset: {
                width: 0,
                height: 20,
            },
            shadowOpacity: 0.05,
            shadowRadius: 40,
            elevation: 10,
        },
        container: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
        },
        safeAreaView: {
            flex: 1,
        },
        containerForm: {
            flex: 1,
            alignContent: "center",
            paddingTop: 10,
        },
        containerMulticolumn: {
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
        },
        containerMulticolumnCentered: {
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
        },
        textErrorLog: { color: "red" },
        textPassword: {
            marginVertical: 10,
            borderColor: "transparent",
        },
        textScreen: {
            fontSize: 24,
            fontWeight: "bold",
            paddingVertical: 1,
        },
        textDialog: {
            height: 40,
            width: 100,
            margin: 2,
            borderWidth: 0,
            borderColor: "transparent",
            fontWeight: "100",
        },
        textDialogH1: {
            fontWeight: "bold",
            width: "100%",
            paddingVertical: 5,
        },
        logoContainer: {
            position: "absolute",
            top: 90,
            alignItems: "center",
        },
        logo: {
            width: 250,
            height: 150,
        },
        logoText: {
            fontSize: 16,
            fontWeight: "bold",
        },
        textCentered: {
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "center",
        },
        textLink: {
            fontWeight: "bold",
            //color: theme.colors.primary,
        },
        spam: { height: 32 },
        spamCheckbox: { height: 32, backgroundColor: "transparent", borderRadius: 5 },
        spamCentered: { alignItems: "center", height: 32 },
    },
};
