import './App.css';
import BarChart from './components/BarChart';
import TransitionBarChart from './components/TransitionBarChart';
import Example from './components/div';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Example /> */}
        {/* <BarChart /> */}
        <TransitionBarChart />
      </header>
    </div>
  );
}

export default App;
