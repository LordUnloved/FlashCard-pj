import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";
import classNames from "../../utils/class-names";
import NotFound from "../NotFound";
import CardList from "./CardList";

function DeckDetails() {
  const [deckInfo, setDeckInfo] = useState({});
  const { deckId } = useParams();
  const { name, description } = deckInfo;
  const { url } = useRouteMatch();
  const history = useHistory();


  const navName = name ? name : "View Deck";

  const getDeckDetails = useCallback(async () => {
    try {
      const deck = await readDeck(deckId);
      setDeckInfo(deck);
    } catch (error) {
      setDeckInfo({ name: "Not Found" });
    }
  }, [deckId]);


  useEffect(() => {
    getDeckDetails();
  }, [deckId, getDeckDetails]);

 
  if (name === "Not Found") return <NotFound />;

 
  async function handleDeleteDeck() {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };
}

export default DeckDetails;