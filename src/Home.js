import React from "react";
import { FaDatabase, FaFile, FaFileExcel, FaPhone } from "react-icons/fa";
export default function Home() {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body is-flex is-flex-direction-column has-text-white has-background-danger">
        <h1 className="title">DUNDER MIFFLIN</h1>
          <span className="subtitle">Benvenuto, Username</span>
        <div className="box">
          <div className="is-flex mt-6">
            <div className="is-flex">
              <FaDatabase size={48} className="m-2"/>
              <div className="is-flex is-flex-direction-column">
                <span>Clienti disponibili:</span>
                <span className="is-size-3">555</span>
              </div>
            </div>
            <div className="is-flex">
              <FaPhone size={48} className="m-2"/>
              <div className="is-flex is-flex-direction-column">
                <span>Chiamate effettuate:</span>
                <span className="is-size-3">48</span>
              </div>
            </div>
            <div className="is-flex">
              <FaFile size={48} className="m-2"/>
              <div className="is-flex is-flex-direction-column">
                <span>Esiti positivi:</span>
                <span className="is-size-3">18</span>
              </div>
            </div>
            <div className="is-flex">
              <FaFileExcel size={48} className="m-2"/>
              <div className="is-flex is-flex-direction-column">
                <span>Esiti negativi:</span>
                <span className="is-size-3">30</span>
              </div>
            </div>
          </div>
          <div className="has-text-centered p-2">
            <button className="button is-danger is-large">Chiama un cliente</button>
          </div>
        </div>
      </div>
    </section>
  )
}
