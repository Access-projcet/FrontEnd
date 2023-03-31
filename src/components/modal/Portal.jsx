import ReactDom from "react-dom";

export default function Portal({ children }) {
  const el = document.getElementById("modal");
  return ReactDom.createPortal(children, el);
}
