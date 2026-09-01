import { useEffect, useState } from "react";
import { VehicleStatus, type Vehicle, type DraftVehicle } from "../types";
import { getVehicles, createVehicle } from "../services/vehicleService";
import CreateVehicleCard from "../components/CreateVehicleCard";

const INITIAL_DRAFT: DraftVehicle = {
    plate: "",
    brand: "",
    model: "",
    year: new Date().getFullYear().toString(),
    category: "SUV",
    status: VehicleStatus.AVAILABLE,
};

function VehicleView() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [formData, setFormData] = useState<DraftVehicle>(INITIAL_DRAFT);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getVehicles()
            .then((data) => setVehicles(data || []))
            .catch((err) => console.error(err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const newVehicle = await createVehicle(formData);

            setVehicles((prev) => [...prev, newVehicle]);

            setFormData(INITIAL_DRAFT);
        } catch (error) {
            console.error("Error al crear el vehículo:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Lista de vehículos a la izquierda */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                    <CreateVehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>

            {/* Formulario lateral de registro */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Nuevo Vehículo</h3>
                <p className="text-xs text-gray-400 mb-6">Registra una nueva unidad en la flota.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Patente / Placa</label>
                        <input
                            type="text"
                            name="plate"
                            required
                            value={formData.plate}
                            onChange={handleChange}
                            placeholder="Ej. AABB-12"
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Marca</label>
                            <input
                                type="text"
                                name="brand"
                                required
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="Ej. Toyota"
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Modelo</label>
                            <input
                                type="text"
                                name="model"
                                required
                                value={formData.model}
                                onChange={handleChange}
                                placeholder="Ej. RAV4"
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Año</label>
                            <input
                                type="number"
                                name="year"
                                required
                                min="1990"
                                max={new Date().getFullYear() + 1}
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Categoria</label>
                            <input
                                type="text"
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Ej. SUV / Sedan"
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Estado Inicial</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value={VehicleStatus.AVAILABLE}>Disponible</option>
                            <option value={VehicleStatus.RESERVED}>Reservado</option>
                            <option value={VehicleStatus.RENTED}>En Mantenimiento</option>
                            <option value={VehicleStatus.NOT_AVAILABLE}>No disponible</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-xl text-sm transition-colors shadow-sm mt-2"
                    >
                        {loading ? "Guardando..." : "Guardar Vehículo"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default VehicleView;
