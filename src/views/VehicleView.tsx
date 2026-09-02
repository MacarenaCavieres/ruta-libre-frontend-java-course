import { useEffect, useState } from "react";
import { VehicleStatus, type Vehicle, type DraftVehicle } from "../types";
import { getVehicles, createVehicle, removeVehicle, updateVehicle } from "../services/vehicleService";
import CreateVehicleCard from "../components/CreateVehicleCard";

const INITIAL_DRAFT: DraftVehicle = {
    plate: "",
    brand: "",
    model: "",
    year: new Date().getFullYear().toString(),
    status: VehicleStatus.AVAILABLE,
};

function VehicleView() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [formData, setFormData] = useState<DraftVehicle>(INITIAL_DRAFT);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getVehicles()
            .then((data) => setVehicles(data || []))
            .catch((err) => console.error(err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (vehicle: Vehicle) => {
        setEditingId(vehicle.id);
        setFormData({
            plate: vehicle.plate ?? "",
            brand: vehicle.brand ?? "",
            model: vehicle.model ?? "",
            year: vehicle.year ? vehicle.year.toString().split("-")[0] : new Date().getFullYear().toString(),
            status: vehicle.status ?? VehicleStatus.AVAILABLE,
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Estás seguro de eliminar este vehículo?")) return;
        try {
            await removeVehicle(id);
            setVehicles((prev) => prev.filter((v) => v.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingId) {
                const updated = await updateVehicle(editingId, formData);
                if (updated) {
                    setVehicles((prev) => prev.map((v) => (v.id === editingId ? updated : v)));
                }
                setEditingId(null);
            } else {
                const newVehicle = await createVehicle(formData);
                if (newVehicle) {
                    setVehicles((prev) => [...prev, newVehicle]);
                }
            }
            setFormData(INITIAL_DRAFT);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                    <CreateVehicleCard key={vehicle.id} vehicle={vehicle} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>

            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {editingId ? "Editar Vehículo" : "Nuevo Vehículo"}
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                    {editingId ? "Modifica los datos del vehículo." : "Registra una nueva unidad."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Patente / Placa</label>
                        <input
                            type="text"
                            name="plate"
                            required
                            value={formData.plate}
                            onChange={handleChange}
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
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Año</label>
                        <input
                            type="number"
                            name="year"
                            required
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Estado</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value={VehicleStatus.AVAILABLE}>Disponible</option>
                            <option value={VehicleStatus.RESERVED}>Reservado</option>
                            <option value={VehicleStatus.RENTED}>Arrendado</option>
                            <option value={VehicleStatus.NOT_AVAILABLE}>No disponible</option>
                        </select>
                    </div>

                    <div className="space-y-2 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors"
                        >
                            {loading ? "Guardando..." : editingId ? "Actualizar" : "Guardar"}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingId(null);
                                    setFormData(INITIAL_DRAFT);
                                }}
                                className="w-full py-2 px-4 bg-gray-100 text-gray-600 font-semibold rounded-xl text-xs"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VehicleView;
