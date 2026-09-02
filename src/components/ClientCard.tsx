import { type Client } from "../types";

type Props = {
    client: Client;
    onEdit?: (client: Client) => void;
    onDelete?: (id: number) => void;
};

function ClientCard({ client, onEdit, onDelete }: Props) {
    const formattedDate = client.license?.expirationDate
        ? new Date(client.license.expirationDate).toISOString().split("T")[0]
        : "N/A";

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
            <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm border border-indigo-100">
                        {(client.name?.[0] || "").toUpperCase()}
                        {(client.lastname?.[0] || "").toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                            {client.name} {client.lastname}
                        </h3>
                    </div>
                </div>

                <div className="space-y-2 py-3 border-t border-b border-gray-100 text-sm text-gray-600">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">🪪 Licencia:</span>
                        <span className="font-semibold text-gray-800">{client.license?.type || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">📅 Vencimiento:</span>
                        <span className="font-mono text-xs">{formattedDate}</span>
                    </div>
                </div>
            </div>

            <div className="px-5 pb-5 pt-2 bg-gray-50/50 border-t border-gray-50">
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => onEdit?.(client)}
                        className="py-1.5 px-3 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                    >
                        ✏️ Editar
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete?.(client.id)}
                        className="py-1.5 px-3 text-xs font-medium text-red-600 bg-white border border-gray-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ClientCard;
