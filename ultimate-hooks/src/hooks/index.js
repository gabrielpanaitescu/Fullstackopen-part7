import { useEffect, useState } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useResource = (baseUrl, token = null) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(baseUrl).then((response) => setData(response.data));
  }, [baseUrl]);

  const create = async (newObject) => {
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    try {
      const response = await axios.post(baseUrl, newObject, config);
      setData(data.concat(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const service = {
    create,
  };

  return [data, service];
};
