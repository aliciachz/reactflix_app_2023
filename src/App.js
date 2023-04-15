import { Outlet, Route, Routes } from 'react-router-dom';
import requests from "api/requests";
import Banner from "components/Banner";
import Footer from "components/Footer";
import Nav from "components/Nav";
import Row from "components/Row";
import "styles/App.css";
import "styles/Nav.css";
import MainPage from 'routes/MainPage';
import DetailPage from 'routes/DetailPage';
import SearchPage from 'routes/SearchPage';

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DetailPage />} />
          <Route path="search" element={<SearchPage />} />
          {/* 프로필 페이지 추가하기 */}
        </Route>
      </Routes>
      {/* <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Trending now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Animation Movie" id="AM" fetchUrl={requests.fetchAnimationMovies} />
      <Row title="Family Movie" id="FM" fetchUrl={requests.fetchFamilyMovies} />
      <Row title="Adventure Movie" id="DM" fetchUrl={requests.fetchAdventureMovies} />
      <Row title="Science Fiction Movie" id="SM" fetchUrl={requests.fetchScienceFictionMovies} />
      <Row title="Action Movie" id="CM" fetchUrl={requests.fetchAction} />
      <Footer /> */}
    </div>
  );
}

export default App;

