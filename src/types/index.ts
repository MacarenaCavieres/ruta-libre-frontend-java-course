export enum VehicleStatus {
    AVAILABLE = "AVAILABLE",
    RESERVED = "RESERVED",
    RENTED = "RENTED",
    NOT_AVAILABLE = "NOT_AVAILABLE",
}

export type Vehicle = {
    id: number;
    plate: string;
    brand: string;
    model: string;
    year: string;
    category: string;
    status: VehicleStatus;
};

export type DraftVehicle = Omit<Vehicle, "id">;

export type DriverLicense = {
    type: string;
    expirationDate: Date;
};

export type DraftClient = {
    name: string;
    lastname: string;
    driverLicense: DriverLicense;
};

export type Client = DraftClient & {
    id: number;
};
