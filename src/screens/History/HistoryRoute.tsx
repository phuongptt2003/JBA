import { Alert, ScrollView, Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import WellnessCard from "../../components/ui/wellness-card";
import React, { useCallback, useEffect } from "react";
import { getWellnessDay, getWellnessDays } from "../../api/wellness-api";
import { WellnessDay } from "../../models/wellness";

const HistoryRoute: React.FC = () => {
    const [listWellness, setlistWellness] = React.useState<WellnessDay[]>([]);
    const [selectedDate, setSelectedDate] = React.useState('');
    const [wellnessFiltered, setWellnessFiltered] = React.useState<WellnessDay>();
    const [wellnessCurrent, setWellnessCurrent] = React.useState<WellnessDay>();

    useEffect(() => {
        const fetchWellnessData = async () => {
            const data = await getWellnessDays();
            setlistWellness(data);
        };
        fetchWellnessData();
    }, []);

    useEffect(() => {
        fetchWellnessData();
    }, [selectedDate]);

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        const getCurrent = listWellness.find(
            day => day.date === formattedDate
        );
        if (getCurrent) {
            setWellnessCurrent(getCurrent);
        } else {
            setWellnessCurrent(undefined);
        }
    }, [listWellness]);

    const fetchWellnessData = useCallback(async () => {
        if (selectedDate) {
            const getWellness = listWellness.find(day => day.date === selectedDate);
            if (!getWellness) {
                Alert.alert('Error', 'No wellness data found for the selected date');
                return;
            }
            setWellnessFiltered(getWellness);
        }
    }, [selectedDate]);

    return (
        <View style={{ flex: 1 }}>
            <Calendar
                onDayPress={(day: DateData) => {
                    setSelectedDate(day.dateString);
                }}
                markedDates={{
                    [selectedDate]: {
                        selected: true,
                        marked: true,
                        selectedColor: 'blue',
                    }
                }}
            />
            <ScrollView>
                {wellnessFiltered ? (
                    <WellnessCard
                        wellnessDay={wellnessFiltered}
                    />
                ) : wellnessCurrent ? (
                    <WellnessCard
                        wellnessDay={wellnessCurrent}
                    />
                ) : null}
            </ScrollView>

        </View>
    );
}
export default HistoryRoute;