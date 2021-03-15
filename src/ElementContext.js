import React, { createContext, useState } from "react";

export const ElementContext = createContext();

const ElementProvider = (props) => {
  const [selectedElement, setSelectedElement] = useState("hello");
  return (
    <ElementContext.Provider value={[selectedElement, setSelectedElement]}>
      {props.children}
    </ElementContext.Provider>
  );
};

export default ElementProvider;
