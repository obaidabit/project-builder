import React, { createContext, useState } from "react";

export const ElementContext = createContext();
export const ElementContext2 = createContext();

const ElementProvider = (props) => {
  const div = document.createElement("div");
  const [selectedElement, setSelectedElement] = useState(div);
  const [selectedTarget, setSelectedTarget] = useState(div);
  return (
    <ElementContext.Provider value={[selectedElement, setSelectedElement]}>
      <ElementContext2.Provider value={[selectedTarget, setSelectedTarget]}>
        {props.children}
      </ElementContext2.Provider>
    </ElementContext.Provider>
  );
};

export default ElementProvider;
