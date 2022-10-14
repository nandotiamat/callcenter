import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const UpdateUser = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [name, setName] = useState(location.state.user.name);
    const [surname, setSurname] = useState(location.state.user.surname);
    const [username, setUsername] = useState(location.state.user.username);
    const [birthday, setBirthday] = useState(location.state.user.date_of_birth);
    const [salary, setSalary] = useState(location.state.user.salary);
    const [isAdmin, setIsAdmin] = useState(location.state.user.is_admin === 1 ? true : false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:80/api/update-user.php", {
            data: {
                user_id: location.state.user.user_id,
                name: name,
                surname: surname,
                username: username,
                birthday: birthday,
                salary: salary,
                is_admin: isAdmin === true ? 1 : 0,
            }
        }).then((response) => {
            if (response.data === 1) {
                alert(username + " aggiornato con successo.");
            } else {
                alert("Errore nell'update dell'utente selezionato");
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
                        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
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
                                            <input className="input" onChange={event => setBirthday(event.target.value)} type="date" value={birthday} />
                                        </label>
                                    </div>
                                    <div className="field">
                                        <label className="label">
                                            Stipendio
                                            <input className="input" onChange={event => setSalary(event.target.value)} type="text" value={salary} />
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label className="label">
                                            È admin?
                                            <input className="checkbox ml-2" onChange={event => setIsAdmin(event.target.checked)} type="checkbox" checked={isAdmin} />
                                        </label>
                                    </div>

                                </div>
                                <button type="submit" className="is-fullwidth button is-danger">Update User</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
} 