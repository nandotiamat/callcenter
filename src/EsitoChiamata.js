import axios from 'axios';
import React, { useRef, useState, useContext } from 'react'
import { useLocation, useNavigate} from 'react-router-dom';
import { UserContext } from './UserContext';

export default function EsitoChiamata() {
  const { user } = useContext(UserContext);
  const [error, setError] = useState()
  const soldRef = useRef();
  const descriptionRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const esiti = {
    "Non risponde": "DIDNT_ANSWER",
    "Non è interessato": "NOT_INTERESTED",
    "È interessato": "INTERESTED",
    "Rifiuta dialogo": "REFUSED_DIALOG",
    "Venduto": "SOLD"
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(soldRef.current.checked);
    console.log(descriptionRef.current.value);
    console.log(location.state.client);
    console.log(location.state.product);
    console.log(location.state.corporate);

    const data = {
      product_id: location.state.product["product_id"],
      corporate: location.state.product["corporate_id"],
      client_id: location.state.client["id"],
      was_sold: soldRef.current.checked ? 1 : 0,
      user_id: user.user_id,
      description: descriptionRef.current.value
    }

    axios.post(
      "http://localhost:80/api/publish-telefonata.php", {
        data: data
      }
    ).then((response) => {
      navigate("/");
      alert("Telefonata registrata con successo.");
    })

  }

  return (
    <>
    <nav className='navbar has-background-danger'>
      <div className='navbar-brand '>

      </div>

    </nav>
    <section className="hero is-danger is-fullheight" >
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form onSubmit={handleSubmit} className="box">
                <div>
                <h3 className='is-size-3'>Compila esito</h3> 

                </div>
                {error && <span className="has-text-danger">{error}</span>}
                <div className="field">
                  <label className="checkbox">
                    <input ref={soldRef} type="checkbox" className='mr-1' />
                    Prodotto venduto
                  </label>
                </div>
                <div className="field">
                  <label className="label">
                    Descrizione generica
                  </label>
                  <div className="control">
                    <div className='select is-fullwidth'>
                      <select ref={descriptionRef}>
                        <option value={esiti['Non risponde']}>Non risponde</option>
                        <option value={esiti['È interessato']}>È interessato</option>
                        <option value={esiti['Non è interessato']}>Non è interessato</option>
                        <option value={esiti['Rifiuta dialogo']}>Rifiuta dialogo</option>
                        <option value={esiti['Venduto']}>Venduto</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <input type="submit" className="button is-danger is-fullwidth" value="Conferma"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}