import React, { createContext, useState } from "react";

export const ElementContext = createContext();

const ElementProvider = (props) => {
  const div = document.createElement("div");
  const [selectedElement, setSelectedElement] = useState(div);
  return (
    <ElementContext.Provider value={[selectedElement, setSelectedElement]}>
      {props.children}
    </ElementContext.Provider>
  );
};

export default ElementProvider;
