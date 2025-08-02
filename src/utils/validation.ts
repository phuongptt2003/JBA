export function extractNumeric(input: string): string {
    return input.replace(/[^\d.]/g, '');
}

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

export const getWeekOfYear = (date: Date): string => {
    // Sử dụng ISO week numbering để match với API
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7; // Monday = 0, Sunday = 6
    target.setDate(target.getDate() - dayNr + 3); // Thursday of this week
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const weekNumber = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000); // 604800000 = 7 * 24 * 60 * 60 * 1000
    return `${weekNumber}/${date.getFullYear()}`;
};
