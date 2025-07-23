import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

type WellnessCardProps = {
    score: string;
    timestamp: string;
    breathingRate: { value: number; unit: string; icon?: any };
    heartRate: { value: number; unit: string };
    stressLevel: { value: number; unit: string };
    heartRateVariability: { value: number; unit: string };
};

const WellnessCard: React.FC<WellnessCardProps> = ({
    score,
    timestamp,
    breathingRate,
    heartRate,
    stressLevel,
    heartRateVariability,
}) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Wellness Score: <Text style={styles.score}>{score}</Text>
                </Text>
                <Text style={styles.timestamp}>{timestamp}</Text>
            </View>

            <View style={styles.row}>
                {breathingRate.icon && (
                    <Image style={styles.icon} source={breathingRate.icon} />
                )}
                <Text style={styles.label}>Breathing Rate</Text>
                <Text style={styles.value}>
                    {breathingRate.value} <Text style={styles.unit}>{breathingRate.unit}</Text>
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Heart Rate</Text>
                <Text style={styles.value}>
                    {heartRate.value} <Text style={styles.unit}>{heartRate.unit}</Text>
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Stress level</Text>
                <Text style={styles.value}>
                    {stressLevel.value} <Text style={styles.unit}>{stressLevel.unit}</Text>
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Heart Rate Variability</Text>
                <Text style={styles.value}>
                    {heartRateVariability.value} <Text style={styles.unit}>{heartRateVariability.unit}</Text>
                </Text>
            </View>
        </View>
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
