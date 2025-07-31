import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../navigation/types";
import Input from "../../components/ui/input";
import ButtonSubmit from "../../components/ui/button";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUserStore } from "../../store/slices/user-slice";
import Label from "../../components/ui/label";
import { formatHeight, formatWeight, extractNumeric } from "../../utils/validation";
import { useState } from "react";
import { useEffect } from "react";
import { User } from "../../models/user";
import { getProfile, updateProfile } from "../../api/user-api";
import CheckBox from '@react-native-community/checkbox';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Profile } from "../../models/profile";
import InputNumeric from "../../components/ui/input-numeric";

// import NumericInput from 'react-native-numeric-input';

type EditProfileProps = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;
const EditProfile: React.FC<EditProfileProps> = ({ navigation, route }) => {
    const user = route.params.user;
    const [userProfile, setUserProfile] = useState<Profile>();
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [weight, setWeight] = useState(user.weight);
    const [height, setHeight] = useState(user.height);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [smokingStatus, setSmokingStatus] = useState(user.smokingStatus);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const fetchProfile = await getProfile();
            setUserProfile(fetchProfile);
            if (fetchProfile) {
                setHeight(fetchProfile.height);
                setWeight(fetchProfile.weight);
                setAge(fetchProfile.age);
                setGender(fetchProfile.gender);
                setSmokingStatus(fetchProfile.smokingStatus !== undefined && fetchProfile.smokingStatus !== null ? String(fetchProfile.smokingStatus) : undefined);
            }
        }
        fetch();
    }, [])
    useEffect(() => {
        console.log('profile neeee:', userProfile);
    }, [userProfile]);

    useEffect(() => {
        console.log('EditProfile user:', user);
        console.log('profile neeee:', userProfile);
        console.log('Email: ', email);
        console.log('Phone: ', phone);
        console.log('Weight: ', weight);
        console.log('Height: ', height);
    }, [])

    const dispatch = useDispatch();
    const handleUpdateUser = () => {
        const update = updateProfile({
            height: height,
            weight: weight,
            age: age,
            gender: gender,
            smokingStatus: smokingStatus !== undefined && smokingStatus !== '' ? Number(smokingStatus) : undefined,
            username: username,
        });
        if (!update) {
            console.log('Update user failed');
            return;
        }
        console.log('Update user successfully');
        console.log('Updated user:', {
            _id: user._id,
            username: username,
            email: email,
            phone: phone,
            weight: weight,
            height: height,
            age: age,
            gender: gender,
            smokingStatus: smokingStatus,
        });
        navigation.goBack();
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titleHead}>Edit Profile</Text>
                <View style={styles.labelInput}>
                    <Label style={styles.label}>User name</Label>
                    <Input value={username} icon="supervised-user-circle" onChangeText={(text) => setUsername(text)} />
                </View>
                <View style={styles.labelInput}>
                    <Label style={styles.label}>Age</Label>
                    <Input
                        value={age !== undefined && age !== null ? String(age) : ''}
                        icon="cake"
                        onChangeText={(text) => setAge(Number(text))}
                    />
                </View>
                <View style={styles.labelInput}>
                    <Label style={styles.label}>Gender</Label>
                    <View style={styles.radioRow}>
                        <TouchableOpacity onPress={() => setGender('male')} style={styles.radioButtonContainer}>
                            <View style={styles.radioButton}>
                                {gender === 'male' && (
                                    <View style={{
                                        height: 10,
                                        width: 10,
                                        borderRadius: 5,
                                        backgroundColor: '#007AFF',
                                    }} />
                                )}
                            </View>
                            <Text style={{ marginLeft: 8 }}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setGender('female')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.radioButton}>
                                {gender === 'female' && (
                                    <View style={{
                                        height: 10,
                                        width: 10,
                                        borderRadius: 5,
                                        backgroundColor: '#007AFF',
                                    }} />
                                )}
                            </View>
                            <Text style={{ marginLeft: 8 }}>Female</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.labelInput}>
                    <Label style={styles.label}>Smoking Status</Label>
                    <InputNumeric
                        value={smokingStatus !== undefined && smokingStatus !== '' ? String(smokingStatus) : ''}
                        icon="smoking-rooms"
                        onChangeNumber={(value: number) => setSmokingStatus(value !== undefined && value !== null ? String(value) : undefined)}
                    />
                </View>
                <View style={styles.labelInput}>
                    <Label style={styles.label}>Weight</Label>
                    <InputNumeric
                        value={weight !== undefined && weight !== null ? String(weight) : ''}
                        icon="fitness-center"
                        onChangeNumber={setWeight}
                    />
                </View>

                <View style={styles.labelInput}>
                    <Label style={styles.label}>Height</Label>
                    <InputNumeric
                        value={height !== undefined && height !== null ? formatHeight(Number(height)) : ''}
                        icon="height"
                        onChangeNumber={setHeight}
                    />
                </View>

                <ButtonSubmit title={"Save Changes"} onPress={() => handleUpdateUser()} />
                <Text onPress={() => navigation.goBack()} style={{ color: 'blue', marginTop: 20 }}>
                    Go Back
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'sans-serif',
        flex: 1, justifyContent: 'center', alignItems: 'center', left: 6
    },
    titleHead: {
        fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'
    },
    radioRow: {
        flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: 10, marginTop: 5
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
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