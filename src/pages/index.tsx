import UENValidation from '../components/UENValidation';
import WeatherForecast from '../components/WeatherForecast';

const Home = () => {
  return (
    <div style={{padding: '20px' }}>
      <h1>Welcome to the OneST Portal</h1>
      <div>
        <UENValidation />
      </div>
      
      <div>
        <WeatherForecast />
      </div>
      
    </div>
  );
};

export default Home;