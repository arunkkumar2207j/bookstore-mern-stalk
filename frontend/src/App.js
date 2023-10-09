import {useEffect, useState} from "react";
import Axios from "axios";
import './App.css';

const serverUrl = "http://localhost:5555/api";

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    Axios.get(serverUrl + "/books/")
      .then((response) => {
        console.log("books", response.data);
        setData(response.data.data)
      })
  }, [])
  return (
    <div className="App">
      {
        data && data?.map((res, index) => {
          return <div key={index}>{res.title}</div>
        })
      }
    </div>
  );
}

export default App;
