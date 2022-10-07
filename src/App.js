import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { UserContext } from "./UserContext";
import axios from "axios";
import { Profile } from "./Profile";
import PrivateOutlet from "./PrivateOutlet";
import AuthProvider from "./hooks/useAuth";
import EsitoChiamata from "./EsitoChiamata";
import Chiamata from "./Chiamata";

function App() {

  // useEffect(() => { axios.get("http://localhost:80/api/index.php", {
  //     headers: {
  //       Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
  //     },
  //     params: {
  //       type: "fetch-session"
  //     }
  //   }).then((response) => {
  //     if (response.status == 200) {
  //       if (response.data["jwt-validate"]) {
  //         setUser(response.data["user"])
  //       }
  //     }
  //   })
  // }, [])

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateOutlet />}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/chiamata" element={<Chiamata/>} />
              <Route exact path="/compila_esito" element={<EsitoChiamata/>} />
              <Route exact path="/profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>

  );
}

export default App;
