import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import md5 from "md5";

export const CreateUser = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [salary, setSalary] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [password, setPassword] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:80/api/create-user.php", {
            data: {
                name: name,
                surname: surname,
                username: username,
                birthday: birthday,
                salary: salary,
                is_admin: isAdmin == true ? 1 : 0,
                password: md5(password),
            }
        }).then((response) => {
            if (response.data == 1) {
                alert(username + " creato con successo.");
            } else {
                alert("Errore nella creazione dell'utente");
            }
            navigate(-1);
        }
        )
    }

    return (
        <section className="hero is-danger is-fullheight" >
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-tablet is-4-desktop is-4-widescreen">
                            <form onSubmit={handleSubmit} className="box">
                                <div className="p-2">
                                    <div className="field">
                                        <label className="label">
                                            Nome
                                            <input className="input" onChange={event => setName(event.target.value)} type="text" value={name} />
                                        </label>
                                    </div>
                                    <div className="field">
                                        <label className="label">
                                            Cognome
                                            <input className="input" onChange={event => setSurname(event.target.value)} type="text" value={surname} />
                                        </label>
                                    </div>
                                    <div className="field">
                                        <label className="label">
                                            Username
                                            <input className="input" onChange={event => setUsername(event.target.value)} type="text" value={username} />
                                        </label>
                                    </div>
                                    <div className="field">
                                        <label className="label">
                                            Data di nascita
                                            <input className="input" onChange={event => setBirthday(event.target.value)} type="date" min="1900-01-01" max="2005-01-01" value={birthday} />
                                        </label>
                                    </div>
                                    <div className="field">
                                        <label className="label">
                                            Stipendio
                                            <input className="input" onChange={event => setSalary(event.target.value)} type="text" value={salary} />
                                        </label>
                                    </div>
                                    <div className="field">
                                        <label className="label">
                                            Password
                                            <input className="input" onChange={event => setPassword(event.target.value)} type="password" value={password} />
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label className="label">
                                            È admin?
                                            <input className="checkbox ml-2" onChange={event => setIsAdmin(event.target.checked)} type="checkbox" checked={isAdmin} />
                                        </label>
                                    </div>

                                </div>
                                <button type="submit" className="is-fullwidth button is-danger">Create User</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
} 