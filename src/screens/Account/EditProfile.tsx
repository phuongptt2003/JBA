import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, Touchable, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import Input from "../../components/ui/input";
import ButtonSubmit from "../../components/ui/button";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/slices/user-slice";

type EditProfileProps = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;
const EditProfile: React.FC<EditProfileProps> = ({ navigation, route }) => {

    const user = route.params.user;
    const [username, setUsername] = React.useState(user.Username);
    const [email, setEmail] = React.useState(user.Email);
    const [phoneNumber, setPhoneNumber] = React.useState(user.PhoneNumber);
    const [weight, setWeight] = React.useState(user.Weight);
    const [height, setHeight] = React.useState(user.Height);

    const dispatch = useDispatch();
    const handleUpdateUser = () => {

        dispatch(updateUser({
            Id: user.Id,
            Username: username,
            Email: email,
            PhoneNumber: phoneNumber,
            Weight: weight,
            Height: height
        }));
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Edit Profile</Text>
            <Input value={username} type="text" onChangeText={(text) => setUsername(text)} />
            <Input value={email} type="email" onChangeText={(text) => setEmail(text)} />
            <Input value={phoneNumber} type="phone" onChangeText={(text) => setPhoneNumber(text)} />
            <Input value={weight.toString()} type="number" onChangeText={(text) => setWeight(parseFloat(text))} />
            <Input value={height.toString()} type="number" onChangeText={(text) => setHeight(parseFloat(text))} />
            <ButtonSubmit title={"Save Changes"} onPress={() => handleUpdateUser()} />
            <Text onPress={() => navigation.goBack()} style={{ color: 'blue', marginTop: 20 }}>
                Go Back
            </Text>
        </View>
    );
}

export default EditProfile;