import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { Profile } from "./Profile";
import PrivateOutlet from "./PrivateOutlet";
import AuthProvider from "./hooks/useAuth";
import EsitoChiamata from "./EsitoChiamata";
import Chiamata from "./Chiamata";
import { Telefonate } from "./Telefonate";
import { GestisciUtenti } from "./GestisciUtenti";
import { UpdateUser } from "./UpdateUser";
import { CreateUser } from "./CreateUser";
import { GestisciProdotti } from "./GestisciProdotti";
import { CreateProduct } from "./CreateProduct";
import { UpdateProduct } from "./UpdateProduct";
import { GestisciAziende } from "./GestisciAziende";
import { CreateCorporation } from "./CreateCorporation";
import { UpdateCorporation } from "./UpdateCorporation";
import AdminOutlet from "./AdminOutlet";
import { GestisciClienti } from "./GestisciClienti";
import { CreateClient } from "./CreateClient";
import { UpdateClient } from "./UpdateClient";

function App() {

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
              <Route exact path="/telefonate" element={<Telefonate />} />
              <Route exact path="/gestisci_utenti" element={<GestisciUtenti />} />
              <Route exact path="/gestisci_prodotti" element={<GestisciProdotti />} />
              <Route exact path="/gestisci_aziende" element={<GestisciAziende />} />
              <Route exact path="/gestisci_clienti" element={<GestisciClienti />} />
              <Route path="/" element={<AdminOutlet />}>
                <Route exact path="/create_user" element={<CreateUser />} />
                <Route exact path="/update_user" element={<UpdateUser />} />
                <Route exact path="/create_product" element={<CreateProduct />} />
                <Route exact path="/update_product" element={<UpdateProduct />} />
                <Route exact path="/create_corporation" element={<CreateCorporation/>} />
                <Route exact path="/update_corporation" element={<UpdateCorporation/>} />
                <Route exact path="/create_client" element={<CreateClient />} />
                <Route exact path="/update_client" element={<UpdateClient />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>

  );
}

export default App;
