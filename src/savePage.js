import { toJSON, toDOM } from "./dom-to-json";

const savePage = (onLoad) => {
  let page;
  const iframeDoc = document.querySelector("iframe").contentWindow.document;
  let html = iframeDoc.querySelector("html");

  if (onLoad && localStorage.length > 0) {
    console.log("Page loaded");
    page = toDOM(JSON.parse(localStorage.getItem("page")));
    html.querySelector("head").innerHTML = page.querySelector("head").innerHTML;
    html.querySelector("body").innerHTML = page.querySelector("body").innerHTML;
    return;
  }

  if (document.readyState === "complete") {
    page = toJSON(html);
    localStorage.setItem("page", JSON.stringify(page));
    console.log("Page saved");
  }
};

export default savePage;
