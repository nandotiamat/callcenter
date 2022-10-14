import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export const GestisciProdotti = () => {
    const { user } = useContext(UserContext)
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:80/api/index.php", {
            params: {
                type: "get-all-products"
            }
        }).then((response) => setProducts(response.data));
    }, [])

    const handleUpdate = (index) => {
        navigate("/update_product", {
            state: {
                product: products[index]
            }
        })
    }

    const handleDelete = (index) => {
        const product_id_to_delete = products[index].product_id;
        
        axios.delete("http://localhost:80/api/delete-product.php", {
            data: {
                id: product_id_to_delete,
            }
        })

        const array = [...products];
        const removed_user = array.splice(index, 1);
        setProducts(array);
        alert(removed_user[0]["product_name"] + " correttamente rimosso.")
    }

    const handleCreateProduct = () => {
        navigate("/create_product");
    }


    return (
        <section className="hero is-danger is-fullheight" >
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="is-5-tablet is-4-desktop is-3-widescreen">
                            <div className="box">
                                <div className="has-text-centered">
                                    <span className="is-size-3">Prodotti sponsorizzati</span>
                                </div>
                                <div className="p-2">
                                    <table className="table mt-4">
                                        <thead>
                                            <tr>
                                                <th>ID Prodotto</th>
                                                <th>Nome</th>
                                                <th>Descrizione</th>
                                                <th>Azienda</th>
                                                {user.is_admin === 1 ? <th>Operazioni</th> : null}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {products.map((product, index) => {
                                                return (
                                                    <>
                                                        <tr key={index} >
                                                            <td >{product.product_id}</td>
                                                            <td >{product.product_name}</td>
                                                            <td >{product.description}</td>
                                                            <td >{product.corporate_name}</td>
                                                            
                                                            {user.is_admin === 1 ? <td><div>{<FaPen onClick={() => handleUpdate(index)} className="mr-5"/> }{<FaTrash onClick={() => handleDelete(index)}/>}</div></td> : null}
                                                        </tr>
                                                    </>
                                                );

                                            })}
                                        </tbody>
                                    </table>
                                    {user.is_admin === 1 ? <button onClick={handleCreateProduct} className="button is-danger is-fullwidth" >Aggiungi prodotto</button> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
} 