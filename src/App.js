import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import { UserContext } from "./UserContext";
import axios from "axios";
import { Profile } from "./Profile";

function App() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:80/api/index.php", {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
      },
      params: {
        type: "fetch-session"
      }
    }).then((response) => {
      if (response.status == 200) {
        if (response.data["jwt-validate"]) {
          setUser(response.data["user"])
        }
      }
    })
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        <Routes>
          {/* <Route path="/" element={<PrivateRoute />}> */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          {/* </Route>      */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
