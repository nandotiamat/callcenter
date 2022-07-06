import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

export const Profile = () => {
  const {user, setUser, logout, isLoading} = useAuth()
  const navigate = useNavigate()
  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate("/login", {replace: true})
  }

  return (
    user ?
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
      </section>
      : <Navigate to="/login" />)
} 