
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidVietnamesePhone(phone: string): boolean {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
}

export const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

export const formatWeight = (weight: number): string => {
    if (weight < 1000) {
        return `${weight} kg`;
    } else {
        return `${(weight / 1000).toFixed(2)} t`;
    }
}
export const formatHeight = (height: number): string => {
    if (height < 100) {
        return `${height} cm`;
    } else {
        return `${(height / 100).toFixed(2)} m`;
    }
}