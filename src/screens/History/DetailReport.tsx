import { Alert, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import CardFourWellness from "../../components/ui/card-four-wellness";
import { WellnessDay } from "../../models/wellness";
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
    const [wellnessDay, setWellnessDay] = React.useState<WellnessDay>();
    const [dataChart, setDataChart] = React.useState<{ value: number; color: string }[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [showDialog, setShowDialog] = React.useState<boolean>(false);
    const idWellnessDay = route.params.id;

    const handleDelete = () => {
        if (idWellnessDay) {
            const isDeleted = deleteWellnessDay(idWellnessDay);
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
        const fetchWellnessData = async () => {
            const fetch = await getWellnessDayById(idWellnessDay);
            if (!fetch) {
                Alert.alert('Error', 'No wellness data found for the selected date');
                return;
            }
            setWellnessDay(fetch);
        };
        fetchWellnessData();
    }, [idWellnessDay]);

    useEffect(() => {
        if (wellnessDay) {
            setDataChart([
                { value: wellnessDay.score ? parseInt(wellnessDay.score) : 0, color: '#4CAF50' },
                { value: 10 - (wellnessDay.score ? parseInt(wellnessDay.score) : 0), color: 'lightgray' }
            ]);
        }
    }, [wellnessDay]);

    return (
        <View style={styles.container}>
            <PieChart
                donut
                radius={80}
                innerRadius={65}
                data={dataChart}
                centerLabelComponent={() => {
                    return <Text style={{ fontSize: 20 }}>{wellnessDay?.score}/10</Text>;
                }}
            />
            <Text style={styles.titleTime}>
                {wellnessDay?.timeStamp ? formatDateTime(wellnessDay.timeStamp) : ""}
            </Text>
            {wellnessDay && <CardFourWellness wellnessDay={wellnessDay} />}
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
