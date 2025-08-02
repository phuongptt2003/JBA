
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
// import { health } from "../../models/wellness";

type CardFourWellnessProps = {
    health: any;
};

const CardFourWellness: React.FC<CardFourWellnessProps> = ({ health }) => {
    useEffect(() => {
        console.log("Health data received:", health);
    }, [health]);
    
    return (
        <View style={styles.cardContainer}>
            {/* Breathing Rate */}
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.icon}>🫁</Text>
                    <Text style={styles.info}>ℹ️</Text>
                </View>
                <Text style={styles.label}>Breathing Rate</Text>
                <Text style={styles.value}>{health.respirationRate?.value || 'N/A'}</Text>
                <Text style={styles.unit}>/minutes</Text>
            </View>

            {/* Heart Rate */}
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.icon}>❤️</Text>
                    <Text style={styles.info}>ℹ️</Text>
                </View>
                <Text style={styles.label}>Heart Rate</Text>
                <Text style={styles.value}>{health.pulseRate?.value || 'N/A'}</Text>
                <Text style={styles.unit}>bpm</Text>
            </View>

            {/* Stress Level */}
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.icon}>🧘</Text>
                    <Text style={styles.info}>ℹ️</Text>
                </View>
                <Text style={styles.label}>Stress Level</Text>
                <Text style={styles.value}>{health.stressLevel?.value || 'N/A'}</Text>
                <Text style={styles.unit}>Level</Text>
            </View>

            {/* Heart Rate Variability */}
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.icon}>📈</Text>
                    <Text style={styles.info}>ℹ️</Text>
                </View>
                <Text style={styles.label}>Heart Rate Variability</Text>
                <Text style={styles.value}>{health.meanRRi?.value || 'N/A'}</Text>
                <Text style={styles.unit}>Milliseconds</Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
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
    noDataText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        padding: 20,
    },
});

export default CardFourWellness;