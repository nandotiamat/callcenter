import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PrivateRoute />}> */}
        <Route exact path="/" element={<Home />} />
        {/* </Route>      */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
