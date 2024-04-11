import styleButton from "./button.module.css";
export default function Button({ children, onChange, disable }) {
  return (
    <button
      disabled={disable}
      className={styleButton.button}
      onClick={onChange}
    >
      {children}
    </button>
  );
}
