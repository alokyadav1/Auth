import './App.css';
import Register from './components/SignUp';
import Login from "./components/Login"
function App() {
  return (
    <div className="App">
      <div className='login'>
        <Register/>
        <Login/>
      </div>
    </div>
  );
}

export default App;
