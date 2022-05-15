import PageHeader from '../PageHeader/PageHeader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import FindGiveawaysPage from '../FindGiveawaysPage/FindGiveawaysPage';
import InformationPage from '../InformationPage/InformationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <PageHeader/>
        <Routes>
          <Route path="/" element={<FindGiveawaysPage/>} />
          <Route path="/info" element={<InformationPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
