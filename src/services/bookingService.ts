import axios from "axios";
import type { Booking, DraftBooking, MessageResponse } from "../types";

export async function createBooking(booking: DraftBooking) {
    try {
        const { data } = await axios.post<Booking>(`http://localhost:8080/api/booking`, booking);
        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}

export async function getBookings() {
    try {
        const { data } = await axios.get<Booking[]>(`http://localhost:8080/api/booking`);
        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}

export async function updateBooking(bookingId: number, booking: Booking) {
    try {
        const { data } = await axios.put<Booking>(`http://localhost:8080/api/booking/${bookingId}`, booking);
        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}

export async function reemoveBooking(bookingId: number) {
    try {
        const { data } = await axios.delete<MessageResponse>(`http://localhost:8080/api/booking/${bookingId}`);
        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}
