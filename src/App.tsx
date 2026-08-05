import { useEffect, useState } from "react";
import VehicleCard from "./components/VehicleCard";
import { CarStatus, type Car } from "./types";
import { getVehicles } from "./services/vehicleService";

function App() {
    const [cars, setCars] = useState<Car[] | undefined>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [isReserved, setIsReserved] = useState<boolean>(false);
    const [clientName, setClientName] = useState<string>("");
    const [rentalDays, setRentalDays] = useState<number>(1);

    useEffect(() => {
        getVehicles()
            .then((data) => setCars(data))
            .catch((err) => console.log(err));
    }, []);

    const handleSelectCar = (car: Car) => {
        setSelectedCar(car);
        setIsReserved(false);
        setClientName("");
        setRentalDays(1);
    };

    const handleSubmitReservation = (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientName.trim()) return;

        setIsReserved(true);

        setCars((prevCars) =>
            prevCars?.map((c) => (c.id === selectedCar?.id ? { ...c, status: CarStatus.RESERVED } : c)),
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 min-h-screen">
            <header className="mb-12 text-center">
                <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight mb-3">Ruta libre</h1>
                <p className="text-lg text-gray-500">Tu próximo destino empieza sobre cuatro ruedas</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {cars?.map((car) => (
                        <VehicleCard key={car.id} car={car} onSelect={handleSelectCar} />
                    ))}
                </div>

                <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                    {!selectedCar && (
                        <div className="text-center py-8 text-gray-400">
                            <span className="text-4xl">🚗</span>
                            <p className="mt-3 text-sm font-medium">
                                Selecciona un auto disponible para iniciar tu reserva.
                            </p>
                        </div>
                    )}

                    {selectedCar && !isReserved && (
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Confirmar Reserva</h3>
                            <p className="text-xs text-indigo-600 font-semibold mb-4 uppercase tracking-wider">
                                {selectedCar.brand} {selectedCar.model}
                            </p>

                            <form onSubmit={handleSubmitReservation} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                        Nombre Completo
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        placeholder="Ej. Juan Pérez"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                                        Días de Arriendo
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="30"
                                        required
                                        value={rentalDays}
                                        onChange={(e) => setRentalDays(Number(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
                                >
                                    Completar Reserva Pasajero
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCar(null)}
                                    className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    Cancelar
                                </button>
                            </form>
                        </div>
                    )}

                    {selectedCar && isReserved && (
                        <div className="text-center py-4">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                                ✓
                            </div>
                            <h3 className="text-xl font-extrabold text-gray-900 mb-1">¡Arriendo Exitoso!</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                El vehículo ha quedado agendado bajo el sistema.
                            </p>

                            <div className="bg-gray-50 rounded-xl p-4 text-left text-xs text-gray-700 space-y-2 border border-gray-100 mb-4">
                                <p>
                                    👤 <b>Cliente:</b> {clientName}
                                </p>
                                <p>
                                    🚘 <b>Auto:</b> {selectedCar.brand} {selectedCar.model}
                                </p>
                                <p>
                                    🪪 <b>Patente:</b> <span className="font-mono">{selectedCar.plate}</span>
                                </p>
                                <p>
                                    📆 <b>Tiempo:</b> {rentalDays} {rentalDays === 1 ? "día" : "días"}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedCar(null)}
                                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl text-xs transition-colors"
                            >
                                Reservar otro auto
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
