import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { getBrands } from "./redux/cars/operations";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
//import FavoritesPage from "./pages/FavoritesPage";
//import CarDetailsPage from "./pages/CarDetailsPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        {/* <Route path="/catalog/:id" element={<CarDetailsPage />} /> */}
        {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
        <Route path="*" element={<HomePage />} /> {/* Redirect to home */}
      </Routes>
    </>
  );
};

export default App;
