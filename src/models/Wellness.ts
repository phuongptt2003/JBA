export interface WellnessDay{
    id: string; 
    date: string; 
    timeStamp: string;
    score: string; 
    breathingRate: {value: number, unit: string};
    heartRate: {value: number, unit: string};
    stressLevel: {value: number, unit: string};
    heartRateVariability: {value: number, unit: string};
}