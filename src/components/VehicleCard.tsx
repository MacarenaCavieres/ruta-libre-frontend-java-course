import { VehicleStatus, type Vehicle } from "../types";

type Props = {
    vehicle: Vehicle;
    onSelect: (vehicle: Vehicle) => void;
};

function VehicleCard({ vehicle, onSelect }: Props) {
    const getStatusStyle = (status: VehicleStatus) => {
        switch (status) {
            case VehicleStatus.AVAILABLE:
                return {
                    badge: "bg-green-100 text-green-800 border-green-200",
                    text: "Disponible",
                };
            case VehicleStatus.RESERVED:
                return {
                    badge: "bg-amber-100 text-amber-800 border-amber-200",
                    text: "Reservado",
                };
            case VehicleStatus.RENTED:
                return {
                    badge: "bg-rose-100 text-rose-800 border-rose-200",
                    text: "Arrendado",
                };
            default:
                return {
                    badge: "bg-gray-100 text-gray-800 border-gray-200",
                    text: "Desconocido",
                };
        }
    };

    const configStatus = getStatusStyle(vehicle.status);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">
                            {vehicle.brand} <span className="font-medium text-gray-600">{vehicle.model}</span>
                        </h3>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${configStatus.badge}`}>
                        {configStatus.text}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-4 py-4 my-2 border-t border-b border-gray-100 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">📅</span>
                        <span>
                            Año: <b>{vehicle.year}</b>
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">🪪</span>
                        <span className="font-mono tracking-wider">{vehicle.plate}</span>
                    </div>
                </div>
            </div>

            <div className="px-5 pb-5 pt-2 bg-gray-50/50 border-t border-gray-50">
                <button
                    onClick={() => onSelect(vehicle)}
                    disabled={vehicle.status !== VehicleStatus.AVAILABLE}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 text-center ${
                        vehicle.status === VehicleStatus.AVAILABLE
                            ? "bg-gray-900 text-white hover:bg-indigo-600 shadow-sm"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                    {vehicle.status === VehicleStatus.AVAILABLE ? "Arrendar Vehículo" : "No Disponible"}
                </button>
            </div>
        </div>
    );
}
export default VehicleCard;
