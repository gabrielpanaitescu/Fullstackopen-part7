import { useEffect, useState } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    type,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response) => setCountry(response))
      .catch((error) => {
        console.log(error);
        setCountry(null);
      });
  }, [name]);

  return {
    ...country,
    found: country ? true : false,
  };
};

const Country = ({ country }) => {
  if (!country) return null;

  if (!country.found) return <p>no data for country</p>;

  return (
    <div>
      <h2>{country.data.name.common}</h2>
      <p>{country.data.capital}</p>
      <p>{country.data.population}</p>
      <img
        src={country.data.flags.png}
        alt={"flag of " + country.data.name.common}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          country:
          <input {...nameInput} />
        </label>
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  );
};

export default App;
