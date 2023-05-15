
import './App.css';
import Chart from './chart';
import Home from './home';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
function App() {

  return (
    <div className="App">
    <Router>  
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={ <Chart/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
 