const download = () => {
  let frameDoc = document
    .querySelector("iframe")
    .contentDocument.cloneNode(true);
  let links = [];
  let pageElements = frameDoc.getElementsByTagName("*");

  for (let i = 0; i < pageElements.length; i++) {
    if (pageElements[i].id === "target") {
      if (pageElements[i].classList.contains("dash-elements"))
        pageElements[i].classList.remove("dash-elements");
      pageElements[i].style.padding = "0px";
    } else if (pageElements[i].tagName === "A") {
      pageElements[i].href = "#";
      links.push(pageElements[i]);
    } else if (pageElements[i].tagName === "VIDEO") {
      pageElements[i].setAttribute("controls", "");
    } else if (pageElements[i].tagName === "LINK") {
      pageElements[i].href = pageElements[i].href.replace(/.+css./, "");
    } else if (pageElements[i].tagName === "SCRIPT") {
      pageElements[i].src = pageElements[i].src.replace(/.+js./, "");
    }
    pageElements[i].removeAttribute("draggable");
  }

  let htmlPage =
    "<html>" +
    encodeURIComponent(frameDoc.documentElement.innerHTML) +
    "</html>";
  startDownload("data:text/html;charset=utf-8," + htmlPage, "index.html");
  startDownload("./css/grid.css", "grid.css");
  startDownload("./css/style.css", "style.css");
  startDownload("./js/index.js", "index.js");

  /*  link.remove();
    link2.remove();
    jslink.remove(); */

  /*  var htmlFile = document.createElement('a');
    htmlFile.setAttribute('href', 'data:text/plain;charset=utf-8,' + htmlPage);
    htmlFile.setAttribute('download', "index.html");
    htmlFile.style.display = 'none';
    document.body.appendChild(htmlFile);
    htmlFile.click();
    var cssGridFile = document.createElement('a');
    cssGridFile.setAttribute('href', './css/style.css');
    cssGridFile.setAttribute('download', "css/grid.css");
    cssGridFile.style.display = 'none';
    document.body.appendChild(cssGridFile);
    cssGridFile.click(); 
    document.body.removeChild(cssGridFile); */
};

const startDownload = (href, download) => {
  let element = document.createElement("a");
  element.setAttribute("href", href);
  element.setAttribute("download", download);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  element.remove();
};

export default download;
