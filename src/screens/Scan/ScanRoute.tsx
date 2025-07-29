import { Alert, Text, TouchableOpacity, View, Image } from "react-native";
import { StyleSheet } from "react-native";
import CardFourWellness from "../../components/ui/card-four-wellness";
import { wellnessDays } from "../../data/wellness";
import React, { useEffect, useRef, useState } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera'
import ButtonSubmit from "../../components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { WellnessDay } from "../../models/wellness";
import { getWellnessDays } from "../../api/wellness-api";
import { formatDateTime } from "../../utils/validation";

export const ScanRoute = () => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [listWellness, setlistWellness] = React.useState<WellnessDay[]>([]);
  const [wellnessCurrent, setWellnessCurrent] = React.useState<WellnessDay>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    console.log("Camera permission status:", hasPermission)
    if (hasPermission === false) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    const fetchWellnessData = async () => {
      const data = await getWellnessDays();
      setlistWellness(data);
    };
    fetchWellnessData();
  }, []);


  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const getCurrent = listWellness.find(
      day => day.date === formattedDate
    );
    if (getCurrent) {
      setWellnessCurrent(getCurrent);
    } else {
      setWellnessCurrent(undefined);
    }
  }, [listWellness]);

  const handleToggleCamera = async () => {
    try {
      console.log("Toggling camera, current state:", isCameraActive);
      setError('');

      if (!hasPermission) {
        const permission = await requestPermission();
        if (!permission) {
          setError('Camera permission is required to use this feature');
          Alert.alert('Error', 'Camera permission is required to use this feature');
          return;
        }
      }

      if (!device) {
        setError('Camera not found');
        Alert.alert('Error', 'Camera not found');
        return;
      }

      setIsCameraActive(prev => !prev);

      setTimeout(() => {
        if (!isCameraActive) {
          navigation.navigate('DetailScanFace');
        }
      }, 4000);

    } catch (err) {
      console.error('Camera toggle error:', err);
      setError('Error occurred while toggling camera');
      Alert.alert('Error', 'Error occurred while toggling camera');
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#e3d2d2ff' }}>
      {device && isCameraActive && hasPermission && (
        <Camera
          style={[styles.camera, { height: 300, width: '100%' }]}
          device={device}
          isActive={true}
          onError={(error) => {
            console.error('Camera error:', error);
            setError('Error occurred with camera: ' + error.message);
            Alert.alert('Camera Error', 'Error occurred with camera: ' + error.message);
            setIsCameraActive(false);
          }}
        />
      )}

      {!isCameraActive && (
        <View style={styles.errorContainer}>
          {!device ? (
            <Text style={styles.errorText}>Camera not found</Text>
          ) : !hasPermission ? (
            <Text style={styles.errorText}>Camera permission is required</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <Image
              source={{
                uri: "https://www.shutterstock.com/image-vector/smartphone-scans-woman-face-biometric-260nw-1141822244.jpg"
              }}
              style={{ width: '100%', height: 200 }}
            />
          )}
        </View>
      )}


      <View style={styles.bottomContainer}>
        <ButtonSubmit
          title={isCameraActive ? 'Turn off Camera' : 'Scan now'}
          disabled={!hasPermission || !device}
          onPress={handleToggleCamera}
        />
        <View style={styles.textTaken}>
          {wellnessCurrent ? (
            <Text>
              Last taken: <Text style={styles.boldText}>{formatDateTime(wellnessCurrent.timeStamp)}</Text>
            </Text>
          ) : (
            <Text>No wellness data available</Text>
          )}
        </View>
        <View style={styles.cardsContainer}>
          {wellnessCurrent && (
            <CardFourWellness wellnessDay={wellnessCurrent} />
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "90%",
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 20,
  },
  info: {
    fontSize: 14,
  },
  label: {
    fontSize: 12,
    color: "#555",
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
  },
  unit: {
    fontSize: 12,
    color: "#888",
  },
  bottomContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f0e9e9ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  cardsContainer: {
    marginTop: 15,
  },
  textTaken: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
});
