import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

const ListDecks = () => {
  const [ decks, setDecks ] = useState({name: "", description: "", cards: []})

  const onDeleteHandler = async (id) => {
    const abort = new AbortController();
    const signal = abort.signal;

    if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
      await deleteDeck(id, signal);
      listDecks(signal).then(setDecks);
    }
    
    return () => abort.abort();
  }

  useEffect( () => {
    const abort = new AbortController();
    const signal = abort.signal;

    const listingDecks = async() => listDecks(signal).then(setDecks)
    listingDecks();

    return () => abort.abort();
  },[])

  return (
    <React.Fragment>
      <Link to="/decks/new" role="button" className="btn btn-secondary mb-3">
      <span className="oi oi-plus"></span> Create Deck
      </Link>
      { decks.length 
        ? (
          decks.map((deck) => {
            const { id, name, description } = deck;
            const deckToDelete = () => {
              onDeleteHandler(id);
            }

            return (
              <div className="card mb-2" key={id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{name}</h5>
                    <small className="text-mute">{deck.cards.length} cards</small>
                  </div>
                  <p className="card-text text-muted">{description}</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <Link to={`/decks/${id}`} role="button" className="btn btn-secondary card-link"><span className="oi oi-eye"></span> View</Link>
                      <Link to={`/decks/${id}/study`} role="button" className="btn btn-primary card-link"><span className="oi oi-book"></span> Study</Link>
                    </div>
                    <button name="delete" className="btn btn-danger card-link" onClick={deckToDelete}><span className="oi oi-trash"></span></button>
                  </div>
                </div>
              </div>
            );
          })) 
        : (<p>Please create a deck.</p>)
      }
    </React.Fragment>
  );
};

export default ListDecks;
