
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.scss';
import Header from './components/layout/header/Header';
import Admin from './components/pages/Admin';
import Link from './components/pages/Link';
import Links from './components/pages/Links';

function App() {
  // useEffect(() => {console.clear()}, [])
  
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Links} />
        <Route path="/links/:linkID" component={Link} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
