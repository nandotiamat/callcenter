import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaRegFrown, FaRegGrin } from "react-icons/fa";
import { UserContext } from "./UserContext";

export const Telefonate = () => {
    const { user } = useContext(UserContext)
    const [telefonate, setTelefonate] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:80/api/index.php", {
            params: {
                type: "get-phonecalls",
                id: user["user_id"],
            }
        }).then((response) => {setTelefonate(response.data)});
    }, [])

    return (
        <section className="hero is-danger is-fullheight" >
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="is-5-tablet is-4-desktop is-3-widescreen">
                            <div className="box">
                                <span className="is-size-3">Telefonate eseguite da {user.username}</span>
                                <div className="p-2">
                                    <table className="table mt-4">
                                        <thead>
                                            <tr>
                                                <th>ID Telefonata</th>
                                                <th>Nominativo Cliente</th>
                                                <th>Numero</th>
                                                <th>Prodotto</th>
                                                <th>Azienda</th>
                                                <th>Data</th>
                                                <th>Esito</th>
                                                <th>Venduto</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {telefonate.map((telefonata) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td >{telefonata.call_id}</td>
                                                            <td >{telefonata.name + " " + telefonata.surname}</td>
                                                            <td >{telefonata.phone_number}</td>
                                                            <td >{telefonata.product_name}</td>
                                                            <td >{telefonata.corporate_name}</td>
                                                            <td >{telefonata.date}</td>
                                                            <td >{telefonata.outcome}</td>
                                                            <td >{telefonata.was_sold == 1 ? <FaRegGrin size={24} color="green"/> : <FaRegFrown size={24} color="red"/>}</td>
                                                        </tr>
                                                    </>
                                                );

                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
} 