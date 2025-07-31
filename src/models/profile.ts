
export interface Profile {
    _id: string;
    height: number;
    weight: number;
    age?: number;
    gender?: 'male' | 'female';
    smokingStatus?: number;
}