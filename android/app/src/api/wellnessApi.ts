import { wellnessDays } from "../data/wellness";
import { WellnessDay } from "../models/Wellness";

export const getWellnessDays = (): WellnessDay[] => {
  return wellnessDays;
};

export const getWellnessDay = (date: string): WellnessDay | undefined => {
  return wellnessDays.find(day => day.date === date);
};

export const addWellnessDay = (newDay: WellnessDay): boolean => {
  if (!newDay.date || !newDay.breathingRate || !newDay.heartRate || !newDay.stressLevel || !newDay.heartRateVariability) {
    return false; 
  }
  wellnessDays.push(newDay);
  return true;
};
export const updateWellnessDay = (date: string, updatedData: Partial<WellnessDay>): boolean => {
  const index = wellnessDays.findIndex(day => day.date === date);
  if (index !== -1) {
    wellnessDays[index] = { ...wellnessDays[index], ...updatedData };
    return true;
  }
  return false;
};