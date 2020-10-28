
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.scss';
import apiFetch from './assets/scripts/fetch'
import Header from './components/layout/header/Header';
import Admin from './components/pages/Admin';
import Quote from './components/pages/Quote';
import Quotes from './components/pages/Quotes';

function App() {
  // useEffect(() => {console.clear()}, [])
  
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Quotes} />
        <Route exact path="/:quoteID" component={Quote} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
