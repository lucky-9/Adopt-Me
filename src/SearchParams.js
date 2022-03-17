import { useEffect, useState, useContext } from "react";

import useBreedList from "./useBreedList";
import Results from "./Results";

import ThemeContext from "./ThemeContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const THEMES = ["grey", "pink", "darkblue", "red"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  const [theme, setTheme] = useContext(ThemeContext);
  console.log("context theme: ", theme);

  useEffect(() => {
    requestPets();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const requestPets = async () => {
    try {
      let res = await fetch(
        `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
      );
      let json = await res.json();
      console.log(json);
      setPets(json.pets);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          location
          <input
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="location..."
          />
        </label>

        <label htmlFor="animal">
          animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option></option>
            {ANIMALS.map((animal, i) => (
              <option key={i} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option></option>
            {breeds.map((breed, i) => (
              <option key={i} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="button-theme">
          Theme
          <select
            id="button-theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            {THEMES.map((theme, i) => (
              <option key={i} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </label>
        <button style={{ backgroundColor: theme }} type="submit">
          submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
