import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCheck, FaPen, FaTrash, FaYoutubeSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const GestisciAziende = () => {
    const { user } = useContext(UserContext)
    const [corporations, setCorporations] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:80/api/index.php", {
            params: {
                type: "get-all-corporations"
            }
        }).then((response) => setCorporations(response.data));
    }, [])

    const handleUpdate = (index) => {
        navigate("/update_corporation", {
            state: {
                corporation: corporations[index]
            }
        })
    }

    const handleDelete = (index) => {
        const corporate_id_to_delete = corporations[index].corporate_id;
        
        axios.delete("http://localhost:80/api/delete-corporation.php", {
            data: {
                id: corporate_id_to_delete,
            }
        })

        const array = [...corporations];
        const removed_user = array.splice(index, 1);
        setCorporations(array);
        alert(removed_user[0]["product_name"] + " correttamente rimosso.")
    }

    const handleCreateCorporation = () => {
        navigate("/create_corporation");
    }


    return (
        <section className="hero is-danger is-fullheight" >
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="is-5-tablet is-4-desktop is-3-widescreen">
                            <div className="box">
                                <div className="has-text-centered">
                                    <span className="is-size-3">Aziende</span>
                                </div>
                                <div className="p-2">
                                    <table className="table mt-4">
                                        <thead>
                                            <tr>
                                                <th>ID Azienda</th>
                                                <th>Nome</th>
                                                {user.is_admin === 1 ? <th>Operazioni</th> : null}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {corporations.map((corporation, index) => {
                                                return (
                                                    <>
                                                        <tr key={index} >
                                                            <td >{corporation.corporate_id}</td>
                                                            <td >{corporation.name}</td>
                                                            {user.is_admin === 1 ? <td><div>{<FaPen onClick={() => handleUpdate(index)} className="mr-5"/> }{<FaTrash onClick={() => handleDelete(index)}/>}</div></td> : null}
                                                        </tr>
                                                    </>
                                                );

                                            })}
                                        </tbody>
                                    </table>
                                    {user.is_admin === 1 ? <button onClick={handleCreateCorporation} className="button is-danger is-fullwidth" >Aggiungi azienda</button> : null }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
} 