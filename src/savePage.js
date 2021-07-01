import { toJSON, toDOM } from "./dom-to-json";

const savePage = (onLoad) => {
  let page;
  const iframeDoc = document.querySelector("iframe").contentWindow.document;
  let html = iframeDoc.querySelector("html");
  if (onLoad && localStorage.length > 0) {
    page = toDOM(JSON.parse(localStorage.getItem("page")));
    const htmlBody = html.querySelector("body");
    const storageBody = page.querySelector("body");

    html.querySelector("head").innerHTML = page.querySelector("head").innerHTML;
    htmlBody.innerHTML = storageBody.innerHTML;

    for (let attr of storageBody.attributes) {
      htmlBody.setAttribute(attr.name, attr.value);
    }
    return;
  }
  if (document.readyState === "complete") {
    page = toJSON(html);
    localStorage.setItem("page", JSON.stringify(page));
  }
};

export default savePage;
