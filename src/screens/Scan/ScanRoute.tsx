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
import { createHealthData } from "../../api/user-api";

export const ScanRoute = () => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [listWellness, setlistWellness] = React.useState<WellnessDay[]>([]);
  const [wellnessCurrent, setWellnessCurrent] = React.useState<WellnessDay>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [addHealthData, setAddHealthData] = useState<any>({});
  const [lastScanTime, setLastScanTime] = useState<string>('');

  useEffect(() => {
    console.log("Camera permission status:", hasPermission)
    if (hasPermission === false) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  useEffect(() => {
    if (addHealthData) {
      console.log("New health useEffect:", addHealthData);
    }
  }, [addHealthData]);

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
      setTimeout(async () => {
        const healthDataString = '{"ascvdRisk": {"type": 33554432, "value": 1}, "bpValue": {"diastolic": 75, "systolic": 118}, "heartAge": {"type": 268435456, "value": 26}, "hemoglobin": {"type": 1048576, "value": 10.5}, "hemoglobinA1c": {"type": 2097152, "value": 5.64}, "highBloodPressureRisk": {"type": 16777216, "value": 1}, "highFastingGlucoseRisk": {"type": 8589934592, "value": 3}, "highHemoglobinA1cRisk": {"type": 8388608, "value": 1}, "highTotalCholesterolRisk": {"type": 536870912, "value": 3}, "lfhf": {"type": 524288, "value": 0.261}, "lowHemoglobinRisk": {"type": 17179869184, "value": 3}, "meanRRi": {"confidence": {"level": 2}, "type": 256, "value": 923}, "normalizedStressIndex": {"type": 67108864, "value": 15}, "oxygenSaturation": {"type": 4, "value": 97}, "pnsIndex": {"type": 8192, "value": 4.6}, "pnsZone": {"type": 16384, "value": 3}, "prq": {"confidence": {"level": 2}, "type": 4096, "value": 3.4}, "pulseRate": {"confidence": {"level": 3}, "type": 1, "value": 64}, "respirationRate": {"confidence": {"level": 2}, "type": 2, "value": 19}, "rmssd": {"type": 512, "value": 145}, "rri": {"confidence": {"level": 2}, "type": 32, "value": []}, "sd1": {"type": 1024, "value": 143}, "sd2": {"type": 2048, "value": 154}, "sdnn": {"confidence": {"level": 2}, "type": 8, "value": 148}, "snsIndex": {"type": 32768, "value": -1.1}, "snsZone": {"type": 65536, "value": 1}, "stressIndex": {"type": 128, "value": 22}, "stressLevel": {"type": 16, "value": 1}, "wellnessIndex": {"type": 131072, "value": 8}, "wellnessLevel": {"type": 262144, "value": 3}}'
        const healthDataObject = JSON.parse(healthDataString);
        const fetch = await createHealthData(healthDataString);
        if (fetch) {
          setAddHealthData(healthDataObject);
          setLastScanTime(new Date().toISOString());
        } else {
          setError('Failed to create health data');
          Alert.alert('Error', 'Failed to create health data');
          return;
        }
        console.log("Health data created:", addHealthData);
      }, 1000);

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
          {lastScanTime ? (
            <Text>
              Last taken: <Text style={styles.boldText}>{formatDateTime(lastScanTime)}</Text>
            </Text>
          ) : (
            ""
          )}
        </View>

        <View style={styles.cardsContainer}>
          {addHealthData && Object.keys(addHealthData).length > 0 ? (
            <CardFourWellness health={addHealthData} />
          ) : (
            <Text style={styles.noDataText}>No wellness data available.</Text>
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
  healthDataContainer: {
    marginTop: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
  },
  healthDataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  healthDataGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  healthDataItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#007bff',
  },
  healthDataLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  healthDataValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
});
