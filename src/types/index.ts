export enum CarStatus {
    AVAILABLE = "AVAILABLE",
    RESERVED = "RESERVED",
    RENTED = "RENTED",
}

export type Car = {
    id: number;
    plate: string;
    brand: string;
    model: string;
    year: string;
    category: string;
    status: CarStatus;
};
