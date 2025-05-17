import { Outlet, Route, Routes } from "react-router-dom";
import { EmployeeNav } from "../components/nav/EmployeeNav.jsx";
import { Welcome } from "../components/welcome/Welcome.jsx";
import { Load } from "../components/loads/Loads.jsx";
import { LoadDetails } from "../components/loads/LoadDetails.jsx";
import { useEffect, useState } from "react";
import { LoadForm } from "../components/forms/LoadForm.jsx";
import { DispatcherList } from "../components/dispatcher/Dispatcher.jsx";
import { DispatcherDetails } from "../components/dispatcher/DispatcherDetails.jsx";
import { Truck } from "../components/trucks/Truck.jsx";
import { TruckDetails } from "../components/trucks/TruckDetails.jsx";
import { TruckForm } from "../components/forms/TruckForm.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localDispatcherUser = localStorage.getItem("dispatcher_user");
    const dispatcherUserObject = JSON.parse(localDispatcherUser);

    setCurrentUser(dispatcherUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <EmployeeNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        
        <Route path="loads">
          <Route index element={<Load currentUser={currentUser} />} />
          <Route
            path=":loadId"
            element={<LoadDetails currentUser={currentUser} />}
          />
          <Route path="form" element={<LoadForm currentUser={currentUser} />} />
          <Route
            path="form/:loadId"
            element={<LoadForm currentUser={currentUser} />}
          />
        </Route>

        <Route path="dispatchers">
          <Route index element={<DispatcherList />} />
          <Route path=":dispatcherId" element={<DispatcherDetails />} />
        </Route>

        <Route path="trucks">
          <Route index element={<Truck />} />
          <Route path="form" element={<TruckForm />} />
          <Route path=":truckId" element={<TruckDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};
