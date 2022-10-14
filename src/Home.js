import React, { useContext, useEffect, useState } from "react";
import { FaDatabase, FaFile, FaFileExcel, FaPhone } from "react-icons/fa";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from './images/logo.png';

export default function Home() {
  const { user } = useContext(UserContext)
  const [numberOfAvailableClients, setNumberOfAvailableClients] = useState(0);
  const [numberOfExecutedPhonecalls, setNumberOfExecutedPhonecalls] = useState(0);
  const [numberOfPositiveOutcomes, setNumberOfPositiveOutcomes] = useState(0);
  const [numberOfNegativeOutcomes, setNumberOfNegativeOutcomes] = useState(0);
  const navigate = useNavigate();

  const handleOnClick = (e) => {
    e.preventDefault()
    navigate(e.target.value)
  }

  const handleCallClientButton = (e) => {
    e.preventDefault()
    navigate("/chiamata")
  }

  useEffect(() => {
    axios.get("http://localhost:80/api/index.php", {
      params: {
        type: "get-clients-number"
      }
    }).then((result) => setNumberOfAvailableClients(result.data["COUNT(*)"]));

    axios.get("http://localhost:80/api/index.php", {
      params: {
        id: user["user_id"],
        type: "get-executed-phonecall-number",
      }
    }).then((response) => setNumberOfExecutedPhonecalls(response.data["COUNT(*)"]))

    axios.get("http://localhost:80/api/index.php", {
      params: {
        id: user["user_id"],
        type: "get-positive-outcomes-number"
      }
    }).then((response) => setNumberOfPositiveOutcomes(response.data["COUNT(*)"]));


    axios.get("http://localhost:80/api/index.php", {
      params: {
        id: user["user_id"],
        type: "get-negative-outcomes-number"
      }
    }).then((response) => setNumberOfNegativeOutcomes(response.data["COUNT(*)"]));
  }, []);


  return (
    <section className="hero is-fullheight has-background-danger">
      <div className="p-2">
        <button className="button is-danger" value={"/profile"} onClick={handleOnClick}>PROFILO</button>
        <button className="button is-danger" value={"/telefonate"} onClick={handleOnClick}>VISUALIZZA TELEFONATE</button>

        <>
          <button className="button is-danger" value={"/gestisci_utenti"} onClick={handleOnClick}>{user.is_admin === 1 ? "GESTISCI" : "VISUALIZZA"} UTENTI</button>
          <button className="button is-danger" value={"/gestisci_prodotti"} onClick={handleOnClick}>{user.is_admin === 1 ? "GESTISCI" : "VISUALIZZA"} PRODOTTI</button>
          <button className="button is-danger" value={"/gestisci_aziende"} onClick={handleOnClick}>{user.is_admin === 1 ? "GESTISCI" : "VISUALIZZA"} AZIENDE</button>
        </>

      </div>
      <div className="hero-body container">
        <div className="is-flex is-flex-direction-column has-text-white has-text-centered">
          <figure>
            <img src={logo} alt="logo" width={400}/>
          </figure>
          <span className="title">Benvenuto, {user ? user["username"] : "nada"}</span>
          <div className="box">
            <div className="is-flex">
              <div className="is-flex">
                <FaDatabase size={48} className="m-2" />
                <div className="is-flex is-flex-direction-column">
                  <span>Clienti disponibili:</span>
                  <span className="is-size-3">{numberOfAvailableClients}</span>
                </div>
              </div>
              <div className="is-flex">
                <FaPhone size={48} className="m-2" />
                <div className="is-flex is-flex-direction-column">
                  <span>Chiamate effettuate:</span>
                  <span className="is-size-3">{numberOfExecutedPhonecalls}</span>
                </div>
              </div>
              <div className="is-flex">
                <FaFile size={48} className="m-2" />
                <div className="is-flex is-flex-direction-column">
                  <span>Esiti positivi:</span>
                  <span className="is-size-3">{numberOfPositiveOutcomes}</span>
                </div>
              </div>
              <div className="is-flex">
                <FaFileExcel size={48} className="m-2" />
                <div className="is-flex is-flex-direction-column">
                  <span>Esiti negativi:</span>
                  <span className="is-size-3">{numberOfNegativeOutcomes}</span>
                </div>
              </div>
            </div>
            <div className="has-text-centered p-2">
              <button className="button is-danger is-large is-fullwidth" onClick={handleCallClientButton}>Chiama un cliente</button>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}
