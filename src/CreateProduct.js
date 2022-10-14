import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateProduct = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [corporateID, setCorporateID] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:80/api/create-product.php", {
            data: {
                name: name,
                description: description,
                corporate_id: corporateID,
            }
        }).then((response) => {
            if (response.data === 1) {
                alert(name + " creato con successo.");
            } else {
                alert("Errore nella creazione del prodotto");
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
                                            Descrizione
                                            <textarea className="textarea" onChange={event => setDescription(event.target.value)} type="text" value={description} />
                                        </label>
                                    </div>
                                    <div className="field">
                                        <label className="label">
                                            ID Azienda
                                            <input className="input" onChange={event => setCorporateID(event.target.value)} type="text" value={corporateID} />
                                        </label>
                                    </div>
                                <button type="submit" className="is-fullwidth button is-danger">Aggiungi prodotto</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
} 