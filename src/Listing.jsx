import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import TableItem from "./TableItem";
import axios from "axios";

const Listing = ({ token }) => {
  const [filteredData, setFilteredData] = useState();
  const { register, handleSubmit } = useForm();
  const [listingData, setListingData] = useLocalStorage("data", []);

  const [errorMessage, setErrorErrorMessage] = useState(undefined);

  useEffect(() => {
    // default range 1-20
    setFilteredData(listingData.filter((x) => x.index >= 0 && x.index <= 20));
  }, [listingData]);

  useEffect(() => {
    if (listingData?.length === 0) {
      /**
       * Pulling all possible data in order to lower loading time to minimum, later filter data on client side
       */
      axios
        .get(
          `https://typhoon-jasper-celsius.glitch.me/api/data/?token=${token}&from=1&to=1000`
        )
        .then(function (res) {
          setListingData(res.data.data);
        })
        .catch(function (error) {
          setErrorErrorMessage(`${error}`);
        });
    }
  }, []);

  const onSubmit = (data) => {
    let range = listingData.filter(
      (x) => x.index >= data.from && x.index <= data.to
    );
    setFilteredData(range);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="number" {...register("from")} placeholder={`From`} />
        <input type="number" {...register("to")} placeholder={`To`} />
        <input type="submit" />
      </form>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Slot</th>
            <th>City</th>
            <th>Velocity</th>
          </tr>
        </thead>
        {errorMessage ? (
          <h1>{errorMessage}</h1>
        ) : (
          <tbody>
            <TableItem filteredData={filteredData} />
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Listing;
