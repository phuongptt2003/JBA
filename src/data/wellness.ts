import { WellnessDay } from "../models/wellness";

export const wellnessDays: WellnessDay[] = [
    {
        date: '2025-07-27',
        timeStamp: '2025-07-27T10:00:00Z',
        breathingRate: { value: 16, unit: 'breaths/min' },
        heartRate: { value: 72, unit: 'bpm' },
        stressLevel: { value: 3, unit: 'Moderate' },
        heartRateVariability: { value: 45, unit: 'ms' },
    },
    {
        date: '2025-07-26',
        timeStamp: '2025-07-26T10:00:00Z',
        breathingRate: { value: 15, unit: 'breaths/min' },
        heartRate: { value: 70, unit: 'bpm' },
        stressLevel: { value: 2, unit: 'Moderate' },
        heartRateVariability: { value: 50, unit: 'ms' },
    },
    {
        date: '2025-07-25',
        timeStamp: '2025-07-25T10:00:00Z',
        breathingRate: { value: 17, unit: 'breaths/min' },
        heartRate: { value: 75, unit: 'bpm' },
        stressLevel: { value: 4, unit: 'High' },
        heartRateVariability: { value: 42, unit: 'ms' },
    },
    {
        date: '2025-07-24',
        timeStamp: '2025-07-24T10:00:00Z',
        breathingRate: { value: 16, unit: 'breaths/min' },
        heartRate: { value: 73, unit: 'bpm' },
        stressLevel: { value: 3, unit: 'Moderate' },
        heartRateVariability: { value: 47, unit: 'ms' },
    },
    {
        date: '2025-07-23',
        timeStamp: '2025-07-23T10:00:00Z',
        breathingRate: { value: 15, unit: 'breaths/min' },
        heartRate: { value: 71, unit: 'bpm' },
        stressLevel: { value: 2, unit: 'Low' },
        heartRateVariability: { value: 52, unit: 'ms' },
    },
];