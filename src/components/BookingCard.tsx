import { type Booking } from "../types";

type Props = {
    booking: Booking;
    onEdit?: (booking: Booking) => void;
    onDelete?: (id: number) => void;
};

function BookingCard({ booking, onEdit, onDelete }: Props) {
    const formatDate = (date: Date | string) => {
        if (!date) return "N/A";
        return new Date(date).toISOString().split("T")[0];
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                            Reserva #{booking.id}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight mt-1">
                            {booking.client?.name} {booking.client?.lastname}
                        </h3>
                    </div>
                </div>

                <div className="space-y-2 py-3 border-t border-b border-gray-100 text-sm text-gray-600">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">🚘 Vehículo:</span>
                        <span className="font-semibold text-gray-800">
                            {booking.vehicle?.brand} {booking.vehicle?.model}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">🪪 Patente:</span>
                        <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                            {booking.vehicle?.plate}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pt-1 text-xs">
                        <span className="text-gray-400">📅 Inicio:</span>
                        <span className="font-medium text-gray-700">{formatDate(booking.startDate)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">📅 Término:</span>
                        <span className="font-medium text-gray-700">{formatDate(booking.endDate)}</span>
                    </div>
                </div>
            </div>

            <div className="px-5 pb-5 pt-2 bg-gray-50/50 border-t border-gray-50">
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => onEdit?.(booking)}
                        className="py-1.5 px-3 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                    >
                        ✏️ Editar
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete?.(booking.id)}
                        className="py-1.5 px-3 text-xs font-medium text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookingCard;
