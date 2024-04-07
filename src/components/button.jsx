import styleButton from "./button.module.css";
export default function Button({ children, onChange }) {
  return (
    <button className={styleButton.button} onClick={onChange}>
      {children}
    </button>
  );
}
