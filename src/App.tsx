import "./App.scss";
import "./responsive.scss";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { PrivateRoutes } from "./routers";

const App = () => {
  console.log("env:", process.env.REACT_PUBLIC_ENV);
  const location = useLocation();
  return (
    <div className="app-wrapper">
      <Routes>
        {PrivateRoutes.map((item: any, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>

      {/* <Footer /> */}
    </div>
  );
};

export default App;
