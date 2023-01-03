import React from "react";
import { Link } from "react-router-dom";

function DeckForm({  onSubmitHandler, deck, onChangeHandler, url}){
    const { name, description } = deck;

    return (
        <form onSubmit={onSubmitHandler}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Deck Name" 
                    onChange={onChangeHandler}
                    value={name}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                    className="form-control" 
                    id="description" 
                    name="description" 
                    rows="4" 
                    placeholder="Brief description of the deck"
                    onChange={onChangeHandler}
                    value={description}
                ></textarea>
            </div>
            <div>
                <Link to={url} ><button className="btn btn-secondary mr-2">Cancel</button></Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default DeckForm;