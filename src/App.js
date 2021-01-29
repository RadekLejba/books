import {BrowserRouter as Switch, Route} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import React, {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Views/Home';
import itemDetails from './Views/itemDetails';
import Navigation from "./Components/Navigation";
import ScrollArrow from "./Components/ScrollArrow"
import Welcome from './Views/Welcome';


function App() {
    const [advancedQuery, setAdvancedQuery] = useState("")
    const [query, setQuery] = useState("react");

    return (
        <Switch>
            <div className="App">
                <header>
                    <Navigation setQuery={setQuery} setAdvancedQuery={setAdvancedQuery} />
                </header>
                <main>
                    <Container>
                        <Route path="/" exact component={Welcome} />
                        <Route path="/home" exact render={() => <Home query={query} advancedQuery={advancedQuery} />} />
                        <Route path="/volume/:id" component={itemDetails} />
                    </Container>
                    <ScrollArrow />
                </main>
            </div>
        </Switch>
    );
}

export default App;
