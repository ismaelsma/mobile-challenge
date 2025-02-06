const { useEffect, useState } = require('react');

const Header = () => {
  const [data, setData] = useState(null);

  return (
    <div className="header">
      <div className="header-items">
        <div className="header__logo-container">
          <img
            src="/assets/main-logo.svg"
            alt="logo"
            className="header__logo-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
