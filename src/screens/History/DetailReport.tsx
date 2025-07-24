import { Alert, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import CardFourWellness from "../../components/ui/card-four-wellness";
import { WellnessDay } from "../../models/wellness";
import { StyleSheet } from "react-native";
import ButtonSubmit from "../../components/ui/button";

interface DetailReportProps {
    wellnessDay: WellnessDay;
}

const handleDelete = (wellnessDay: WellnessDay) => {
    // Implement delete functionality here
    Alert.alert(`this wellnessDay: ${JSON.stringify(wellnessDay)}`);
};

const DetailReport: React.FC<DetailReportProps> = ({ wellnessDay }) => {
    const data = [
        { value: 70, color: '#177AD5' },
        { value: 30, color: 'lightgray' }
    ];
    return (
        <View style={styles.container}>
            <PieChart
                donut
                radius={80}
                innerRadius={60}
                data={data}
                centerLabelComponent={() => {
                    return <Text style={{ fontSize: 30 }}>70%</Text>;
                }}
            />
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10 }}>
                02-22-2003 - 13:01:20
            </Text>
            <CardFourWellness wellnessDay={{
                date: '2025-07-27',
                timeStamp: '2025-07-27T10:00:00Z',
                breathingRate: { value: 16, unit: 'breaths/min' },
                heartRate: { value: 72, unit: 'bpm' },
                stressLevel: { value: 3, unit: 'Moderate' },
                heartRateVariability: { value: 45, unit: 'ms' },
            }} />

            <ButtonSubmit title="Delete" onPress={() => {handleDelete(wellnessDay)}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    card: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
    },

});
export default DetailReport;
