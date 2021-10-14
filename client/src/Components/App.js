import logo from '../logo.svg';
import '../App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact>

        </Route>
      </Router>
    </div>
  );
}

export default App;
