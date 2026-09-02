import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import { VehicleStatus, type Vehicle, type Client, type DraftBooking } from "../types";
import { getVehicles } from "../services/vehicleService";
import { getClients } from "../services/clientService";
import { createBooking } from "../services/bookingService";

function HomeView() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [selectedClientId, setSelectedClientId] = useState<number | "">("");
    const [startDate, setStartDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [endDate, setEndDate] = useState<string>(new Date().toISOString().split("T")[0]);
    const [isReserved, setIsReserved] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getVehicles()
            .then((data) => setVehicles(data || []))
            .catch(console.error);
        getClients()
            .then((data) => setClients(data || []))
            .catch(console.error);
    }, []);

    const handleSelectCar = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setIsReserved(false);
    };

    const handleSubmitReservation = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedVehicle || selectedClientId === "") return;

        setLoading(true);

        const bookingPayload: DraftBooking = {
            clientId: Number(selectedClientId),
            vehicleId: selectedVehicle.id,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        };

        try {
            await createBooking(bookingPayload);
            setIsReserved(true);
            setVehicles((prev) =>
                prev.map((v) => (v.id === selectedVehicle.id ? { ...v, status: VehicleStatus.RESERVED } : v)),
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const selectedClientObj = clients.find((c) => c.id === Number(selectedClientId));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} onSelect={handleSelectCar} />
                ))}
            </div>

            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                {!selectedVehicle && (
                    <div className="text-center py-8 text-gray-400">
                        <span className="text-4xl">🚗</span>
                        <p className="mt-3 text-sm font-medium">Selecciona un auto disponible para reservar.</p>
                    </div>
                )}

                {selectedVehicle && !isReserved && (
                    <form onSubmit={handleSubmitReservation} className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Confirmar Reserva</h3>
                        <p className="text-xs text-indigo-600 font-bold uppercase">
                            {selectedVehicle.brand} {selectedVehicle.model} ({selectedVehicle.plate})
                        </p>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Cliente</label>
                            <select
                                required
                                value={selectedClientId}
                                onChange={(e) => setSelectedClientId(Number(e.target.value))}
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            >
                                <option value="">Selecciona un cliente</option>
                                {clients.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name} {c.lastname}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Fecha Inicio</label>
                            <input
                                type="date"
                                required
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                Fecha Término
                            </label>
                            <input
                                type="date"
                                required
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
                        >
                            {loading ? "Reservando..." : "Completar Reserva"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedVehicle(null)}
                            className="w-full text-center text-xs text-gray-400 hover:text-gray-600"
                        >
                            Cancelar
                        </button>
                    </form>
                )}

                {selectedVehicle && isReserved && (
                    <div className="text-center py-4">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                            ✓
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">¡Reserva Exitosa!</h3>
                        <div className="bg-gray-50 rounded-xl p-4 text-left text-xs space-y-2 border border-gray-100 mb-4">
                            <p>
                                👤 <b>Cliente:</b> {selectedClientObj?.name} {selectedClientObj?.lastname}
                            </p>
                            <p>
                                🚘 <b>Auto:</b> {selectedVehicle.brand} {selectedVehicle.model}
                            </p>
                            <p>
                                📅 <b>Desde:</b> {startDate} <b>Hasta:</b> {endDate}
                            </p>
                        </div>
                        <button
                            onClick={() => setSelectedVehicle(null)}
                            className="w-full py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl text-xs"
                        >
                            Reservar otro auto
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomeView;
