
export type RootStackParamList = {
  Login: undefined;
  Home: {email: string};
  Register: undefined;
  ForgotPassword: undefined;
  VerifyOTP: {email: string};
  ResetPassword: {email: string};
};