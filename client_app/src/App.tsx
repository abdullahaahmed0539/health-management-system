import './App.css';
import './styles/layout.scss';
import Navbar from './components/navbar/Navbar';
import { Outlet } from 'react-router';

function App() {
  let a = 2;
  console.log(a);
  return (
    <div className="layout">
      <Navbar/>
      <Outlet/>
    </div>
  );
}

export default App;
