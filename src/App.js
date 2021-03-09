import React, { useState, useEffect } from "react";
import NavBar from "./components/Navbar";
import IFrame from "./components/IFrame";
import LeftSideMenu from "./components/LeftSideMenu";
import RightSideMenu from "./components/RightSideMenu";
import "./App.css";
import { changeElement } from "./components/changeStyle";

let tempElement = null;
let inIframe = false;
let right = document.getElementsByClassName("elements");

export default function App() {
	const [iframe, setIframe] = useState(null);
	const [oldBackground, setOldBackground] = useState(null);

	const SelectTag = element => {
		let tag = null;
		switch (element.id) {
			case "section":
				tag = document.createElement("section");
				tag.innerHTML = "Section";
				break;
			case "navbar":
				tag = document.createElement("nav");
				tag.innerHTML = "Navbar";
				break;
			case "link":
				tag = document.createElement("a");
				tag.innerHTML = "Link";
				tag.href = "#";
				break;
			case "button":
				tag = document.createElement("button");
				tag.innerHTML = "Button";
				break;
			default:
				break;
		}
		//tag.addEventListener('mouseout')
		tag.style.padding = "1rem";
		tag.draggable = true;
		return tag;
	};

	const dragEnter = e => {
		setOldBackground(e.target.style.background);
		e.target.style.background = "#afc7ff";
	};

	const dragLeave = e => {
		e.target.style.background = oldBackground;
	};

	const drop = e => {
		e.preventDefault();
		let clone = null;
		if (e.target === tempElement) {
			e.target.style.background = oldBackground;
			return;
		}
		if (inIframe) {
			clone = tempElement;
		} else {
			clone = tempElement.cloneNode(true);
		}

		clone.onclick = e => {
			right[1].style.display = "block";
		};
		clone.ondblclick = e => {
			e.target.contentEditable = "true";
		};
		e.target.appendChild(clone);
		e.target.style.background = oldBackground;
	};

	const dragOver = e => {
		e.preventDefault();
	};

	const dragStart = e => {
		if (e.target.ownerDocument.querySelector("body").id === "target") {
			inIframe = true;
			tempElement = e.target;
		} else {
			inIframe = false;
			tempElement = SelectTag(e.target);
		}
	};

	useEffect(() => {
		const frame = document.querySelector("iframe");
		if (frame) {
			frame.contentWindow.document.body.ondrop = drop;
			frame.contentWindow.document.body.ondragover = dragOver;
			frame.contentWindow.document.body.ondragenter = dragEnter;
			frame.contentWindow.document.body.ondragleave = dragLeave;
			frame.contentWindow.document.body.ondragstart = dragStart;
			frame.contentWindow.document.body.id = "target";

			frame.contentWindow.addEventListener("click", e => {
				console.log(e.target);
				changeElement(e);
			});
			frame.contentWindow.addEventListener("mouseover", e => {
				e.target.style.outline = "#66a2ff solid 2px";
			});
			frame.contentWindow.addEventListener("mouseout", e => {
				e.target.style.outline = "";
			});
			setIframe(frame);
		}
	}, []);

	return (
		<div className="app">
			<NavBar />
			<main className="main">
				<LeftSideMenu onDragStart={dragStart} onDragOver={dragOver} />
				<IFrame onDrop={drop} onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragOver}></IFrame>
				<RightSideMenu />
			</main>
		</div>
	);
}
