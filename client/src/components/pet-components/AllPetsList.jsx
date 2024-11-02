import { useState, useEffect } from "react";
import { useServerName } from "../../ServerNameProvider";
import { Navbar } from "../Navbar";
import { PetListView } from "./PetListView";

export function AllPetsList() {
  const serverName = useServerName();
  const [allPetsList, setAllPetsList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    loadAllPets();
  });

  async function loadAllPets() {
    try {
      await fetch(`https://${serverName}/allpets`)
        .then((res) => {
          if (res.status >= 400) {
            throw res.status;
          }
          return res.json();
        })
        .then((data) => {
          setAllPetsList(data);
          setLoading(false);
        });
    } catch (e) {
      setLoading(false);
      setErrorMessage(
        `Could not get pet list. The following error occurred: ${e}`
      );
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col">
        <h2>All pets:</h2>
        {allPetsList ? (
          <PetListView list={allPetsList} />
        ) : (
          <p>{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
