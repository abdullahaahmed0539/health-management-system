import './App.css';
import './styles/layout.scss';
import Navbar from './components/navbar/Navbar';

function App() {
  let a = 2;
  console.log(a);
  return (
    <div className="layout">
      <Navbar/>
    </div>
  );
}

export default App;
