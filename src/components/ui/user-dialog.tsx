import React from "react";
import { User } from "../../models/user";
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { StyleSheet } from "react-native";

interface UserInfoDialogProps {
    visible: boolean;
    onClose: () => void;
    user: User;
}

export const UserInfoDialog: React.FC<UserInfoDialogProps> = ({
    visible,
    onClose,
    user,
}) => {
    if (!visible) return null;

    return (
        <React.Fragment>
            {visible && (
                <View
                    style={style.container}
                    pointerEvents="box-none"
                >
                    <View style={style.dialog}>
                        <Text style={style.title}>
                            User Information
                        </Text>
                        <Text>
                            <Text style={style.text}>Username:</Text> {user.Password}
                        </Text>
                        <Text>
                            <Text style={style.text}>Email:</Text> {user.Email}
                        </Text>
                        <Text>
                            <Text style={style.text}>Phone Number:</Text> {user.PhoneNumber}
                        </Text>
                        <Text>
                            <Text style={style.text}>Invitation Code:</Text> {user.InvitationCode}
                        </Text>
                        <TouchableOpacity
                            style={style.buttonClose}
                            onPress={onClose}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </React.Fragment>
    );

};

const style = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16
    },
    buttonClose: {
        marginTop: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        backgroundColor: "#1976d2",
        alignSelf: "flex-end",
    },
    dialog: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    text: {
        fontWeight: "bold"
    }
})