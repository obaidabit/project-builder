import React, { useState, useContext, useEffect } from "react";
import { ElementContext2 } from "../ElementContext";
import savePage from "../savePage";

export default function SelectBox() {
	const [selectedTarget] = useContext(ElementContext2);
	const [name, setName] = useState("");

	const close = () => {
		const iframe = document.querySelector("iframe");
		const tool = document.querySelector(".selected-element");
		const editable = iframe.contentWindow.document.querySelectorAll("[contenteditable]");
		editable.forEach(item => {
			if (item.contentEditable) item.contentEditable = false;
		});
		tool.style.display = "none";
	};

	const remove = () => {
		if (selectedTarget.tagName === "BODY") {
			close();
			return;
		}
		close();
		selectedTarget.remove();
		savePage(false);
	};

	useEffect(() => {
		setName(selectedTarget.tagName);
	}, [selectedTarget]);

	return (
		<div className="selected-element">
			<p className="tag-name">{name}</p>
			<div className="tools">
				<button onClick={remove}>
					<img className="tools-icon" src="img/remove.svg" alt="" />
				</button>
				<button onClick={close}>
					<img className="tools-icon" src="img/cancel.svg" alt="" />
				</button>
			</div>
		</div>
	);
}
