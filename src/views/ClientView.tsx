import { useEffect, useState } from "react";
import { type Client, type DraftClient } from "../types";
import { getClients, createClient, updateClient, removeClient } from "../services/clientService";
import ClientCard from "../components/ClientCard";

type FormClientState = {
    name: string;
    lastname: string;
    licenseType: string;
    expirationDate: string;
};

const INITIAL_FORM: FormClientState = {
    name: "",
    lastname: "",
    licenseType: "Clase B",
    expirationDate: new Date().toISOString().split("T")[0],
};

function ClientView() {
    const [clients, setClients] = useState<Client[]>([]);
    const [formData, setFormData] = useState<FormClientState>(INITIAL_FORM);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getClients()
            .then((data) => setClients(data || []))
            .catch((err) => console.error(err));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = (client: Client) => {
        setEditingId(client.id);

        let dateStr = new Date().toISOString().split("T")[0];
        if (client.license?.expirationDate) {
            dateStr = new Date(client.license.expirationDate).toISOString().split("T")[0];
        }

        setFormData({
            name: client.name ?? "",
            lastname: client.lastname ?? "",
            licenseType: client.license?.type ?? "Clase B",
            expirationDate: dateStr,
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm("¿Deseas eliminar este cliente?")) return;
        try {
            await removeClient(id);
            setClients((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const clientPayload: DraftClient = {
            name: formData.name,
            lastname: formData.lastname,
            license: {
                type: formData.licenseType,
                expirationDate: new Date(formData.expirationDate),
            },
        };

        try {
            if (editingId) {
                const updated = await updateClient(editingId, clientPayload);
                if (updated) {
                    setClients((prev) => prev.map((c) => (c.id === editingId ? updated : c)));
                }
                setEditingId(null);
            } else {
                const newClient = await createClient(clientPayload);
                if (newClient) {
                    setClients((prev) => [...prev, newClient]);
                }
            }
            setFormData(INITIAL_FORM);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {clients.map((client) => (
                    <ClientCard key={client.id} client={client} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>

            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {editingId ? "Editar Cliente" : "Nuevo Cliente"}
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                    {editingId ? "Modifica los datos del cliente." : "Registra un nuevo cliente."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Apellido</label>
                        <input
                            type="text"
                            name="lastname"
                            required
                            value={formData.lastname}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="border-t border-gray-100 pt-3 mt-3">
                        <span className="block text-xs font-bold text-indigo-600 uppercase mb-2">
                            Licencia de Conducir
                        </span>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Tipo de Licencia</label>
                                <input
                                    type="text"
                                    name="licenseType"
                                    required
                                    value={formData.licenseType}
                                    onChange={handleChange}
                                    placeholder="Ej. Clase B"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Fecha de Vencimiento
                                </label>
                                <input
                                    type="date"
                                    name="expirationDate"
                                    required
                                    value={formData.expirationDate}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
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
                                    setFormData(INITIAL_FORM);
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

export default ClientView;
