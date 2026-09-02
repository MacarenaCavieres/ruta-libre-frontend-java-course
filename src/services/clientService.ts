import axios from "axios";
import type { Client, DraftClient, MessageResponse } from "../types";

export async function createClient(client: DraftClient) {
    try {
        const { data } = await axios.post<Client>(`http://localhost:8080/api/client`, client);

        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}

export async function getClients() {
    try {
        const { data } = await axios.get<Client[]>(`http://localhost:8080/api/client`);
        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}

export async function updateClient(clientId: number, client: DraftClient) {
    try {
        const { data } = await axios.put<Client>(`http://localhost:8080/api/client/${clientId}`, client);
        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}

export async function removeClient(clientId: number) {
    try {
        const { data } = await axios.delete<MessageResponse>(`http://localhost:8080/api/client/${clientId}`);
        if (data) {
            return data;
        }
    } catch (e) {
        console.log("Hubo un error: " + e);
        throw new Error("error: " + e, { cause: e });
    }
}
