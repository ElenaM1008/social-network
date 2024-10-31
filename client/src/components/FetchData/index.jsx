import { useDispatch } from "react-redux";

export const FetchData = () => {
  const dispatch = useDispatch();
  async function fetchData({ url, method, cb, ...props }) {
    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...props,
        }),
      });
      const json = await res.json();

      if (res.status !== 200) {
        alert(json.message);
        return;
      }

      dispatch(cb(json));
    } catch (error) {
      console.log(error);
    }
  }
  return { fetchData };
};
