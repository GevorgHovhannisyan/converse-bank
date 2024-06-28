import "./content.scss";
import { wrapTable } from "../../helpers/Utils";

const Content = ({ data }) => {
  //, className
  if (!data) return false;

  const wrappedData = wrapTable(data);

  return (
    <div
      className="content_inner"
      dangerouslySetInnerHTML={{ __html: wrappedData }}
    />
  );
};

export default Content;
