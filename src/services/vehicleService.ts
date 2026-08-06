import axios from "axios";
import type { Car } from "../types";

export async function getVehicles() {
    try {
        const { data } = await axios.get<Car[]>(`http://localhost:8080/api/vehicles`);
        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}
