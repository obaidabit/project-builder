import React, { useState, useContext, useEffect } from "react"
import { ElementContext, ElementContext2 } from "../../../ElementContext"
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti"
import { saveRecord, clearRedoRecord } from "../../../undo"
import savePage from "../../../savePage"

function Transition() {
	const [selectedTarget] = useContext(ElementContext2)
	//this variable is used for undo and redo functions
	const [selectedElement, setSelectedElement] = useContext(ElementContext)
	const [transitionProperty, settransitionProperty] = useState("")
	const [transitionDuration, settransitionDuration] = useState("")
	const [transitionTimingFunction, settransitionTimingFunction] = useState("")
	const [transitionDelay, settransitionDelay] = useState("")

	useEffect(() => {
		settransitionProperty(selectedElement.transitionProperty)
		settransitionDuration(check(selectedElement.transitionDuration))
		settransitionTimingFunction(selectedElement.transitionTimingFunction)
		settransitionDelay(check(selectedElement.transitionDelay))
	}, [selectedElement])

	const check = value => {
		let num = ""
		if (value === "") {
			return
		} else {
			if (value !== undefined) {
				num = value.indexOf("s")
				value = value.slice(0, num)
				savePage(false)
				return value
			}
		}
	}

	const updateState = (name, value) => {
		switch (name) {
			case "transitionProperty":
				settransitionProperty(value)
				break
			case "transitionDuration":
				settransitionDuration(value)
				break
			case "transitionTimingFunction":
				settransitionTimingFunction(value)
				break
			case "transitionDelay":
				settransitionDelay(value)
				break
			default:
				break
		}
		savePage(false)
	}

	const handleInput = e => {
		saveRecord(selectedTarget, "style-change")
		clearRedoRecord()
		updateState(e.target.name, e.target.value)
		const temp = selectedElement
		switch (e.target.name) {
			case "transitionProperty":
				temp[e.target.name] = e.target.value
				break
			case "transitionDuration":
				temp[e.target.name] = e.target.value ? e.target.value + "s" : "0s"
				break
			case "transitionTimingFunction":
				temp[e.target.name] = e.target.value
				break
			case "transitionDelay":
				temp[e.target.name] = e.target.value ? e.target.value + "s" : "0s"
				break
			default:
				break
		}
		setSelectedElement(temp)
		savePage(false)
	}
	const checkInput = e => {
		var ch = String.fromCharCode(e.which)
		if (e.target.name !== "color") {
			if (!/[0-9]/.test(ch)) {
				e.preventDefault()
			}
		}
	}

	const increase = e => {
		var value = e.target.value
		if (value === "") {
			updateState(e.target.name, "0")
		} else {
			value = parseInt(value) + 1
			e.target.value = value.toString()
			updateState(e.target.name, e.target.value)
			handleInput(e)
		}
		savePage(false)
	}

	const decrease = e => {
		var value = e.target.value
		if (value === "") {
			updateState(e.target.name, "0")
		} else {
			value = parseInt(value) - 1
			e.target.value = value.toString()
			updateState(e.target.name, e.target.value)
			handleInput(e)
		}
		savePage(false)
	}

	return (
		<div className="expand-grid m-t-2">
			<div>
				<span>Transition</span>
			</div>
			<div className="style-group">
				<div>
					<span>Property</span>

					<div>
						<select className="shadow" name="transitionProperty" value={transitionProperty ? transitionProperty : ""} onChange={handleInput}>
							<option value=""></option>
							<option value="all">All</option>
							<option value="width">Width</option>
							<option value="height">Height</option>
							<option value="background-color">background-color</option>
							<option value="transform">Transform</option>
							<option value="box-shadow">box-shadow</option>
							<option value="opacity">Opacity</option>
						</select>
					</div>
				</div>
				<div>
					<div>
						<span>Duration </span>
					</div>
					<div>
						<div className="flex-row shadow">
							<input name="transitionDuration" type="text" value={transitionDuration ? transitionDuration : ""} onChange={handleInput} onKeyPress={checkInput}></input>

							<select name="sec">
								<option value="s">s</option>
							</select>

							<div className="white">
								<button id="+transitionDuration" name="transitionDuration" value={transitionDuration ? transitionDuration : ""} onClick={increase} style={{ display: "none" }} />
								<label className="icon-label" htmlFor="+transitionDuration">
									<TiArrowSortedUp />
								</label>

								<button id="-transitionDuration" name="transitionDuration" value={transitionDuration ? transitionDuration : ""} onClick={decrease} style={{ display: "none" }} />
								<label className="icon-label" htmlFor="-transitionDuration">
									<TiArrowSortedDown />
								</label>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div>
						<span>Easing</span>
					</div>
					<div className="shadow">
						<select name="transitionTimingFunction" value={transitionTimingFunction ? transitionTimingFunction : ""} onChange={handleInput}>
							<option value=""></option>
							<option value="linear">Linear</option>
							<option value="ease">Ease</option>
							<option value="ease-in">Ease-In</option>
							<option value="ease-out">Ease-Out</option>
							<option value="ease-in-out">Ease-In-Out</option>
						</select>
					</div>
				</div>

				<div>
					<div>
						<span>Delay </span>
					</div>
					<div>
						<div className="flex-row shadow">
							<input name="transitionDelay" type="text" value={transitionDelay ? transitionDelay : ""} onChange={handleInput} onKeyPress={checkInput}></input>

							<select name="sec2">
								<option value="s">s</option>
							</select>

							<div className="white">
								<button id="+transitionDelay" name="transitionDelay" value={transitionDelay ? transitionDelay : ""} onClick={increase} style={{ display: "none" }} />
								<label className="icon-label" htmlFor="+transitionDelay">
									<TiArrowSortedUp />
								</label>

								<button id="-transitionDelay" name="transitionDelay" value={transitionDelay ? transitionDelay : ""} onClick={decrease} style={{ display: "none" }} />
								<label className="icon-label" htmlFor="-transitionDuration">
									<TiArrowSortedDown />
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Transition
