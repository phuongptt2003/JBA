import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { formatDateTime } from "../../utils/validation";
import { HealthRecord } from "../../models/wellness";

type WellnessCardProps = {
  wellness: HealthRecord;
};
const WellnessCard: React.FC<WellnessCardProps> = ({
  wellness
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleClickDetailReport = () => {
    navigation.navigate('DetailReport', { healthRecord: wellness });
  };

  console.log('WellnessCard log:', wellness);

  // Helper function to safely get value from health metrics
  const getValue = (healthValue: any) => {
    if (!healthValue || typeof healthValue !== 'object') return 0;
    return healthValue.value || 0;
  };

  // Helper function to safely get unit from health metrics
  const getUnit = (healthValue: any, defaultUnit = '') => {
    if (!healthValue || typeof healthValue !== 'object') return defaultUnit;
    return healthValue.unit || defaultUnit;
  };

  // Helper function to get blood pressure value
  const getBPValue = (bpValue: any) => {
    if (!bpValue || typeof bpValue !== 'object') return '0/0';
    const systolic = bpValue.systolic || 0;
    const diastolic = bpValue.diastolic || 0;
    return `${systolic}/${diastolic}`;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleClickDetailReport}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Wellness Score: <Text style={styles.score}>{getValue(wellness.wellnessIndex)}/10</Text>
        </Text>
        <Text style={styles.timestamp}>{formatDateTime(wellness.createdAt)}</Text>
      </View>

      <View style={styles.row}>
        <Image style={styles.icon} source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrLHPU5zOPDKwBzo3sm3TOPM19lmUxvAEuOA&s"}} />
        <Text style={styles.label}>Breathing Rate</Text>
        <Text style={styles.value}>
          {getValue(wellness.respirationRate)} <Text style={styles.unit}>/min</Text>
        </Text>
      </View>

      <View style={styles.row}>
        <Image style={styles.icon} source={{uri: "https://cdn-icons-png.flaticon.com/512/865/865969.png"}} />
        <Text style={styles.label}>Heart Rate</Text>
        <Text style={styles.value}>
          {getValue(wellness.pulseRate)} <Text style={styles.unit}>bpm</Text>
        </Text>
      </View>

      <View style={styles.row}>
        <Image style={styles.icon} source={{uri: "https://media.istockphoto.com/id/1740888398/vector/stress-level-meter-measuring-scale-stress-level-speedometer-indicator-stress-regulation-safe.jpg?s=612x612&w=0&k=20&c=nlGBPfyQgTem-vRK9kynaRS28W64pKixlXJCLQcv6o0="}} />
        <Text style={styles.label}>Stress Level</Text>
        <Text style={styles.value}>
          {getValue(wellness.stressLevel)} <Text style={styles.unit}>Level</Text>
        </Text>
      </View>

      <View style={styles.row}>
        <Image style={styles.icon} source={{uri: "https://cdn-icons-png.flaticon.com/512/5835/5835391.png"}} />
        <Text style={styles.label}>HRV (RMSSD)</Text>
        <Text style={styles.value}>
          {getValue(wellness.rmssd)} <Text style={styles.unit}>ms</Text>
        </Text>
      </View>

      {/* <View style={styles.row}>
        <Image style={styles.icon} source={{uri: "https://cdn-icons-png.flaticon.com/512/2785/2785482.png"}} />
        <Text style={styles.label}>Oxygen Saturation</Text>
        <Text style={styles.value}>
          {getValue(wellness.oxygenSaturation)} <Text style={styles.unit}>%</Text>
        </Text>
      </View>

      <View style={styles.row}>
        <Image style={styles.icon} source={{uri: "https://cdn-icons-png.flaticon.com/512/435/435421.png"}} />
        <Text style={styles.label}>Blood Pressure</Text>
        <Text style={styles.value}>
          {getBPValue(wellness.bpValue)} <Text style={styles.unit}>mmHg</Text>
        </Text>
      </View> */}
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  score: {
    fontWeight: "700",
  },
  timestamp: {
    fontSize: 12,
    color: "#777",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
  },
  unit: {
    fontWeight: "400",
    color: "#555",
  },
});

export default WellnessCard;

