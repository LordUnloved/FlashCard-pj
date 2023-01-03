import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';
import DeckForm from './DeckForm';

const EditDeck = () => {
    const history = useHistory();
    const { deckId } = useParams();

    const deckUrl = `/decks/${deckId}`

    const [ updatedDeck, setUpdatedDeck ] = useState({
        id: deckId,
        name: '',
        description: '',
    });

    const onChangeHandler = event => {
        setUpdatedDeck({
            ...updatedDeck,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        await updateDeck(updatedDeck);

        history.goBack();
    }
    
    useEffect( () => {
        const abort = new AbortController();
        const signal = abort.signal;

        const readingDeck = async() => {
            const list = await readDeck(deckId, signal);
            setUpdatedDeck({id: list.id, name: list.name, description: list.description})
        }
        readingDeck();

        return () => abort.abort();
    }, [deckId])

    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home"></span> Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={deckUrl}>{updatedDeck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>

            <h3>Edit Deck</h3>
            <DeckForm 
                deck={updatedDeck} 
                onChangeHandler={onChangeHandler} 
                onSubmitHandler={onSubmitHandler} 
                url={deckUrl}
            />
        </React.Fragment>
    )
}

export default EditDeck;