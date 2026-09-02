import { useEffect, useState } from "react";
import { type Booking, type DraftBooking } from "../types";
import { getBookings, updateBooking, reemoveBooking } from "../services/bookingService";
import BookingCard from "../components/BookingCard";

function BookingView() {
    const [bookings, setBookings] = useState<Booking[]>([]);

    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getBookings()
            .then((data) => setBookings(data || []))
            .catch(console.error);
    }, []);

    const handleEdit = (booking: Booking) => {
        setEditingBooking(booking);
        setStartDate(booking.startDate ? new Date(booking.startDate).toISOString().split("T")[0] : "");
        setEndDate(booking.endDate ? new Date(booking.endDate).toISOString().split("T")[0] : "");
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Deseas eliminar esta reserva?")) return;
        try {
            await reemoveBooking(id);
            setBookings((prev) => prev.filter((b) => b.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelEdit = () => {
        setEditingBooking(null);
        setStartDate("");
        setEndDate("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingBooking) return;

        setLoading(true);

        const updatedPayload: DraftBooking = {
            clientId: editingBooking.client.id,
            vehicleId: editingBooking.vehicle.id,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        };

        try {
            const updated = await updateBooking(editingBooking.id, updatedPayload);
            if (updated) {
                setBookings((prev) => prev.map((b) => (b.id === editingBooking.id ? updated : b)));
            }
            handleCancelEdit();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>

            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {editingBooking ? `Editar Reserva #${editingBooking.id}` : "Gestión de Reservas"}
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                    {editingBooking
                        ? "Modifica las fechas de la reserva seleccionada."
                        : "Selecciona 'Editar' en una tarjeta."}
                </p>

                {editingBooking ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Información fija de lectura */}
                        <div className="p-3 bg-gray-50 rounded-xl space-y-1 text-xs border border-gray-100">
                            <p className="text-gray-500">
                                <span className="font-semibold text-gray-700">Cliente:</span>{" "}
                                {editingBooking.client?.name} {editingBooking.client?.lastname}
                            </p>
                            <p className="text-gray-500">
                                <span className="font-semibold text-gray-700">Vehículo:</span>{" "}
                                {editingBooking.vehicle?.brand} {editingBooking.vehicle?.model}
                            </p>
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

                        <div className="space-y-2 pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors"
                            >
                                {loading ? "Guardando..." : "Actualizar Fechas"}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="w-full py-2 px-4 bg-gray-100 text-gray-600 font-semibold rounded-xl text-xs hover:bg-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center py-8 text-gray-400 border border-dashed border-gray-200 rounded-xl">
                        <span className="text-3xl">📋</span>
                        <p className="mt-2 text-xs">Selecciona una reserva para editar su información.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookingView;
