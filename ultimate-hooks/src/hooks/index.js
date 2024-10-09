import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

// useEffect method
// export const useResource = (baseUrl, token = null) => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios.get(baseUrl).then((response) => setData(response.data));
//   }, [baseUrl]);

//   const create = async (newObject) => {
//     const config = token
//       ? {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       : {};

//     try {
//       const response = await axios.post(baseUrl, newObject, config);
//       setData(data.concat(response.data));
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const service = {
//     create,
//   };

//   return [data, service];
// };

// React Query method
export const useResource = (baseUrl, key, token) => {
  const queryClient = useQueryClient();

  const getAll = () => axios.get(baseUrl).then((response) => response.data);

  const create = async (newObject) => {
    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  };

  const result = useQuery({
    queryKey: [key],
    queryFn: getAll,
  });

  const createResourceMutation = useMutation({
    mutationFn: create,
    onSuccess(newObject) {
      const resource = queryClient.getQueryData([key]);
      queryClient.setQueryData([key], resource.concat(newObject));
    },
    onError(error) {
      console.log(error.response.data.error);
    },
  });

  return [result, { createResourceMutation }];
};
