import React, { createContext, useState, useContext, useEffect } from "react";

// Crear el contexto
const PhonesListContext = createContext();

// Proveedor del contexto
export const PhonesListProvider = ({ children }) => {
  const [phonesList, setPhonesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hacer una petición a la API (Node.js)
  const fetchPhonesList = async () => {
    try {
      debugger;
      const response = await fetch("http://localhost:3001/phonelist");
      const data = await response.json();
      setPhonesList(data);
    } catch (error) {
      console.error("Error fetching phones list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debugger;
    fetchPhonesList();
  }, []);

  return <PhonesListContext.Provider value={{ phonesList, loading }}>{children}</PhonesListContext.Provider>;
};

// Hook personalizado para usar el contexto
export const usePhonesListContext = () => useContext(PhonesListContext);
