
import '../App.css';
import Dashboard from "./Dashboard";
// import image from '.\\Capture.JPG';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
        {/*<img src={image} alt={"weather"} />*/}
      <Router>
        <Route path="/" exact>
            <Dashboard/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
