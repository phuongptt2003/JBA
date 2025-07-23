import { Alert, ScrollView, Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { wellnessDays } from "../../data/wellness";
import WellnessCard from "../../components/ui/wellness-card";
import React, { useCallback, useEffect } from "react";
import { getWellnessDay, getWellnessDays } from "../../api/wellnessApi";
import { WellnessDay } from "../../models/Wellness";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const HistoryRoute: React.FC = () => {
    const [listWellness, setlistWellness] = React.useState<WellnessDay[]>([]);
    const [selectedDate, setSelectedDate] = React.useState('');
    const [wellnessFiltered, setWellnessFiltered] = React.useState<WellnessDay>();

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
                        score={(wellnessFiltered.score !== undefined ? wellnessFiltered.score : 0).toString()}
                        timestamp={wellnessFiltered.date}
                        breathingRate={{ value: wellnessFiltered.breathingRate, unit: 'bpm' }}
                        heartRate={{ value: wellnessFiltered.heartRate, unit: 'bpm' }}
                        stressLevel={{ value: wellnessFiltered.stressLevel, unit: 'level' }}
                        heartRateVariability={{ value: wellnessFiltered.heartRateVariability, unit: 'ms' }}
                    />
                ) : (
                    listWellness.map((day, index) => (
                        <WellnessCard
                            key={index}
                            score={(day.score !== undefined ? day.score : 0).toString()}
                            timestamp={day.date}
                            breathingRate={{ value: day.breathingRate, unit: 'bpm' }}
                            heartRate={{ value: day.heartRate, unit: 'bpm' }}
                            stressLevel={{ value: day.stressLevel, unit: 'level' }}
                            heartRateVariability={{ value: day.heartRateVariability, unit: 'ms' }}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    );
}
export default HistoryRoute;