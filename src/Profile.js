import React, { useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { UserContext } from "./UserContext";

export const Profile = () => {
  const {user, logout} = useContext(UserContext)
  const navigate = useNavigate()
  
  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate("/login", {replace: true})
  }

  return (
      <section className="hero is-danger is-fullheight" >
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <div className="box">
                  <span className="is-size-3">Profilo</span>
                  <div className="p-2">
                    <div>
                      <strong>Username</strong>: {user["Username"]}
                    </div>
                    <div>
                      <strong>Nome</strong>: {user["Nome"]}
                    </div>
                    <div>
                      <strong>Cognome</strong>: {user["Cognome"]}
                    </div>
                    <div>
                      <strong>Stipendio</strong>: {user["Stipendio"]}
                    </div>
                    <div>
                      <strong>Data di nascita</strong>: {user["Data di nascita"]}
                    </div>
                  </div>
                  <button onClick={handleLogout} className="is-fullwidth button is-danger">LOGOUT</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>)
} 