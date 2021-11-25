import Listing from "./Listing";
import axios from "axios";
import { useEffect } from "react";
import "./main.scss";
import useLocalStorage from "use-local-storage";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const App = () => {
  const [token, setToken] = useLocalStorage("token", undefined);

  useEffect(() => {
    axios
      .get(`https://typhoon-jasper-celsius.glitch.me/api/token`)
      .then((res) => {
        const data = res.data.token;
        setToken(data);
      });
  }, []);

  return (
    <div className="App">
      <header>
        <h1>React test demo</h1>
      </header>

      {token ? (
        <Listing token={token} />
      ) : (
        <Loader type="Bars" color="#00BFFF" height={100} width={100} />
      )}
    </div>
  );
};

export default App;
