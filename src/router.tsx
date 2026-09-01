import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import ClientView from "./views/ClientView";
import VehicleView from "./views/VehicleView";
import AppLayout from "./layouts/AppLayout";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<HomeView />}></Route>
                    <Route path="/client" element={<ClientView />}></Route>
                    <Route path="/vehicle" element={<VehicleView />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
