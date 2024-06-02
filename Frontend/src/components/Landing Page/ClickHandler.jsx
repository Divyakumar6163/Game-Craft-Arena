export default function ClickHandler(navigate, url) {
  return () => {
    navigate(url);
  };
}
