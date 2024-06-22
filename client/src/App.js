import { Suspense, useState } from "react";
import "./App.css";
import Website from "./pages/Website";
import Layouts from "./components/Layouts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Properties from "./pages/Properties";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property";
import UserDetailContext from "./context/UserDetailContext";
import Bookings from "./pages/Bookings";
import Favourites from "./pages/Favourites";
import LoaderView from "./components/LoaderView";

function App() {
  const queryClient = new QueryClient();

  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });
  console.log(userDetails);

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<LoaderView />}>
            <Routes>
              <Route element={<Layouts />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favorites" element={<Favourites />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;
