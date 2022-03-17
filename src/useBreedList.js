import { useEffect, useState } from "react";

const localCache = {};
const useBreedList = (animal) => {
  const [breedList, setBreedList] = useState([]);

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      fetchBreeds();
    }

    async function fetchBreeds() {
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      console.log("breeds ", json);
      const breeds = json.breeds || [];
      localCache[animal] = breeds;
      setBreedList(breeds);
    }
  }, [animal]);
  console.log("returning breeds list: ", breedList);
  return [breedList, setBreedList];
};

export default useBreedList;
