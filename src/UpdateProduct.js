import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const UpdateProduct = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const [name, setName] = useState(location.state.product.product_name);
    const [description, setDescription] = useState(location.state.product.description);
    const [corporateID, setCorporateID] = useState(location.state.product.corporate_id);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:80/api/update-product.php", {
            data: {
                product_id: location.state.product.product_id,
                name: name,
                description: description,
                corporate_id: corporateID,
            }
        }).then((response) => {
            if (response.data === 1) {
                alert(name + " aggiornato con successo.");
            } else {
                alert("Errore nell'aggiornamento del prodotto");
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
                                <button type="submit" className="is-fullwidth button is-danger">Aggiorna prodotto</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
} 