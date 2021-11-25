import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import TableItem from "./TableItem";

const Listing = ({ token }) => {
  const [filteredData, setFilteredData] = useState();
  const { register, handleSubmit } = useForm();
  const [listingData, setListingData] = useLocalStorage("data", []);

  useEffect(() => {
    setFilteredData(listingData);
  }, [listingData]);

  useEffect(() => {
    if (listingData?.length === 0) {
      fetch(`https://typhoon-jasper-celsius.glitch.me/api/data/?token=${token}`)
        .then((response) => response.json())
        .then((data) => setListingData(data.data));
    }
  }, []);

  const onSubmit = (data) => {
    let range = listingData.filter(
      (x) => x.index > data.from && x.index < data.to
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
        <tr>
          <th>Index</th>
          <th>Slot</th>
          <th>City</th>
          <th>Velocity</th>
        </tr>
        <TableItem filteredData={filteredData} />
      </table>
    </div>
  );
};

export default Listing;
