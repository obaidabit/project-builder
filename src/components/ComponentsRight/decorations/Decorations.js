import React, { useEffect, useContext, useState } from "react";
import { ElementContext,ElementContext2 } from "../../../ElementContext";
import BorderRadius from "./BorderRadius";
import Border from "./Border";
import { saveRecord, clearRedoRecord } from "../../../undo";


function Decorations() {
	const [selectedTarget] = useContext(ElementContext2);
	const [selectedElement, setSelectedElement] = useContext(ElementContext);
	const [opacity, setopacity] = useState("");

	useEffect(() => {
		setopacity(selectedElement.opacity);
	}, [selectedElement]);

	const updateState = (name, value) => {
		switch (name) {
			case "opacity":
				setopacity(value);
				break;
			default:
				break;
		}
	};

	const handleInput = e => {
		saveRecord(selectedTarget, "style-change");
		clearRedoRecord();
		updateState(e.target.name, e.target.value);
		const temp = selectedElement;
		switch (e.target.name) {
			case "opacity":
				temp[e.target.name] = e.target.value;
				break;
			default:
				break;
		}

		setSelectedElement(temp);
	};

	return (
		<div style={{ display: "none" }}>
			<div>
				<div>
					<span>Opacity </span>
				</div>
				<div>
					<div>
						<span>
							<input name="opacity" type="range" min="0" max="1" step="0.01" value={opacity ? opacity : "1"} onChange={handleInput}></input>
						</span>
					</div>
					<div>
						<span>
							<input name="opacity" type="text" value={opacity ? opacity : ""} onChange={handleInput} placeholder="1" />
						</span>
					</div>
				</div>
			</div>
			<br />
			<BorderRadius />
			<br />
			<Border />
		</div>
	);
}

export default Decorations;
