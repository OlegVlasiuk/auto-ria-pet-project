import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "../NavBar";
import MainContent from "../MainContent/MainContent";
import FavoritesPage from "../FavoritesPage";

import styles from "./MainPage.module.scss";

export const MainPage = () => {
  return (
    <Router>
      <div className={styles.wrapper}>
        <NavBar />
        <main>
          <Routes>
            <>
              <Route exact path="/" element={<MainContent />} />
              <Route exact path="/favorites" element={<FavoritesPage />} />
            </>
          </Routes>
        </main>
      </div>
    </Router>
  );
};
