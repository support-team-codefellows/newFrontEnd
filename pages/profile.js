import { useSelector } from "react-redux";

export default function Profile() {
  const selector = useSelector((state) => state);
  console.log(selector);

  return (
    <div>
      <h1>Profile</h1>
      <p>{selector.rateing.reating}</p>
      <p>{selector.rateing.username}</p>
    </div>
  );
}
