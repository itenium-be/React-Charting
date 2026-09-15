import { useState } from "react";
import { AppFormFactory, Charts } from "./components/AppFormFactory";
import { collectedAt } from "./data/libraries";

import "./styles.css";

const REPO_URL = "https://github.com/itenium-be/React-Charting";
const BLOG_URL = "https://itenium.be/blog/javascript/what-chart-library-to-use-in-react/";

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
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="app-footer">
      <p>Data last updated on: {collectedAt}</p>
      <p>
        <a href={REPO_URL}>Repo</a> &middot; <a href={BLOG_URL}>Blog post</a>
      </p>
    </footer>
  );
}


type HeaderProps = {
  setPage: (page: Charts) => void;
}

function Header({setPage}: HeaderProps) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a href="https://itenium.be">
          <img src="favicon.png" style={{marginRight: 18, width: 24}} alt="itenium logo" />
        </a>
        <button className="btn btn-link navbar-brand" onClick={() => setPage('home')}>
          React Charting
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-link nav-link active" onClick={() => setPage('data')}>Data</button>
            </li>
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
              <button className="btn btn-link nav-link active" onClick={() => setPage('reactchartjs2')}>React-ChartJS-2</button>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href={BLOG_URL} aria-label="Blog post">
                <i className="fas fa-blog" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={REPO_URL} aria-label="GitHub repository">
                <i className="fab fa-github" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
