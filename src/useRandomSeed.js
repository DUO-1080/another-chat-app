import { useState, useEffect } from "react";

const useRandomSeed = () => {
  const [seed, setSeed] = useState(0);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return seed;
};

export default useRandomSeed;
