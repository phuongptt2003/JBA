import { ScrollView, StyleSheet, Text, View } from "react-native"
import ButtonSubmit from "../../components/ui/button";


const DetailScanFace: React.FC = () => {
    return (
        // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //     <Text>Detail Scan Face Screen</Text>
        // </View>
        <ScrollView style={styles.container}>
            <View style={styles.summaryBlock}>
                <Text style={styles.title}>Skin Summary</Text>
                <Text>Skin Type: Combined</Text>
                <Text>Age Range: 24–32</Text>
                <Text>Morphotype: Finely Wrinkled</Text>
            </View>

            <View style={styles.row}>
                <View style={styles.metricBlock1}>
                    <Text style={styles.metricTitle}>Humidity</Text>
                    <Text style={styles.metricValue}>40% - Intermediate</Text>
                </View>

                <View style={styles.metricBlock2}>
                    <Text style={styles.metricTitle}>Oiliness</Text>
                    <Text style={styles.metricValue}>60 µg/cm² - Normal</Text>
                </View>
            </View>

            <View style={styles.summaryBlock}>
                <Text style={styles.title}>Skin Summary</Text>
                <Text>Skin Type: Combined</Text>
                <Text>Age Range: 24–32</Text>
                <Text>Morphotype: Finely Wrinkled</Text>
            </View>
            <View style={styles.informationBlock}>
                <Text>Morphotype</Text>
                <Text>Finely Wrinkled</Text>
            </View>
            <View style={styles.informationBlock}>
                <Text>Morphotype</Text>
                <Text>Finely Wrinkled</Text>
            </View>
            <View style={styles.informationBlock}>
                <Text>Morphotype</Text>
                <Text>Finely Wrinkled</Text>
            </View>

            <View style={styles.buttonBlock}>
                <ButtonSubmit title="Save Result" onPress={() => {/* Save logic */ }} />
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F6FB',
        padding: 16,
    },
    summaryBlock: {
        backgroundColor: '#D9EAF7',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    metricBlock1: {
        width: '48%',
        backgroundColor: '#efd2f3ff',
        borderRadius: 20,
        padding: 16,
        elevation: 2,
    },
    metricBlock2: {
        width: '48%',
        backgroundColor: '#b0eed8ff',
        borderRadius: 20,
        padding: 16,
        elevation: 2,
    },
    metricTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    metricValue: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    buttonBlock: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    informationBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        fontWeight: 400,
        marginBottom: 12,
    }
});

export default DetailScanFace;