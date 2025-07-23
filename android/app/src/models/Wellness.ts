export interface WellnessDay{
    date: string; 
    score?: string; // Optional score field
    breathingRate: number;
    heartRate: number;
    stressLevel: number;
    heartRateVariability: number;
}