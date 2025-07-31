import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, Touchable, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import Input from "../../components/ui/input";
import ButtonSubmit from "../../components/ui/button";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/slices/user-slice";
import Label from "../../components/ui/label";
import { formatHeight, formatWeight } from "../../utils/validation";
import { useState } from "react";
import { useEffect } from "react";

// import NumericInput from 'react-native-numeric-input';

type EditProfileProps = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;
const EditProfile: React.FC<EditProfileProps> = ({ navigation, route }) => {
    const user = route.params.user;
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [weight, setWeight] = useState(user.weight);
    const [height, setHeight] = useState(user.height);

    useEffect(() => {
        console.log('EditProfile user:', user);
        console.log('Email: ', email);
        console.log('Phone: ', phone);
        console.log('Weight: ', weight);
        console.log('Height: ', height);

    }, [])

    const dispatch = useDispatch();
    const handleUpdateUser = () => {

        dispatch(updateUser({
            _id: user._id,
            username: username,
            email: email,
            phone: phone,
            weight: weight,
            height: height
        }));
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Edit Profile</Text>
            <View style={styles.labelInput}>
                <Label style={styles.label}>User name</Label>
                <Input value={username} icon="supervised-user-circle" onChangeText={(text) => setUsername(text)} />
            </View>

            <View style={styles.labelInput}>
                <Label style={styles.label}>Email</Label>
                <Input value={email} icon="email" onChangeText={(text) => setEmail(text)} />
            </View>

            <View style={styles.labelInput}>
                <Label style={styles.label}>Phone Number</Label>
                <Input value={phone} icon="phone" onChangeText={(text) => setPhone(text)} />
            </View>

            <View style={styles.labelInput}>
                <Label style={styles.label}>Weight</Label>
                <Input value={formatWeight(weight)} icon="fitness-center" onChangeText={(text) => setWeight(parseFloat(text))} />
            </View>

            <View style={styles.labelInput}>
                <Label style={styles.label}>Height</Label>
                <Input
                    value={formatHeight(height)}
                    icon="height"
                    keyboardType="numeric"
                    onChangeText={(text) => setHeight(parseFloat(text))}
                />
                {/* <NumericInput
                    type='up-down'
                    value={height}
                    onChange={value => setHeight(value)}
                    totalWidth={240}
                    totalHeight={50}
                    rightButtonBackgroundColor='#EA3788'
                    leftButtonBackgroundColor='#E56B70'
                    minValue={100}
                    maxValue={250}
                    step={1}
                    valueType='real'
                    rounded
                />
                <NumericInput type='up-down' onChange={value => setHeight(value)} /> */}
            </View>

            <ButtonSubmit title={"Save Changes"} onPress={() => handleUpdateUser()} />
            <Text onPress={() => navigation.goBack()} style={{ color: 'blue', marginTop: 20 }}>
                Go Back
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'sans-serif',
        flex: 1, justifyContent: 'center', alignItems: 'center', left: 6, backgroundColor: '#F3F6FB'
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    },
    labelInput: {
        width: '100%',
        alignItems: 'flex-start'
    },
    label: {
        marginLeft: 10,
    }
})

export default EditProfile;