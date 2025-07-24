import { Alert, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import CardFourWellness from "../../components/ui/card-four-wellness";

export const ScanRoute = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <TouchableOpacity
      style={{
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
      }}
      onPress={() => Alert.alert('Scan button pressed')}
    >
      <Text>Scan now</Text>
    </TouchableOpacity>
    <CardFourWellness wellnessDay={{
      date: '2025-07-27',
      timeStamp: '2025-07-27T10:00:00Z',
      breathingRate: { value: 16, unit: 'breaths/min' },
      heartRate: { value: 72, unit: 'bpm' },
      stressLevel: { value: 3, unit: 'Moderate' },
      heartRateVariability: { value: 45, unit: 'ms' },
    }} />
  </View>
);


// const styles = StyleSheet.create({
//   cardContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     width: "90%",
//   },
//   card: {
//     width: "48%",
//     height: 150,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
//     elevation: 1,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   icon: {
//     fontSize: 20,
//   },
//   info: {
//     fontSize: 14,
//   },
//   label: {
//     marginTop: 5,
//     fontSize: 12,
//     color: "#555",
//   },
//   value: {
//     fontSize: 20,
//     fontWeight: "700",
//     marginTop: 2,
//   },
//   unit: {
//     fontSize: 12,
//     color: "#888",
//   },
// });