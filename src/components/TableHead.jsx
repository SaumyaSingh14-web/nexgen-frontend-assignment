function TableHead(props) {
  return (
    <>
      <th
        onClick={props.onClick}
        className="text-sm font-medium text-white px-6 py-4 cursor-pointer"
      >
        {props.title}
        <p className="inline-block -mt-4 ml-2 -mb-1">{props.children}</p>
      </th>
    </>
  );
}
export default TableHead;
