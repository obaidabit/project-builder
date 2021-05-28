import React, { useState, useContext, useEffect } from "react";
import { ElementContext, ElementContext2 } from "../../../ElementContext";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { saveRecord, clearRedoRecord } from "../../../undo";

let px;

function Border() {
	const [selectedTarget] = useContext(ElementContext2);
	const [selectedElement, setSelectedElement] = useContext(ElementContext);
	const [borderWidth, setborderWidth] = useState("");
	const [borderStyle, setborderStyle] = useState("");
	const [borderColor, setborderColor] = useState("");
	const [px_d1, setPx_d1] = useState("px");

	useEffect(() => {
		setborderWidth(check(selectedElement.borderWidth));
		setPx_d1(px);
		setborderStyle(selectedElement.borderStyle);
		setborderColor(checkColor(selectedElement.borderColor));
	}, [selectedElement]);

	const checkColor = value => {
		if (value !== "") {
			if (value !== undefined) {
				//red
				var r = parseInt(value.slice(value.indexOf("(") + 1, value.indexOf(",")));
				r = r.toString(16);
				r = r.length === 1 ? "0" + r : r;
				//green
				value = value.slice(value.indexOf(",") + 1);
				var g = parseInt(value.slice(0, value.indexOf(",")));
				g = g.toString(16);
				g = g.length === 1 ? "0" + g : g;
				//blue
				value = value.slice(value.indexOf(",") + 1);
				var b = parseInt(value.slice(0, value.indexOf(",")));
				b = b.toString(16);
				b = b.length === 1 ? "0" + b : b;

				return "#" + r + g + b;
			}
		} else {
			return "#000000";
		}
	};

	const check = value => {
		let num = "";
		px = "";
		if (value === "") {
			return;
		} else {
			if (value !== undefined) {
				num = value.indexOf("p");
				if (num === -1) {
					num = value.indexOf("em");
				}
				px = value.slice(num);
				value = value.slice(0, num);
				return value;
			}
		}
	};

	const updateState = (name, value) => {
		switch (name) {
			case "borderWidth":
				setborderWidth(value);
				break;
			case "borderStyle":
				setborderStyle(value);
				break;
			case "borderColor":
				setborderColor(value);
				break;
			case "px_d1":
				setPx_d1(value);
				break;
			default:
				break;
		}
	};

	const handleSelect = e => {
		saveRecord(selectedTarget, "style-change");
		clearRedoRecord();
		updateState(e.target.name, e.target.value);
		const temp = selectedElement;
		temp[e.target.name] = e.target.value;
		setSelectedElement(temp);
	};

	const handleInput = e => {
		saveRecord(selectedTarget, "style-change");
		clearRedoRecord();
		updateState(e.target.name, e.target.value);
		const temp = selectedElement;
		switch (e.target.name) {
			case "borderWidth":
				temp[e.target.name] = e.target.value + px_d1;
				break;
			case "borderStyle":
				temp[e.target.name] = e.target.value;
				break;
			case "borderColor":
				temp[e.target.name] = e.target.value;
				break;
			default:
				break;
		}

		setSelectedElement(temp);
	};

	const handlePx = e => {
		saveRecord(selectedTarget, "style-change");
		clearRedoRecord();
		updateState(e.target.name, e.target.value);
		const temp = selectedElement;
		switch (e.target.name) {
			case "px_d1":
				temp.borderWidth = borderWidth + e.target.value;
				break;
			default:
				break;
		}
	};
	const checkInput = e => {
		var ch = String.fromCharCode(e.which);
		if (e.target.name !== "borderColor") {
			if (!/[0-9]/.test(ch)) {
				e.preventDefault();
			}
		} else {
			if (!/[0-9-#]/.test(ch)) {
				e.preventDefault();
			}
		}
	};

	const increase = e => {
		var value = e.target.value;
		if (value === "") {
			updateState(e.target.name, "0");
		} else {
			value = parseInt(value) + 1;
			e.target.value = value.toString();
			updateState(e.target.name, e.target.value);
			handleInput(e);
		}
	};

	const decrease = e => {
		var value = e.target.value;
		if (value === "") {
			updateState(e.target.name, "0");
		} else {
			value = parseInt(value) - 1;
			e.target.value = value.toString();
			updateState(e.target.name, e.target.value);
			handleInput(e);
		}
	};

	return (
		<div>
			<div>
				<span>Border</span>
			</div>
			<div>
				<div>
					<div>
						<span>Border Width </span>
					</div>
					<div>
						<span>
							<input name="borderWidth" type="text" value={borderWidth ? borderWidth : ""} onChange={handleInput} onKeyPress={checkInput}></input>
						</span>
						<span>
							<select name="px_d1" value={px_d1} onChange={handlePx}>
								<option value="px">px</option>
								<option value="em">em</option>
							</select>
						</span>

						<div>
							<button id="+borderWidth" name="borderWidth" value={borderWidth ? borderWidth : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+borderWidth">
								<TiArrowSortedUp />
							</label>

							<button id="-borderWidth" name="borderWidth" value={borderWidth ? borderWidth : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-borderWidth">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>

				<div>
					<div>
						<span>Border Style</span>
					</div>
					<div>
						<span>
							<select name="borderStyle" value={borderStyle ? borderStyle : ""} onChange={handleSelect}>
								<option value=""></option>
								<option value="none">none</option>
								<option value="solid">solid</option>
								<option value="dotted">dotted</option>
								<option value="dashed">dashed</option>
								<option value="double">double</option>
								<option value="groove">groove</option>
								<option value="ridge">ridge</option>
								<option value="inset">inset</option>
								<option value="outset">outset</option>
							</select>
						</span>
					</div>
				</div>

				<div>
					<div>
						<span>Border Color </span>
					</div>
					<div>
						<div>
							<span>
								<input name="borderColor" type="text" value={borderColor ? borderColor : ""} onChange={handleSelect} onKeyPress={checkInput}></input>
								<input name="borderColor" type="color" value={borderColor ? borderColor : ""} onChange={handleSelect}></input>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Border;
