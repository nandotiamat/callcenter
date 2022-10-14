import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const UpdateCorporation = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [name, setName] = useState(location.state.corporation.name);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:80/api/update-corporation.php", {
            data: {
                corporate_id: location.state.corporation.corporate_id,
                name: name,
            }
        }).then((response) => {
            if (response.data === 1) {
                alert(name + " aggiornata con successo.");
            } else {
                alert("Errore nell'aggiornamento dell'azienda.");
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
                                <button type="submit" className="is-fullwidth button is-danger">Aggiorna azienda</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
} 