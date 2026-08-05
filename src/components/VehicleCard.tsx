import { CarStatus, type Car } from "../types";

type Props = {
    car: Car;
    onSelect: (car: Car) => void;
};

function VehicleCard({ car, onSelect }: Props) {
    const getStatusStyle = (status: CarStatus) => {
        switch (status) {
            case CarStatus.AVAILABLE:
                return {
                    badge: "bg-green-100 text-green-800 border-green-200",
                    text: "Disponible",
                };
            case CarStatus.RESERVED:
                return {
                    badge: "bg-amber-100 text-amber-800 border-amber-200",
                    text: "Reservado",
                };
            case CarStatus.RENTED:
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

    const configStatus = getStatusStyle(car.status);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                            {car.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">
                            {car.brand} <span className="font-medium text-gray-600">{car.model}</span>
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
                            Año: <b>{car.year}</b>
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">🪪</span>
                        <span className="font-mono tracking-wider">{car.plate}</span>
                    </div>
                </div>
            </div>

            <div className="px-5 pb-5 pt-2 bg-gray-50/50 border-t border-gray-50">
                <button
                    onClick={() => onSelect(car)}
                    disabled={car.status !== CarStatus.AVAILABLE}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 text-center ${
                        car.status === CarStatus.AVAILABLE
                            ? "bg-gray-900 text-white hover:bg-indigo-600 shadow-sm"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                >
                    {car.status === CarStatus.AVAILABLE ? "Arrendar Vehículo" : "No Disponible"}
                </button>
            </div>
        </div>
    );
}
export default VehicleCard;
