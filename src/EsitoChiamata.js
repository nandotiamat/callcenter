import React, { useState } from 'react'

export default function EsitoChiamata() {
  const [error, setError] = useState()
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
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
                    <input type="checkbox" className='mr-1' />
                    Prodotto venduto
                  </label>
                </div>
                <div className="field">
                  <label className="label">
                    Descrizione generica
                  </label>
                  <div className="control">
                    <div className='select'>

                      <select>
                        <option>Rifiuta chiamata</option>
                        <option>Rifiuto dialogo</option>
                        <option>Segreteria telefonica</option>
                        <option>Non è interessato</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <input type="submit" className="button is-danger is-fullwidth" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}