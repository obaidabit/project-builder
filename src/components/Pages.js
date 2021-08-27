import React, { useEffect, useState } from "react";
import savePage from "../savePage";
import PageItem from "./PageItem";

export default function Pages() {
  const [pages, setPages] = useState(["index"]);

  const addPage = () => {
    if (localStorage.length <= 0) savePage();
    setPages([...pages, ""]);
  };

  const setPageName = (value, index) => {
    setPages((prev) =>
      prev.map((item, i) => {
        if (i === index) item = value;
        return item;
      })
    );
  };

  useEffect(() => {
    const n = localStorage.length;
    if (n > 1) {
      for (let i = 1; i < n; i++) {
        addPage();
        setPageName("page " + i, i);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteItem = (itemIndex) => {
    setPages(pages.filter((el, index) => index !== itemIndex));
    localStorage.removeItem("page" + itemIndex);
  };
  return (
    <div className="pages m-t-2 m-x-1">
      {pages.map((page, index) => (
        <PageItem
          page={page}
          index={index}
          key={index}
          setPageName={setPageName}
          deleteItem={deleteItem}
        />
      ))}
      <div>
        <button className="pages-btn p-1 shadow m-t-2" onClick={addPage}>
          Add page
        </button>
      </div>
    </div>
  );
}
