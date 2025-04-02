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
      <Button
        size="small"
        color="blue"
        onClick={() => console.log('small Blue Button Clicked')}
      >
        Search
      </Button>
      <Button
        size="small"
        color="transparent"
        onClick={() => console.log('small Transparent Button Clicked')}
      >
        Load more
      </Button>
    </>
  );
};

export default HomePage;
