import './App.css';
import Add from './components/Add';
import {useState} from 'react';
import RozvahaTable from './components/RozvahaTable'

function App() {
  const [item, setItem] = useState([]);
  return (
    <div className="App container pt-5">
      <h1>Vytej na strace rozvaha snadno a rychle</h1>
      <RozvahaTable setItem={setItem} item={item} />
      <Add item={item} setItem={setItem} />
    </div>
  );
}

export default App;
