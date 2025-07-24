
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { WellnessDay } from "../../models/wellness";

type CardFourWellnessProps = {
    wellnessDay: WellnessDay;
};

const CardFourWellness: React.FC<CardFourWellnessProps> = ({ wellnessDay }) => {
    return (
        <View style={styles.cardContainer}>
            {/* Breathing Rate */}
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.icon}>🫁</Text>
                    <Text style={styles.info}>ℹ️</Text>
                </View>
                <Text style={styles.label}>Breathing Rate</Text>
                <Text style={styles.value}>{wellnessDay.breathingRate.value}</Text>
                <Text style={styles.unit}>{wellnessDay.breathingRate.unit}</Text>
            </View>

            {/* Heart Rate */}
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.icon}>❤️</Text>
                    <Text style={styles.info}>ℹ️</Text>
                </View>
                <Text style={styles.label}>Heart Rate</Text>
                <Text style={styles.value}>{wellnessDay.heartRate.value}</Text>
                <Text style={styles.unit}>{wellnessDay.heartRate.unit}</Text>
            </View>

            {/* Stress Level */}
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.icon}>🧘</Text>
                    <Text style={styles.info}>ℹ️</Text>
                </View>
                <Text style={styles.label}>Stress Level</Text>
                <Text style={styles.value}>{wellnessDay.stressLevel.value}</Text>
                <Text style={styles.unit}>{wellnessDay.stressLevel.unit}</Text>
            </View>

            {/* Heart Rate Variability */}
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.icon}>📈</Text>
                    <Text style={styles.info}>ℹ️</Text>
                </View>
                <Text style={styles.label}>Heart Rate Variability</Text>
                <Text style={styles.value}>{wellnessDay.heartRateVariability.value}</Text>
                <Text style={styles.unit}>{wellnessDay.heartRateVariability.unit}</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "90%",
    },
    card: {
        width: "48%",
        height: 150,
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        elevation: 1,
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
        marginTop: 5,
        fontSize: 12,
        color: "#555",
    },
    value: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 2,
    },
    unit: {
        fontSize: 12,
        color: "#888",
    },
});

export default CardFourWellness;