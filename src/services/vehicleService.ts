import axios from "axios";
import type { DraftVehicle, MessageResponse, Vehicle } from "../types";

export async function createVehicle(vehicle: DraftVehicle) {
    try {
        const { data } = await axios.post<Vehicle>(`http://localhost:8080/api/vehicle`, vehicle);
        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}

export async function getVehicles() {
    try {
        const { data } = await axios.get<Vehicle[]>(`http://localhost:8080/api/vehicle`);
        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}

export async function updateVehicle(vehicleId: number, vehicle: DraftVehicle) {
    try {
        const { data } = await axios.put<Vehicle>(`http://localhost:8080/api/vehicle/${vehicleId}`, vehicle);
        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}

export async function removeVehicle(vehicleId: number) {
    try {
        const { data } = await axios.delete<MessageResponse>(`http://localhost:8080/api/vehicle/${vehicleId}`);
        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}
