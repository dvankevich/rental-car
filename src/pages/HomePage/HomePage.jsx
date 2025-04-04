import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Home page</h1>
      <Button size="large" color="blue" onClick={() => navigate('/catalog')}>
        View Catalog
      </Button>
    </>
  );
};

export default HomePage;
