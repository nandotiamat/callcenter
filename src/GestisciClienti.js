import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { UserContext } from "./UserContext";

export const GestisciClienti = () => {
    const { user } = useContext(UserContext)
    const [clienti, setClienti] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);// No of Records to be displayed on each page   
    const [recordsPerPage] = useState(100);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentClients = clienti.slice(indexOfFirstRecord, indexOfLastRecord);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:80/api/index.php", {
            params: {
                type: "get-all-clients"
            }
        }).then((response) => setClienti(response.data));
    }, [])

    const handleUpdate = (index) => {
        navigate("/update_client", {
            state: {
                client: clienti[index]
            }
        })
    }

    const handleDelete = (index) => {
        const client_id_to_delete = clienti[index].id;
        
        axios.delete("http://localhost:80/api/delete-client.php", {
            data: {
                id: client_id_to_delete,
            }
        })

        const array = [...clienti];
        const removed_user = array.splice(index, 1);
        setClienti(array);
        alert(removed_user[0]["name"] + " " + removed_user[0]["surname"] + " correttamente rimosso.")
    }

    const handleCreateUser = () => {
        navigate("/create_client");
    }


    return (
        <section className="hero is-danger is-fullheight" >
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="is-5-tablet is-4-desktop is-3-widescreen">
                            <div className="box">
                                <div className="has-text-centered">
                                    <span className="is-size-3">Clienti</span>
                                </div>
                                <div className="p-2">
                                    <table className="table mt-4">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nominativo</th>
                                                <th>Data di nascita</th>
                                                <th>Numero di telefono</th>
                                                {user.is_admin == 1 ? <th>Operazioni</th> : null}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {currentClients.map((cliente, index) => {
                                                return (
                                                    <>
                                                        <tr key={index} className="has-text-centered">
                                                            <td >{cliente.id}</td>
                                                            <td >{cliente.name + " " + cliente.surname}</td>
                                                            <td >{cliente.date_of_birth}</td>
                                                            <td >{cliente.phone_number}</td>
                                                            {user.is_admin == 1 ? <td><div>{<FaPen onClick={() => handleUpdate(index)} className="mr-5"/> }{<FaTrash onClick={() => handleDelete(index)}/>}</div></td> : null}
                                                        </tr>
                                                    </>
                                                );

                                            })}
                                        </tbody>
                                    </table>
                                    {user.is_admin == 1 ? <button onClick={handleCreateUser} className="button is-danger is-fullwidth" >Crea cliente</button> : null}
                                <Pagination totalClients={clienti.length} recordsPerPage={recordsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
} 