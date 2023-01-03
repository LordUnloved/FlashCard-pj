import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from'react-router-dom';
import { readCard, updateCard, readDeck } from '../utils/api';
import Card from './Card';

function EditCard({deck, setDeck, url}){
    const history = useHistory();
    const { deckId, cardId } = useParams();

    const [ updatedCard, setUpdatedCard ] = useState({
        id: cardId,
        front: '',
        back: '',
        deckId: deckId
    });

    async function onSubmitHandler(event){
        event.preventDefault();
        const newlyUpdatedCard = await updateCard(updatedCard);
        const setDeckAndCards = async () => readDeck(newlyUpdatedCard.deckId)
            .then(res => setDeck({name: res.name, description: res.description, cards: res.cards}));
        setDeckAndCards();
        history.goBack()
    }
        

    function onChangeHandler(event){
        setUpdatedCard({
            ...updatedCard,
            [event.target.name]: event.target.value
        })
    };

    useEffect( () => {
        const abort = new AbortController();
        const signal = abort.signal;

        async function readingCard(){
            const list = await readCard(cardId, signal);
            setUpdatedCard(list);
        }
        readingCard();

        return () => abort.abort();
    }, [cardId])

    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home"></span> Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={url}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck {cardId}</li>
                </ol>
            </nav>

            <h3>Edit Card</h3>
            <Card 
                card={updatedCard}
                onChangeHandler={onChangeHandler}
                onSubmitHandler={onSubmitHandler}
                url={url}
                mode={"Edit"}
            />
        </React.Fragment>
    )
}

export default EditCard;