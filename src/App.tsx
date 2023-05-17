import { useState } from "react";
import { AppFormFactory, Charts } from "./components/AppFormFactory";

import "./styles.css";

export function App() {
  const [page, setPage] = useState<Charts>('home');

  return (
    <div className="App">
      <Header setPage={setPage} />
      <div className="container" style={{paddingTop: 36, paddingBottom: 36}}>
        <div className="row">
          <AppFormFactory page={page} />
        </div>
      </div>
    </div>
  );
}


type HeaderProps = {
  setPage: (page: Charts) => void;
}

function Header({setPage}: HeaderProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="btn btn-link navbar-brand" onClick={() => setPage('home')}>
          <img src="/favicon.png" style={{marginRight: 18, width: 24}} alt="itenium logo" />
          React Charting
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-link nav-link active" onClick={() => setPage('recharts')}>Recharts</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link active" onClick={() => setPage('visx')}>Visx</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link active" onClick={() => setPage('nivo')}>Nivo</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link active" onClick={() => setPage('victory')}>Victory</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link active" onClick={() => setPage('reactvis')}>React-Vis</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link active" onClick={() => setPage('reactchartjs2')}>React-ChartJS-2</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
