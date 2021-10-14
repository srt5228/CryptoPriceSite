
import '../App.css';
import Dashboard from "./Dashboard";
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
            <Dashboard/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
