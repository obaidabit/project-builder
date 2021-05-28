import React, { useState, useContext, useEffect } from "react";
import { ElementContext, ElementContext2 } from "../../../ElementContext";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { saveRecord, clearRedoRecord } from "../../../undo";

import Margin from "./Margin";
import Padding from "./Padding";
let px;

function Dimension() {
	const [selectedTarget] = useContext(ElementContext2);
	const [selectedElement, setSelectedElement] = useContext(ElementContext);
	const [width, setWidth] = useState("");
	const [height, setHeight] = useState("");
	const [maxWidth, setmaxWidth] = useState("");
	const [minHeight, setminHeight] = useState("");
	const [px1, setPx1] = useState("px");
	const [px2, setPx2] = useState("px");
	const [px3, setPx3] = useState("px");
	const [px4, setPx4] = useState("px");

	useEffect(() => {
		setWidth(check(selectedElement.width));
		setPx1(px);
		setHeight(check(selectedElement.height));
		setPx2(px);
		setmaxWidth(check(selectedElement.maxWidth));
		setPx3(px);
		setminHeight(check(selectedElement.minHeight));
		setPx4(px);
	}, [selectedElement]);

	const check = value => {
		let num = "";
		px = "";
		if (value === "") {
			return;
		} else {
			if (value !== undefined) {
				num = value.indexOf("p");
				if (num === -1) {
					num = value.indexOf("%");
					if (num === -1) {
						num = value.indexOf("v");
					}
				}
				px = value.slice(num);
				value = value.slice(0, num);
				return value;
			}
		}
	};

	const updateState = (name, value) => {
		switch (name) {
			case "width":
				setWidth(value);
				break;
			case "height":
				setHeight(value);
				break;
			case "maxWidth":
				setmaxWidth(value);
				break;
			case "minHeight":
				setminHeight(value);
				break;
			case "px1":
				setPx1(value);
				break;
			case "px2":
				setPx2(value);
				break;
			case "px3":
				setPx3(value);
				break;
			case "px4":
				setPx4(value);
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
			case "width":
				temp[e.target.name] = e.target.value + px1;
				break;
			case "height":
				temp[e.target.name] = e.target.value + px2;
				break;
			case "maxWidth":
				temp[e.target.name] = e.target.value + px3;
				break;
			case "minHeight":
				temp[e.target.name] = e.target.value + px4;
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
			case "px1":
				temp.width = width + e.target.value;
				break;
			case "px2":
				temp.height = height + e.target.value;
				break;
			case "px3":
				temp.maxWidth = maxWidth + e.target.value;
				break;
			case "px4":
				temp.minHeight = minHeight + e.target.value;
				break;
			default:
				break;
		}
	};

	const checkInput = e => {
		var ch = String.fromCharCode(e.which);
		if (!/[0-9]/.test(ch)) {
			e.preventDefault();
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
		<div style={{ display: "none" }}>
			<div>
				<div>
					<span>Width </span>
				</div>
				<div>
					<div>
						<span>
							<input name="width" type="text" value={width ? width : ""} onChange={handleInput} onKeyPress={checkInput} placeholder="auto"></input>
						</span>
						<span>
							<select name="px1" value={px1}  onChange={handlePx}>
								<option value="px">px</option>
								<option value="%">%</option>
								<option value="vh">vh</option>
							</select>
						</span>

						<div>
							<button id="+width" name="width" value={width ? width : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+width">
								<TiArrowSortedUp />
							</label>

							<button id="-width" name="width" value={width ? width : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-width">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div>
					<span>Height </span>
				</div>
				<div>
					<div>
						<span>
							<input name="height" type="text" value={height ? height : ""} onChange={handleInput} onKeyPress={checkInput} placeholder="auto"></input>
						</span>
						<span>
							<select name="px2" value={px2} onChange={handlePx}>
								<option value="px">px</option>
								<option value="%">%</option>
								<option value="vh">vh</option>
							</select>
						</span>

						<div>
							<button id="+height" name="height" value={height ? height : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+height">
								<TiArrowSortedUp />
							</label>

							<button id="-height" name="height" value={height ? height : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-height">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div>
					<span>Max-Width </span>
				</div>
				<div>
					<div>
						<span>
							<input name="maxWidth" type="text" value={maxWidth ? maxWidth : ""} onChange={handleInput} onKeyPress={checkInput} placeholder="auto"></input>
						</span>
						<span>
							<select name="px3" value={px3} onChange={handlePx}>
								<option value="px">px</option>
								<option value="%">%</option>
								<option value="vh">vh</option>
							</select>
						</span>

						<div>
							<button id="+max" name="maxWidth" value={maxWidth ? maxWidth : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+max">
								<TiArrowSortedUp />
							</label>

							<button id="-max" name="maxWidth" value={maxWidth ? maxWidth : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-max">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
			</div>

			<div>
				<div>
					<span>Min-Hight </span>
				</div>
				<div>
					<div>
						<span>
							<input name="minHeight" type="text" value={minHeight ? minHeight : ""} onChange={handleInput} onKeyPress={checkInput} placeholder="auto"></input>
						</span>
						<span>
							<select name="px4" value={px4} onChange={handlePx}>
								<option value="px">px</option>
								<option value="%">%</option>
								<option value="vh">vh</option>
							</select>
						</span>

						<div>
							<button id="+min" name="minHeight" value={minHeight ? minHeight : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+min">
								<TiArrowSortedUp />
							</label>

							<button id="-min" name="minHeight" value={minHeight ? minHeight : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-min">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
			</div>
			<br />
			<Margin />
			<br />
			<Padding />
		</div>
	);
}

export default Dimension;
