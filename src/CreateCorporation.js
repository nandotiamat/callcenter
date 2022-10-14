import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const CreateCorporation = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const location = useLocation();
    const [name, setName] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:80/api/create-corporation.php", {
            data: {
                name: name,
            }
        }).then((response) => {
            if (response.data == 1) {
                alert(name + " aggiunta con successo.");
            } else {
                alert("Errore nell'aggiunta dell'azienda.");
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
                                <button type="submit" className="is-fullwidth button is-danger">Aggiungi azienda</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
} 