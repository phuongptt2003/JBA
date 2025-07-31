export interface User{
    _id: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    confirmPassword: string;
    invitationCode: string;
    weight: number;
    height: number;
    role: string;
    address: string;
    optionEmail: string;
    age?: number;
    gender?: string;
    smokingStatus?: string;
}