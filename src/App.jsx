import { lazy, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));
const DetailsPage = lazy(() => import('./pages/DetailsPage/DetailsPage'));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<DetailsPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
