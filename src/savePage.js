import { toJSON, toDOM } from "./dom-to-json";

const savePage = () => {
  let page;
  const iframeDoc = document.querySelector("iframe").contentWindow.document;
  let html = iframeDoc.querySelector("html");
  let pageName = html.getAttribute("data-page-name");

  if (document.readyState === "complete") {
    page = toJSON(html);
    localStorage.setItem(pageName ? pageName : "page0", JSON.stringify(page));
  }
};

export const loadPage = (onLoad) => {
  let page;
  const iframeDoc = document.querySelector("iframe").contentWindow.document;
  let html = iframeDoc.querySelector("html");
  let pageName = html.getAttribute("data-page-name");

  if (localStorage.length > 0) {
    if (!pageName) pageName = localStorage.key(0);

    page = toDOM(JSON.parse(localStorage.getItem(pageName)));
    const htmlBody = html.querySelector("body");
    const storageBody = page.querySelector("body");
    html.querySelector("head").innerHTML = page.querySelector("head").innerHTML;
    htmlBody.innerHTML = storageBody.innerHTML;

    for (let attr of storageBody.attributes) {
      htmlBody.setAttribute(attr.name, attr.value);
    }
    for (let attr of page.attributes) {
      html.setAttribute(attr.name, attr.value);
    }
  } else {
    html.setAttribute("data-page-name", "page0");
  }
};

export default savePage;
