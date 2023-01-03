import React, { useState, useEffect } from "react";
import { Link, Switch, Route, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import CreateCard from "../Cards/CreateCard";
import EditCard from "../Cards/EditCard";

const ViewDeck = () => {
    const history = useHistory();
    const { deckId } = useParams();

    const deckUrl = `/decks/${ deckId }`

    const [ deck, setDeck ] = useState({name: "", description: "", cards: []});
    const { name, description, cards } = deck;

    const onDeckDeleteHandler = async() => {
        const abort = new AbortController();
        const signal = abort.signal;

        if(window.confirm("Delete this deck?\n\nYou will not be able to recover it.")){
            await deleteDeck(deckId, signal);
            history.push("/");
        }

        return () => abort.abort();
    };

    const onCardDeleteHandler = async(id) => {
        const abort = new AbortController();
        const signal = abort.signal;

        if(window.confirm("Delete this card?\n\nYou will not be able to recover it.")){
            await deleteCard(id, signal);
            readDeck(deckId).then(setDeck);
        }

        return () => abort.abort();
    };

    useEffect( () => {
        const abort = new AbortController();
        const signal = abort.signal;
        
        const setDeckAndCards = async () => readDeck(deckId, signal).then(setDeck);
        setDeckAndCards();

        return () => abort.abort();
    }, [deckId])

    return (
        <Switch>
            <Route path={`${deckUrl}`} exact>
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home"></span> Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{name}</li>
                        </ol>
                    </nav>
                    <h4>{name}</h4>
                    <p>{description}</p>
                    <div className="d-flex justify-content-between mb-4">
                        <div>
                            <Link to={`${deckUrl}/edit`} role="button" className="btn btn-secondary mr-2"><span className="oi oi-pencil"></span> Edit</Link>
                            <Link to={`${deckUrl}/study`} role="button" className="btn btn-primary mr-2"><span className="oi oi-book"></span> Study</Link>
                            <Link to={`${deckUrl}/cards/new`} role="button" className="btn btn-primary"><span className="oi oi-plus"></span> Add Cards</Link>
                        </div>
                        <button type="button" className="btn btn-danger" onClick={onDeckDeleteHandler}><span className="oi oi-trash"></span></button>
                    </div>
                    <h2>Cards</h2>
                    {
                        cards.length 
                            ? cards.map((card) => {
                                const { id, front, back } = card;
                                const cardToDelete = () => {
                                    onCardDeleteHandler(id);
                                }

                                return (
                                    <div className="card mb-2" key={id}>
                                        <div className="card-body">
                                            <div className="row row-cols-2">
                                                <div className="col">
                                                    <p>{front}</p>
                                                </div>
                                                <div className="col">
                                                    <p>{back}</p>
                                                </div>
                                            </div>
                                            <div className="float-right">
                                                <Link to={`${deckUrl}/cards/${id}/edit`} role="button" className="btn btn-secondary mr-2"><span className="oi oi-pencil"></span> Edit</Link>
                                                <button type="button" className="btn btn-danger" onClick={cardToDelete}><span className="oi oi-trash"></span></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : (<p>Please create a card</p>)
                    }
                </div>

            </Route>
            <Route path={`${deckUrl}/cards/:cardId/edit`}>
                <EditCard 
                    deck={deck} 
                    url={deckUrl} 
                    setDeck={setDeck} 
                />
            </Route>
            <Route path={`${deckUrl}/cards/new`}>
                <CreateCard 
                    deck={deck} 
                    url={deckUrl} 
                    setDeck={setDeck} 
                />
            </Route>
        </Switch>
    );
};

export default ViewDeck;