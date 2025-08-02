import { User } from "../models/user";
import { HealthRecord, WellnessDay } from "../models/wellness";

export type RootStackParamList = {
  Login: undefined;
  Home: { email: string };
  Register: undefined;
  ForgotPassword: undefined;
  VerifyOTP: { email: string };
  ResetPassword: { email: string };
  ChangePassword: { email: string };
  DetailReport: { healthRecord: HealthRecord };
  EditProfile: { user: User };
  DetailScanFace: undefined; 
};