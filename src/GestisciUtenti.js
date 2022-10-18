import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const GestisciUtenti = () => {
    const { user } = useContext(UserContext)
    const [dipendenti, setDipendenti] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:80/api/index.php", {
            params: {
                type: "get-all-users"
            }
        }).then((response) => setDipendenti(response.data));
    }, [])

    const handleUpdate = (index) => {
        navigate("/update_user", {
            state: {
                user: dipendenti[index]
            }
        })
    }

    const handleDelete = (index) => {
        const user_id_to_delete = dipendenti[index].user_id;
        
        axios.delete("http://localhost:80/api/delete-user.php", {
            data: {
                id: user_id_to_delete,
            }
        })

        const array = [...dipendenti];
        const removed_user = array.splice(index, 1);
        setDipendenti(array);
        alert(removed_user[0]["username"] + " correttamente rimosso.")
    }

    const handleCreateUser = () => {
        navigate("/create_user");
    }


    return (
        <section className="hero is-danger is-fullheight" >
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="is-5-tablet is-4-desktop is-3-widescreen">
                            <div className="box">
                                <div className="has-text-centered">
                                    <span className="is-size-3">Dipendenti della Dunder Mifflin</span>
                                </div>
                                <div className="p-2">
                                    <table className="table mt-4">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nominativo</th>
                                                <th>Username</th>
                                                <th>Data di nascita</th>
                                                <th>Salario</th>
                                                <th>Admin</th>
                                                {user.is_admin == 1 ? <th>Operazioni</th> : null}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {dipendenti.map((dipendente, index) => {
                                                return (
                                                    <>
                                                        <tr key={index} className="has-text-centered">
                                                            <td >{dipendente.user_id}</td>
                                                            <td >{dipendente.name + " " + dipendente.surname}</td>
                                                            <td >{dipendente.username}</td>
                                                            <td >{dipendente.date_of_birth}</td>
                                                            <td >{dipendente.salary}</td>
                                                            <td >{dipendente.is_admin == 1 ? <FaCheck color="green"/> : null}</td>
                                                            {user.is_admin == 1 ? <td><div>{<FaPen onClick={() => handleUpdate(index)} className="mr-5"/> }{<FaTrash onClick={() => handleDelete(index)}/>}</div></td> : null}
                                                        </tr>
                                                    </>
                                                );

                                            })}
                                        </tbody>
                                    </table>
                                    {user.is_admin == 1 ? <button onClick={handleCreateUser} className="button is-danger is-fullwidth" >Crea dipendente</button> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
} 