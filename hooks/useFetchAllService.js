import { useEffect, useState } from "react";

export default function useFetchAllService(
  callService,
  mapData = (data) => data
) {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    callService()
      .then((data) => {
        setData(data.map(mapData));
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  return { data, setData, fetching };
}
