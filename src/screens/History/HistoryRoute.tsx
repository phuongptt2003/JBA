import { Alert, ScrollView, Text, View, StyleSheet } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import WellnessCard from "../../components/ui/wellness-card";
import React, { useCallback, useEffect } from "react";
import { getWellnessDay, getWellnessDays } from "../../api/wellness-api";
import { getHealthDataByRange } from "../../api/user-api";
import { WellnessDay, HealthDataItem, HealthDataResponse } from "../../models/wellness";
import { getWeekOfYear } from "../../utils/validation";


const HistoryRoute: React.FC = () => {
    const [healthData, setHealthData] = React.useState<HealthDataItem[]>([]);
    const [selectedDate, setSelectedDate] = React.useState('');
    const [dayFiltered, setDayFiltered] = React.useState<HealthDataItem>();
    const [dayCurrent, setDayCurrent] = React.useState<HealthDataItem>();
    const [currentWeekData, setCurrentWeekData] = React.useState<HealthDataItem[]>([]);

    useEffect(() => {
        const today = new Date();
        const currentWeekData = getWeekOfYear(today);

        const fetchData = async () => {
            try {
                const response = await getHealthDataByRange("week", currentWeekData);
                console.log('Health data for current week:', currentWeekData, response);

                // Extract the data array from the response
                if (response && response.data && Array.isArray(response.data)) {
                    setHealthData(response.data);
                    setCurrentWeekData(response.data);
                } else {
                    console.log('No data found in response');
                    setHealthData([]);
                    setCurrentWeekData([]);
                }
            } catch (error) {
                console.error('Error fetching health data:', error);
                setHealthData([]);
                setCurrentWeekData([]);
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        findHealthDay();
    }, [selectedDate]);

    useEffect(() => {
        const currentDate = new Date();
        
        // Use local date to avoid timezone issues
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDateAPI = `${day}-${month}-${year}`;

        // Always search in current week data, not selected week data
        const getCurrent = currentWeekData.find(
            day => day._id === formattedDateAPI  
        );
        if (getCurrent) {
            setDayCurrent(getCurrent); 
            console.log('Current filter data:', getCurrent);
        } else {
            setDayCurrent(undefined);
        }
    }, [currentWeekData]);

    const findHealthDay = useCallback(async () => {
        if (selectedDate && healthData && healthData.length > 0) {
            // Convert selectedDate (YYYY-MM-DD) to DD-MM-YYYY format
            const dateParts = selectedDate.split('-');
            const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

            console.log('Selected date:', selectedDate);
            console.log('Formatted date for search:', formattedDate);
            console.log('Available health data IDs:', healthData.map(day => day._id));

            const getDay = healthData.find(day => day._id === formattedDate);
            console.log('Found day:', getDay);
            
            if (!getDay) {
                console.log('No data found for formatted date:', formattedDate);
                // Create placeholder for selected date with no data
                setDayFiltered({
                    _id: formattedDate,
                    count: 0,
                    data: []
                });
                return;
            }
            // Set the HealthDataItem directly
            setDayFiltered(getDay);
        } else if (selectedDate) {
            // If no healthData but date is selected, show no data placeholder
            const dateParts = selectedDate.split('-');
            const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
            setDayFiltered({
                _id: formattedDate,
                count: 0,
                data: []
            });
        }
    }, [selectedDate, healthData]);

    // Helper function to get all health records from a day's data
    const getAllRecords = (healthDataItem: HealthDataItem) => {
        if (!healthDataItem || healthDataItem.count === 0 || !healthDataItem.data.length) {
            return [];
        }

        // Sort by createdAt to show most recent first
        const sortedRecords = healthDataItem.data.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return sortedRecords;
    };

    // Helper function to render all wellness cards for a day
    const renderWellnessCards = (healthDataItem: HealthDataItem, title: string) => {
        const records = getAllRecords(healthDataItem);
        
        if (records.length === 0) {
            return (
                <View>
                    <Text style={styles.headerText}>
                        {title}
                    </Text>
                    <Text style={styles.noDataText}>
                        No health data available for this date.
                    </Text>
                </View>
            );
        }

        return (
            <>
                <Text style={styles.headerText}>
                    {title} 
                </Text>
                {records.map((record, index) => (
                    <View key={record._id}>
                        {/* <Text style={styles.recordIndex}>
                            Record #{index + 1} - {new Date(record.createdAt).toLocaleTimeString()}
                        </Text> */}
                        <WellnessCard 
                            wellness={record}
                        />
                    </View>
                ))}
            </>
        );
    };

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
                {dayFiltered ? (
                    renderWellnessCards(dayFiltered, `Selected Date: ${dayFiltered._id}`)
                ) : dayCurrent ? (
                    renderWellnessCards(dayCurrent, `Today: ${dayCurrent._id}`)
                ) : (
                    <Text style={{textAlign: 'center', padding: 20}}>No data available</Text>
                )}
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
        color: '#333',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    recordIndex: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginTop: 15,
        marginBottom: 5,
        marginHorizontal: 10,
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#999',
        fontStyle: 'italic',
        padding: 20,
        marginHorizontal: 10,
    },
});

export default HistoryRoute;