import PhonesList from '../phones-list/phones-list';

const MainPage = () => {
  return (
    <div className="main-page" data-testid="main-page">
      <div className="main-page__mobile-phones">
        <PhonesList></PhonesList>
      </div>
    </div>
  );
};

export default MainPage;
