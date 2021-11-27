import Listing from "./Listing";
import axios from "axios";
import { useEffect, useState } from "react";
import "./main.scss";
import useLocalStorage from "use-local-storage";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const App = () => {
  const [token, setToken] = useLocalStorage("token", undefined);
  const [errorMessage, setErrorErrorMessage] = useState(undefined);

  useEffect(() => {
    axios
      .get("https://typhoon-jasper-celsius.glitch.me/api/token")
      .then(function (res) {
        const data = res.data.token;
        setToken(data);
      })
      .catch(function (error) {
        setErrorErrorMessage(error);
      });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>React test demo</h1>
      </header>
      {errorMessage ? (
        <h1>{errorMessage}</h1>
      ) : token ? (
        <Listing token={token} />
      ) : (
        <Loader type="Bars" color="#00BFFF" height={100} width={100} />
      )}
    </div>
  );
};

export default App;
