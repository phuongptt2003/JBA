import { wellnessDays } from "../data/wellness";
import { WellnessDay } from "../models/wellness";

export const getWellnessDays = (): WellnessDay[] => {
  return wellnessDays;
};

export const getWellnessDay = (date: string): WellnessDay | undefined => {
  return wellnessDays.find(day => day.date === date);
};
export const getWellnessDayById = (id: string): WellnessDay | undefined => {
  return wellnessDays.find(day => day.id === id);
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

export const deleteWellnessDay = (id: string): boolean => {
  const index = wellnessDays.findIndex(day => day.id === id);
  if (index !== -1) {
    wellnessDays.splice(index, 1);
    return true;
  }
  return false;
}