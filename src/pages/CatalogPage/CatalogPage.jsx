import React from 'react';
import FilterForm from '../../components/FilterForm/FilterForm'; // Переконайтеся, що шлях до FilterForm правильний
import CarList from '../../components/CarList/CarList'; // Якщо у вас окремий компонент для списку автомобілів
// Або інші необхідні імпорти

const CatalogPage = () => {
  return (
    <div>
      <h1>Catalog of Cars</h1>
      <FilterForm />
      <CarList />
    </div>
  );
};

export default CatalogPage;
