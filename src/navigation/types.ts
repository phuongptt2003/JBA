import { WellnessDay } from "../models/wellness";

export type RootStackParamList = {
  Login: undefined;
  Home: {email: string};
  Register: undefined;
  ForgotPassword: undefined;
  VerifyOTP: {email: string};
  ResetPassword: {email: string};
  ChangePassword: {email: string};
  DetailReport: {wellness: WellnessDay};
};