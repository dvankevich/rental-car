import Button from '../../components/Button/Button';

const HomePage = () => {
  return (
    <>
      <h1>Home page</h1>
      <Button
        size="large"
        color="blue"
        onClick={() => console.log('Large Blue Button Clicked')}
      >
        View Catalog
      </Button>
    </>
  );
};

export default HomePage;
