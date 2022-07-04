import React, { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaFingerprint, FaLock } from 'react-icons/fa';

export default function Login() {
  const usernameDipendenteRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    navigate("/", { replace: true })  
    setLoading(false)
  }

  return (
  
    <section className="hero is-primary is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form onSubmit={handleSubmit} className="box">
                <div className="field">
                  <label className="label">
                    Username
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="text"
                      placeholder="Inserirsci il tuo username..."
                      className="input"
                      ref={usernameDipendenteRef}
                      required
                    />
                    <span className="icon is-small is-left">
                      <FaFingerprint/>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">
                    Password
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      placeholder="Inserisci la tua password..."
                      className="input"
                      ref={passwordRef}
                      required
                    />
                    <span className="icon is-small is-left">
                      <FaLock/>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <button className="button is-success is-fullwidth" disabled={loading}>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) 
}