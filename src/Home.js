import React, { useContext } from "react";
import { FaDatabase, FaFile, FaFileExcel, FaPhone } from "react-icons/fa";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  const handleOnClick = (e) => {
    e.preventDefault()
    navigate("/profile")
  }

  const handleCallClientButton = (e) => {
    e.preventDefault()
    navigate("/chiamata")
  }  

  return (
    <section className="hero is-fullheight has-background-danger">
      <div className="p-2">
        <button className="button is-danger is-light" onClick={handleOnClick}>PROFILO</button>
      </div>
      <div className="hero-body container">
        <div className="is-flex is-flex-direction-column has-text-white has-text-centered">
          <h1 className="title">DUNDER MIFFLIN</h1>
          <span className="subtitle">Benvenuto, {user ? user["Username"] : "nada"}</span>
          <div className="box">
            <div className="is-flex">
              <div className="is-flex">
                <FaDatabase size={48} className="m-2" />
                <div className="is-flex is-flex-direction-column">
                  <span>Clienti disponibili:</span>
                  <span className="is-size-3">555</span>
                </div>
              </div>
              <div className="is-flex">
                <FaPhone size={48} className="m-2" />
                <div className="is-flex is-flex-direction-column">
                  <span>Chiamate effettuate:</span>
                  <span className="is-size-3">48</span>
                </div>
              </div>
              <div className="is-flex">
                <FaFile size={48} className="m-2" />
                <div className="is-flex is-flex-direction-column">
                  <span>Esiti positivi:</span>
                  <span className="is-size-3">18</span>
                </div>
              </div>
              <div className="is-flex">
                <FaFileExcel size={48} className="m-2" />
                <div className="is-flex is-flex-direction-column">
                  <span>Esiti negativi:</span>
                  <span className="is-size-3">30</span>
                </div>
              </div>
            </div>
            <div className="has-text-centered p-2">
              <button className="button is-danger is-large" onClick={handleCallClientButton}>Chiama un cliente</button>
            </div>
          </div>
        </div>
      </div>
    </section > 
  )
}
