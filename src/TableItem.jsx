const TableItem = ({ filteredData }) => {
  return (
    <>
      {filteredData?.map((item) => {
        return (
          <tr key={item.index}>
            <td>{item.index}</td>
            <td>{item.slot || 0}</td>
            <td>{item.city || "None"}</td>
            <td>{item.velocity || "0.00"}</td>
          </tr>
        );
      })}
    </>
  );
};

export default TableItem;
