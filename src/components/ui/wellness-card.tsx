import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { WellnessDay } from "../../models/wellness";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";

type WellnessCardProps = {
  wellnessDay: WellnessDay;
};
const WellnessCard: React.FC<WellnessCardProps> = ({
  wellnessDay
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleClickDetailReport = () => {
    
    navigation.navigate('DetailReport', { wellness: wellnessDay });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handleClickDetailReport}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Wellness Score: <Text style={styles.score}>{wellnessDay.score}</Text>
        </Text>
        <Text style={styles.timestamp}>{wellnessDay.timeStamp}</Text>
      </View>

      <View style={styles.row}>
        <Image style={styles.icon} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrLHPU5zOPDKwBzo3sm3TOPM19lmUxvAEuOA&s" />

        <Text style={styles.label}>Breathing Rate</Text>
        <Text style={styles.value}>
          {wellnessDay.breathingRate.value} <Text style={styles.unit}>{wellnessDay.breathingRate.unit}</Text>
        </Text>
      </View>

      <View style={styles.row}>
        <Image style={styles.icon} src="https://cdn-icons-png.flaticon.com/512/865/865969.png" />
        <Text style={styles.label}>Heart Rate</Text>
        <Text style={styles.value}>
          {wellnessDay.heartRate.value} <Text style={styles.unit}>{wellnessDay.heartRate.unit}</Text>
        </Text>
      </View>

      <View style={styles.row}>
        <Image style={styles.icon} src="https://media.istockphoto.com/id/1740888398/vector/stress-level-meter-measuring-scale-stress-level-speedometer-indicator-stress-regulation-safe.jpg?s=612x612&w=0&k=20&c=nlGBPfyQgTem-vRK9kynaRS28W64pKixlXJCLQcv6o0=" />
        <Text style={styles.label}>Stress level</Text>
        <Text style={styles.value}>
          {wellnessDay.stressLevel.value} <Text style={styles.unit}>{wellnessDay.stressLevel.unit}</Text>
        </Text>
      </View>

      <View style={styles.row}>
        <Image style={styles.icon} src="https://cdn-icons-png.flaticon.com/512/5835/5835391.png" />
        <Text style={styles.label}>Heart Rate Variability</Text>
        <Text style={styles.value}>
          {wellnessDay.heartRateVariability.value} <Text style={styles.unit}>{wellnessDay.heartRateVariability.unit}</Text>
        </Text>
      </View>
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


/**
 * You can refactor the component to accept a single `WellnessDay` object instead of individual props.
 * Example:
 * 
 * type WellnessCardProps = {
 *   wellnessDay: WellnessDay;
 * };
 * 
 * const WellnessCard: React.FC<WellnessCardProps> = ({ wellnessDay }) => {
 *   // Use wellnessDay.score, wellnessDay.timestamp, etc.
 * };
 * 
 * This makes the component easier to use and maintain.
 */