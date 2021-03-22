import React, { useEffect, useContext, useState } from "react";
import { ElementContext } from "../../ElementContext";
let px;

export default function General() {
	const [selectedElement, setSelectedElement] = useContext(ElementContext);
	const [display, setDisplay] = useState("");
	const [position, setPosition] = useState("");
	const [top, setTop] = useState("");
	const [left, setLeft] = useState("");
	const [right, setRight] = useState("");
	const [bottom, setBottom] = useState("");
	const [px1, setPx1] = useState("px");
	const [px2, setPx2] = useState("px");
	const [px3, setPx3] = useState("px");
	const [px4, setPx4] = useState("px");

	useEffect(() => {
		setDisplay(selectedElement.display);
		setPosition(selectedElement.position);
		setTop(check(selectedElement.top));
		setPx1(px);
		setLeft(check(selectedElement.left));
		setPx2(px);
		setRight(check(selectedElement.right));
		setPx3(px);
		setBottom(check(selectedElement.bottom));
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
				console.log(num);
				px = value.slice(num);
				console.log(px);
				value = value.slice(0, num);
				return value;
			}
		}
	};

	const updateState = (name, value) => {
		switch (name) {
			case "display":
				setDisplay(value);
				break;
			case "position":
				setPosition(value);
				break;
			case "top":
				setTop(value);
				break;
			case "bottom":
				setBottom(value);
				break;
			case "left":
				setLeft(value);
				break;
			case "right":
				setRight(value);
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

	const handleSelect = e => {
		updateState(e.target.name, e.target.value);
		const temp = selectedElement;
		temp[e.target.name] = e.target.value;
		setSelectedElement(temp);
	};

	const handleInput = e => {
		updateState(e.target.name, e.target.value);
		const temp = selectedElement;
		switch (e.target.name) {
			case "top":
				console.log(px1);
				temp[e.target.name] = e.target.value + px1;
				break;
			case "bottom":
				console.log(px1);
				temp[e.target.name] = e.target.value + px2;
				break;
			case "right":
				console.log(px1);
				temp[e.target.name] = e.target.value + px3;
				break;
			case "left":
				console.log(px1);
				temp[e.target.name] = e.target.value + px4;
				break;

			default:
				break;
		}

		setSelectedElement(temp);
	};

	const handlePx = e => {
		updateState(e.target.name, e.target.value);
		const temp = selectedElement;
		switch (e.target.name) {
			case "px1":
				temp.top = top + e.target.value;
				break;
			case "px2":
				temp.bottom = bottom + e.target.value;
				break;
			case "px3":
				temp.right = right + e.target.value;
				break;
			case "px4":
				temp.left = left + e.target.value;
				break;
			default:
				break;
		}
	};

	const checkInput = e => {
		var ch = String.fromCharCode(e.which);
		console.log(e.which);
		if (!/[0-9-auto]/.test(ch)) {
			e.preventDefault();
		}
	};

	return (
		<div style={{ display: "none" }}>
			<div>
				<div>
					<span>Display</span>
				</div>
				<div>
					<span>
						<select name="display" value={display ? display : ""} onChange={handleSelect}>
							<option value=""></option>
							<option value="block">block</option>
							<option value="inline">inline</option>
							<option value="inline-block">inline-block</option>
							<option value="flex">flex</option>
							<option value="none">none</option>
						</select>
					</span>
				</div>
			</div>
			<div>
				<div>
					<span>Position </span>
				</div>
				<div>
					<span>
						<select name="position" value={position ? position : ""} onChange={handleSelect}>
							<option value=""></option>
							<option value="static">static</option>
							<option value="relative">relative</option>
							<option value="absolute">absolute</option>
							<option value="fixed">fixed</option>
						</select>
					</span>
				</div>
			</div>
			<div>
				<div>
					<span>Top </span>
				</div>
				<div>
					<div>
						<span>
							<input name="top" type="text" value={top ? top : ""} onChange={handleInput} onKeyPress={checkInput} placeholder="auto"></input>
						</span>
						<span>
							<select name="px1" value={px1 ? px1 : ""} onChange={handlePx}>
								<option value="px">px</option>
								<option value="%">%</option>
								<option value="vh">vh</option>
							</select>
						</span>
					</div>
				</div>
			</div>
			<div>
				<div>
					<span>Bottom </span>
				</div>
				<div>
					<span>
						<input name="bottom" type="text" value={bottom ? bottom : ""} onChange={handleInput} onKeyPress={checkInput} placeholder="auto"></input>
					</span>
					<span>
						<select name="px2" value={px2 ? px2 : ""} onChange={handlePx}>
							<option value="px">px</option>
							<option value="%">%</option>
							<option value="vh">vh</option>
						</select>
					</span>
				</div>
			</div>
			<div>
				<div>
					<span>Right </span>
				</div>
				<div>
					<span>
						<input name="right" type="text" value={right ? right : ""} onChange={handleInput} onKeyPress={checkInput} placeholder="auto"></input>
					</span>
					<span>
						<select name="px3" value={px3 ? px3 : ""} onChange={handlePx}>
							<option value="px">px</option>
							<option value="%">%</option>
							<option value="vh">vh</option>
						</select>
					</span>
				</div>
			</div>
			<div>
				<div>
					<span>Left </span>
				</div>
				<div>
					<span>
						<input name="left" type="text" value={left ? left : ""} onChange={handleInput} onKeyPress={checkInput} placeholder="auto"></input>
					</span>
					<span>
						<select name="px4" value={px4 ? px4 : ""} onChange={handlePx}>
							<option value="px">px</option>
							<option value="%">%</option>
							<option value="vh">vh</option>
						</select>
					</span>
				</div>
			</div>
		</div>
	);
}
