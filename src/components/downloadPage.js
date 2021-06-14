const download = () => {
    let frame = document.querySelector("iframe");
    let links = [];
    let pageElements = frame.contentWindow.document.getElementsByTagName("*");
    let returnDashElement = false;
    for (let i = 0; i < pageElements.length; i++) {
        if (pageElements[i].id === "target") {
            if (pageElements[i].classList.contains("dash-elements")) returnDashElement = true;
            pageElements[i].classList.remove("dash-elements");
        } else if (pageElements[i].tagName === "A") {
            pageElements[i].href = "#";
            links.push(pageElements[i]);
        } else if (pageElements[i].tagName === "VIDEO") {
            pageElements[i].setAttribute("controls", "")
        }
        pageElements[i].removeAttribute("draggable");
    }
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'style.css';
    frame.contentWindow.document.head.appendChild(link);
    let htmlPage = "<html>" + encodeURIComponent(frame.contentWindow.document.documentElement.innerHTML) + "</html>";
    startDownload('data:text/plain;charset=utf-8,' + htmlPage, "index.html");
    startDownload('./css/grid.css', "css/grid.css")
    startDownload('./css/style.css', "css/style.css")
    link.remove();

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

    if (returnDashElement) frame.contentWindow.document.getElementById("target").classList.add("dash-elements");
    for (const l in links) {
        console.log(l)
        links[l].href = "javascript:void(0)";
    }
    
}
const startDownload = (href, download) => {
    let element = document.createElement('a');
    element.setAttribute('href', href);
    element.setAttribute('download', download);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    element.remove();
}

export default download