import React, { useState, useEffect } from "react";
import CharCard from "./SmashCharCards";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const redirectToPage = (characterName) => {
    //
    console.log(`Redirecting to ${characterName} page`);
  };

  return (
    <div>
      <CharCard />
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  );
}
