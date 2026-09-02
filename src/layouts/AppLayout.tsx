import { NavLink, Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 min-h-screen">
            <header className="mb-12 text-center">
                <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight mb-3">Ruta libre</h1>
                <p className="text-lg text-gray-500 mb-8">Tu próximo destino empieza sobre cuatro ruedas</p>

                <nav className="flex justify-center gap-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-5 py-2.5 rounded-lg font-medium transition-colors ${
                                isActive
                                    ? "bg-gray-900 text-white shadow-sm"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                            }`
                        }
                    >
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/booking"
                        className={({ isActive }) =>
                            `px-5 py-2.5 rounded-lg font-medium transition-colors ${
                                isActive
                                    ? "bg-gray-900 text-white shadow-sm"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                            }`
                        }
                    >
                        Reservas
                    </NavLink>

                    <NavLink
                        to="/client"
                        className={({ isActive }) =>
                            `px-5 py-2.5 rounded-lg font-medium transition-colors ${
                                isActive
                                    ? "bg-gray-900 text-white shadow-sm"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                            }`
                        }
                    >
                        Clientes
                    </NavLink>

                    <NavLink
                        to="/vehicle"
                        className={({ isActive }) =>
                            `px-5 py-2.5 rounded-lg font-medium transition-colors ${
                                isActive
                                    ? "bg-gray-900 text-white shadow-sm"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                            }`
                        }
                    >
                        Vehículos
                    </NavLink>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;
