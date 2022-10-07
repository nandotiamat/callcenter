import React, { useContext } from "react"
import { UserContext } from "./UserContext"
import { FaUserAlt, FaBuilding } from "react-icons/fa"
import logo from './images/logo.png';
import { useNavigate } from "react-router-dom";

export default function Chiamata() {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const handleOnClick = (e) => {
        e.preventDefault()
        navigate("/compila_esito")
    } 

    return (
        <section className="hero is-fullheight has-background-danger">
            <div className="hero-body container">
                <div className="is-flex is-flex-direction-column has-text-white has-text-centered">
                    <figure>
                        <img src={logo} width={400}/>
                    </figure>
                    <div className="box is-flex is-justify-content-space-between">
                        <div className="m-2 box has-background-black-bis has-text-white	has-text-left is-flex is-flex-direction-column">
                            <div className="is-flex is-align-items-center is-justify-content-space-around">                            
                                <FaUserAlt className="mr-2" color="white" size={36} />
                                <span className="is-size-3 has-text-weight-bold	">Giustino della volpe</span>
                            </div>
                            <div>
                                <span className="has-text-weight-bold	">Numero di telefono</span>: 33389
                            </div>
                            <div>
                                <span className="has-text-weight-bold	">Data di nascita</span>: 23/23/23
                            </div>
                        </div>
                        <div className="m-2 box has-background-black-bis has-text-white	has-text-left is-flex is-flex-direction-column">
                            <div className="is-flex is-align-items-center is-justify-content-space-around">                            
                                <FaBuilding className="mr-2" color="white" size={36} />
                                <div>

                                <span className="is-size-3 has-text-weight-bold	">Credicor</span>
                                </div>
                            </div>
                            <div>
                                <span className="has-text-weight-bold	">Prodotto</span>: Tecnologia Antigravità
                            </div>
                            <div style={{"max-width": "250px"}}>
                                <span className="has-text-weight-bold	">Descrizione</span>
                                : Se hai sempre sognato uno sconto di due megacrediti su ogni progetto che vuoi giocare sei nel posto giusto caro mio!
                            </div>
                        </div>
                    </div>
                    <button onClick={handleOnClick} className="button is-dark">CHIAMA CLIENTE E COMPILA ESITO</button>
                </div>
            </div>
        </section >
    )
}