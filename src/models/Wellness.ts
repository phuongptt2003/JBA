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

// Interface for health record value object
export interface HealthValue {
    value: number;
    unit?: string;
    level?: string;
}

// Interface for individual health record within a day
export interface HealthRecord {
    _id: string;
    userId: string;
    __v: number;
    createdAt: string;
    // Health metrics - all are objects with value property
    pulseRate: HealthValue;
    respirationRate: HealthValue;
    stressLevel: HealthValue;
    meanRRi: HealthValue;
    wellnessIndex: HealthValue;
    wellnessLevel: HealthValue;
    oxygenSaturation: HealthValue;
    bpValue: HealthValue;
    heartAge: HealthValue;
    // Risk assessments
    ascvdRisk: HealthValue;
    highBloodPressureRisk: HealthValue;
    highFastingGlucoseRisk: HealthValue;
    highHemoglobinA1cRisk: HealthValue;
    highTotalCholesterolRisk: HealthValue;
    lowHemoglobinRisk: HealthValue;
    // HRV metrics
    rmssd: HealthValue;
    sdnn: HealthValue;
    sd1: HealthValue;
    sd2: HealthValue;
    lfhf: HealthValue;
    rri: HealthValue;
    // Stress and autonomic metrics
    stressIndex: HealthValue;
    normalizedStressIndex: HealthValue;
    pnsIndex: HealthValue;
    snsIndex: HealthValue;
    pnsZone: HealthValue;
    snsZone: HealthValue;
    prq: HealthValue;
    // Lab values
    hemoglobin: HealthValue;
    hemoglobinA1c: HealthValue;
}

// Interface for health data item returned from API
export interface HealthDataItem {
    _id: string; // date string like "28-07-2025"
    count: number;
    data: HealthRecord[]; // Array of health records for that date
}

// Interface for API response
export interface HealthDataResponse {
    data: HealthDataItem[];
    message: string;
    success: boolean;
}