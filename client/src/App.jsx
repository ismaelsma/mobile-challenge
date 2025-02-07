import './styles/main.scss';
import React, { useEffect, useState } from 'react';
import Header from './components/main/header/header';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/phonelist')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="app">
      <div className="header-container">
        <Header />
      </div>
      <div className="content-container"></div>
    </div>
  );
};

export default App;
