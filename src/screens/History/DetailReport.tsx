import { Alert, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import CardFourWellness from "../../components/ui/card-four-wellness";
import { StyleSheet } from "react-native";
import ButtonSubmit from "../../components/ui/button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { useEffect } from "react";
import { deleteWellnessDay, getWellnessDayById } from "../../api/wellness-api";
import React from "react";
import { formatDateTime } from "../../utils/validation";
import ConfirmDialog from "../../components/ui/cofirm-dialog";

type DetailReportProps = NativeStackScreenProps<RootStackParamList, 'DetailReport'>;

const DetailReport: React.FC<DetailReportProps> = ({ navigation, route }) => {
    // const [wellnessDay, setWellnessDay] = React.useState<>();
    const [dataChart, setDataChart] = React.useState<{ value: number; color: string }[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [showDialog, setShowDialog] = React.useState<boolean>(false);
    const healthData  = route.params.healthRecord;

    const handleDelete = () => {
        if (healthData) {
            const isDeleted = deleteWellnessDay(healthData._id);
            if (isDeleted) {
                Alert.alert('Success', 'Wellness day deleted successfully');
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Failed to delete wellness day');
            }
        } else {
            Alert.alert('Error', 'Invalid wellness day ID');
        }
    }

    useEffect(() => {
        if (healthData) {
            const wellnessScore = healthData.wellnessIndex?.value || 0;
            setDataChart([
                { value: wellnessScore, color: '#4CAF50' },
                { value: 10 - wellnessScore, color: 'lightgray' }
            ]);
        }
    }, [healthData]);

    return (
        <View style={styles.container}>
            <PieChart
                donut
                radius={80}
                innerRadius={65}
                data={dataChart}
                centerLabelComponent={() => {
                    const wellnessScore = healthData?.wellnessIndex?.value || 0;
                    return <Text style={{ fontSize: 20 }}>{wellnessScore}/10</Text>;
                }}
            />
            <Text style={styles.titleTime}>
                {healthData.createdAt ? formatDateTime(healthData.createdAt) : ""}
            </Text>
            {healthData && <CardFourWellness health={healthData} />}
            <ButtonSubmit
                title="Delete"
                onPress={() => {
                    setShowDialog(true);
                }}
            />
            <ConfirmDialog
                visible={showDialog}
                message="Are you sure you want to delete this wellness day?"
                onConfirm={handleDelete}
                onCancel={() => setShowDialog(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
    titleTime: {
        fontSize: 15,
        marginVertical: 20
    }
});
export default DetailReport;
