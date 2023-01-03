import React from "react";
import { 
  Switch, 
  Route 
} from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import ListDecks from "../Decks/ListDecks";
import CreateDeck from "../Decks/CreateDeck";
import ViewDeck from "../Decks/ViewDeck";
import EditDeck from "../Decks/EditDeck";
import StudyDeck from "../Decks/StudyDeck";


function Layout() {

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact><ListDecks /></Route>
          <Route path="/decks/new"><CreateDeck /></Route>
          <Route path="/decks/:deckId/edit"><EditDeck /></Route>
          <Route path="/decks/:deckId/study"><StudyDeck /></Route> 
          <Route path="/decks/:deckId"><ViewDeck /></Route>
          <Route><NotFound /></Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
