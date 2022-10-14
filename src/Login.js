import React, { useContext, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaFingerprint, FaLock } from 'react-icons/fa';
import axios from "axios";
import md5 from "md5";
import { UserContext } from "./UserContext";

export default function Login() {
  const { user, setUser } = useContext(UserContext)
  const [error, setError] = useState("")
  const usernameDipendenteRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const hashedPassword = md5(passwordRef.current.value)
    axios.get("http://localhost:80/api/index.php", {
      params: {
        type: "user-login",
        data: {
          username: usernameDipendenteRef.current.value,
          password: hashedPassword
        }

      }
    })
      .then((response) => {
        window.localStorage.setItem("JWT", response.data["jwt"])
        window.localStorage.setItem("user", JSON.stringify(response.data["user"]))
        setUser(response.data["user"])
        navigate("/", { replace: true })
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status == 401) {
            setError("Credenziali sbagliate.")
          }
        }
      })
    setLoading(false)
  }

  return (
    user ? <Navigate to="/" /> :
      <section className="hero is-danger is-fullheight" >
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <form onSubmit={handleSubmit} className="box">
                  {error && <span className="has-text-danger">{error}</span>}
                  <div className="field">
                    <label className="label">
                      Username
                    </label>
                    <div className="control has-icons-left">
                      <input
                        type="text"
                        placeholder="Inserire username"
                        className="input"
                        ref={usernameDipendenteRef}
                        required
                      />
                      <span className="icon is-small is-left">
                        <FaFingerprint />
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
                        placeholder="Inserire password"
                        className="input"
                        ref={passwordRef}
                        required
                      />
                      <span className="icon is-small is-left">
                        <FaLock />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <input type="submit" className="button is-danger is-fullwidth" disabled={loading} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}