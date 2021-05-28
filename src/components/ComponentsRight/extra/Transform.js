import React, { useState, useContext, useEffect } from "react";
import { ElementContext,ElementContext2} from "../../../ElementContext";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { saveRecord, clearRedoRecord } from "../../../undo";

let RotateX, RotateY, RotateZ, ScaleX, ScaleY, ScaleZ;

function Transform() {
	const [selectedTarget] = useContext(ElementContext2);
	const [selectedElement, setSelectedElement] = useContext(ElementContext);
	const [rotateX, setrotateX] = useState("");
	const [rotateY, setrotateY] = useState("");
	const [rotateZ, setrotateZ] = useState("");
	const [scaleX, setscaleX] = useState("");
	const [scaleY, setscaleY] = useState("");
	const [scaleZ, setscaleZ] = useState("");

	useEffect(() => {
		check(selectedElement.transform);
		setrotateX(RotateX);
		setrotateY(RotateY);
		setrotateZ(RotateZ);
		setscaleX(ScaleX);
		setscaleY(ScaleY);
		setscaleZ(ScaleZ);
	}, [selectedElement]);

	const check = value => {
		RotateX = "";
		RotateY = "";
		RotateZ = "";
		ScaleX = "";
		ScaleY = "";
		ScaleZ = "";
		if (value === "") {
			return;
		} else {
			if (value !== undefined) {
				//Valaue in rotateX
				RotateX = value.slice(value.indexOf("(") + 1, value.indexOf("d"));
				value = value.slice(value.indexOf(")") + 1);
				//Valaue in rotateY
				RotateY = value.slice(value.indexOf("(") + 1, value.indexOf("d"));
				value = value.slice(value.indexOf(")") + 1);
				//Valaue in rotateZ
				RotateZ = value.slice(value.indexOf("(") + 1, value.indexOf("d"));
				value = value.slice(value.indexOf(")") + 1);

				//Valaue in scaleX
				ScaleX = value.slice(value.indexOf("(") + 1, value.indexOf(")"));
				value = value.slice(value.indexOf(")") + 1);
				//Valaue in rotateY
				ScaleY = value.slice(value.indexOf("(") + 1, value.indexOf(")"));
				value = value.slice(value.indexOf(")") + 1);
				//Valaue in rotateZ
				ScaleZ = value.slice(value.indexOf("(") + 1, value.indexOf(")"));
				value = value.slice(value.indexOf(")") + 1);
			}
		}
	};

	const updateState = (name, value) => {
		switch (name) {
			case "rotateX":
				setrotateX(value);
				break;
			case "rotateY":
				setrotateY(value);
				break;
			case "rotateZ":
				setrotateZ(value);
				break;
			case "scaleX":
				setscaleX(value);
				break;
			case "scaleY":
				setscaleY(value);
				break;
			case "scaleZ":
				setscaleZ(value);
				break;

			default:
				break;
		}
	};

	const handleInput = e => {
		saveRecord(selectedTarget, "style-change");
		clearRedoRecord();
		updateState(e.target.name, e.target.value);
		const value = e.target.value;
		const scale = `scaleX(${scaleX ? scaleX : 1}) scaleY(${scaleY ? scaleY : 1}) scaleZ(${scaleZ ? scaleZ : 1})`;
		const rotate = `rotateX(${rotateX ? rotateX : 0}deg)   rotateY(${rotateY ? rotateY : 0}deg) rotateZ(${rotateZ ? rotateZ : 0}deg)`;
		const temp = selectedElement;

		switch (e.target.name) {
			case "rotateX":
				temp.transform = `rotateX(${value ? value : 0}deg)   rotateY(${rotateY ? rotateY : 0}deg) rotateZ(${rotateZ ? rotateZ : 0}deg) ${scale}`;
				break;
			case "rotateY":
				temp.transform = `rotateX(${rotateX ? rotateX : 0}deg) rotateY(${value ? value : 0}deg) rotateZ(${rotateZ ? rotateZ : 0}deg) ${scale}`;
				break;
			case "rotateZ":
				temp.transform = `rotateX(${rotateX ? rotateX : 0}deg) rotateY(${rotateY ? rotateY : 0}deg) rotateZ(${value ? value : 0}deg) ${scale}`;
				break;

			case "scaleX":
				temp.transform = `${rotate} scaleX(${value ? value : 1}) scaleY(${scaleY ? scaleY : 1}) scaleZ(${scaleZ ? scaleZ : 1})  `;
				break;
			case "scaleY":
				temp.transform = `${rotate} scaleX(${scaleX ? scaleX : 1}) scaleY(${value ? value : 1}) scaleZ(${scaleZ ? scaleZ : 1})  `;
				break;
			case "scaleZ":
				temp.transform = `${rotate} scaleX(${scaleX ? scaleX : 1}) scaleY(${scaleY ? scaleY : 1}) scaleZ(${value ? value : 1})  `;
				break;

			default:
				break;
		}

		setSelectedElement(temp);
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
		<div>
			<div>
				<span>Transform</span>
			</div>
			<div>
				<div>
					<div>
						<span>rotateX </span>
					</div>
					<div>
						<span>
							<input name="rotateX" type="text" value={rotateX ? rotateX : ""} onChange={handleInput} onKeyPress={checkInput}></input>
						</span>

						<div>
							<button id="+rotateX" name="rotateX" value={rotateX ? rotateX : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+rotateX">
								<TiArrowSortedUp />
							</label>

							<button id="-rotateX" name="rotateX" value={rotateX ? rotateX : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-rotateX">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
				<div>
					<div>
						<span>rotateY </span>
					</div>
					<div>
						<span>
							<input name="rotateY" type="text" value={rotateY ? rotateY : ""} onChange={handleInput} onKeyPress={checkInput}></input>
						</span>

						<div>
							<button id="+rotateY" name="rotateY" value={rotateY ? rotateY : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+rotateY">
								<TiArrowSortedUp />
							</label>

							<button id="-rotateY" name="rotateY" value={rotateY ? rotateY : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-rotateY">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
				<div>
					<div>
						<span>rotateZ </span>
					</div>
					<div>
						<span>
							<input name="rotateZ" type="text" value={rotateZ ? rotateZ : ""} onChange={handleInput} onKeyPress={checkInput}></input>
						</span>

						<div>
							<button id="+rotateZ" name="rotateZ" value={rotateZ ? rotateZ : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+rotateZ">
								<TiArrowSortedUp />
							</label>

							<button id="-rotateZ" name="rotateZ" value={rotateZ ? rotateZ : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-rotateZ">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>

				<div>
					<div>
						<span>scaleX </span>
					</div>
					<div>
						<span>
							<input name="scaleX" type="text" value={scaleX ? scaleX : ""} onChange={handleInput} onKeyPress={checkInput}></input>
						</span>
						<div>
							<button id="+scaleX" name="scaleX" value={scaleX ? scaleX : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+scaleX">
								<TiArrowSortedUp />
							</label>

							<button id="-scaleX" name="scaleX" value={scaleX ? scaleX : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-scaleX">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>

				<div>
					<div>
						<span>scaleY </span>
					</div>
					<div>
						<span>
							<input name="scaleY" type="text" value={scaleY ? scaleY : ""} onChange={handleInput} onKeyPress={checkInput}></input>
						</span>

						<div>
							<button id="+scaleY" name="scaleY" value={scaleY ? scaleY : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+scaleY">
								<TiArrowSortedUp />
							</label>

							<button id="-scaleY" name="scaleY" value={scaleY ? scaleY : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-scaleY">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>

				<div>
					<div>
						<span>scaleZ </span>
					</div>
					<div>
						<span>
							<input name="scaleZ" type="text" value={scaleZ ? scaleZ : ""} onChange={handleInput} onKeyPress={checkInput}></input>
						</span>
						<div>
							<button id="+scaleZ" name="scaleZ" value={scaleZ ? scaleZ : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+scaleZ">
								<TiArrowSortedUp />
							</label>

							<button id="-scaleZ" name="scaleZ" value={scaleZ ? scaleZ : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-scaleZ">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Transform;
