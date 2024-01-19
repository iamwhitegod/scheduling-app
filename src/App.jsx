import { IconContext } from "@phosphor-icons/react";
import "./App.css";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Timer from "./pages/Timer";
import Events from "./pages/Events";
import ProtectedRoutes from "./ProtectedRoutes";
import EventProvider from "./context/event";

function App() {
  return (
    <>
      <EventProvider>
        <IconContext.Provider
          value={{
            color: "#214A61",
            size: 24,
            weight: "fill",
            mirrored: false,
          }}
        >
          <Routes>
            <Route
              exact
              path="/events"
              element={
                <ProtectedRoutes>
                  <Events />{" "}
                </ProtectedRoutes>
              }
            />

            <Route
              exact
              path="/events/:id"
              element={
                <ProtectedRoutes>
                  <Events />{" "}
                </ProtectedRoutes>
              }
            />

            <Route
              exact
              path="/timer"
              element={
                <ProtectedRoutes>
                  <Timer />
                </ProtectedRoutes>
              }
            />

            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/signin" element={<SignIn />} />
          </Routes>
        </IconContext.Provider>
      </EventProvider>
    </>
  );
}

export default App;
