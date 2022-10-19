import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const UpdateClient = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [name, setName] = useState(location.state.client.name);
    const [surname, setSurname] = useState(location.state.client.surname);
    const [phoneNumber, setPhoneNumber] = useState(location.state.client.phone_number);
    const [birthday, setBirthday] = useState(location.state.client.date_of_birth);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:80/api/update-client.php", {
            data: {
                id: location.state.client.id,
                name: name,
                surname: surname,
                birthday: birthday,
                phone_number: phoneNumber,
            }
        }).then((response) => {
            if (response.data === 1) {
                alert(name + " " + surname + " aggiornato con successo.");
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
                                            Numero di telefono
                                            <input className="input" onChange={event => setPhoneNumber(event.target.value)} type="text" value={phoneNumber} />
                                        </label>
                                    </div>
                                    <div className="field">
                                        <label className="label">
                                            Data di nascita
                                            <input className="input" onChange={event => setBirthday(event.target.value)} type="date" min="1900-01-01" max="2005-01-01" value={birthday} />
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="is-fullwidth button is-danger">Update client</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
} 