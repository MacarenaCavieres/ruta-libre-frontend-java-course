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
    license: DriverLicense;
};

export type Client = DraftClient & {
    id: number;
};

export type DraftBooking = {
    clientId: number;
    vehicleId: number;
    startDate: Date;
    endDate: Date;
};

export type Booking = {
    id: number;
    client: Client;
    vehicle: Vehicle;
    startDate: Date;
    endDate: Date;
};

export type MessageResponse = {
    message: string;
};
