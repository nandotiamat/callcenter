import React, { useEffect, useState } from "react"
import { FaUserAlt, FaBuilding } from "react-icons/fa"
import logo from './images/logo.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";

export default function Chiamata() {

    const [client, setClient] = useState(null);
    const [product, setProduct] = useState(null);
    const [corporate, setCorporate] = useState(null);
    const navigate = useNavigate()
    const handleOnClick = (e) => {
        e.preventDefault()
        navigate("/compila_esito", {
            state: {
                client: client,
                corporate: corporate,
                product: product
            }
        })
    }

    useEffect(() => {
        axios.get(
            "http://localhost:80/api/index.php", {
            params: {
                type: "get-random-client"
            }
        }
        ).then((response) => setClient(response.data));
        axios.get(
            "http://localhost:80/api/index.php", {
                params: {
                    type: "get-random-product"
                }
            }
        ).then((response) => {
            console.log(response.data);
            axios.get("http://localhost:80/api/index.php", {
                params: {
                    corporateid: response.data["corporate_id"],
                    type: "get-corporate"
                }
            }).then((response) => setCorporate(response.data))
            setProduct(response.data)
        });
    }, [])

    return (
        <section className="hero is-fullheight has-background-danger">
            <div className="hero-body container">
                <div className="is-flex is-flex-direction-column has-text-white has-text-centered">
                    <figure>
                        <img src={logo} alt="logo" width={400} />
                    </figure>
                    {client === null || product === null || corporate == null ? <CircularProgressbar value={100}/> :
                        < div className="box is-flex is-justify-content-space-between">
                         <div className="m-2 box has-background-black-bis has-text-white	has-text-left is-flex is-flex-direction-column">
                             <div className="is-flex is-align-items-center is-justify-content-space-around">
                                 <FaUserAlt className="mr-2" color="white" size={36} />
                                 <span className="is-size-3 has-text-weight-bold	">{client["name"] + " " + client["surname"]}</span>
                             </div>
                             <div>
                                 <span className="has-text-weight-bold	">Numero di telefono</span>: {client["phone_number"]}
                             </div>
                             <div>
                                 <span className="has-text-weight-bold	">Data di nascita</span>: {client["date_of_birth"]}
                             </div>
                         </div>
                            <div className="m-2 box has-background-black-bis has-text-white	has-text-left is-flex is-flex-direction-column">
                                <div className="is-flex is-align-items-center is-justify-content-space-around">
                                    <FaBuilding className="mr-2" color="white" size={36} />
                                    <div>

                                        <span className="is-size-3 has-text-weight-bold	">{corporate["name"]}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="has-text-weight-bold	">Prodotto</span>: {product["name"]}
                                </div>
                                <div style={{ "maxWidth": "250px" }}>
                                    <span className="has-text-weight-bold	">Descrizione</span>
                                    : {product["description"]}
                                </div>
                            </div>
                        </div>
                    }
                    <button onClick={handleOnClick} className="button is-dark">CHIAMA CLIENTE E COMPILA ESITO</button>
                </div>
            </div>
        </section >
    )
}