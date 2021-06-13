import React, { useState, useContext, useEffect } from "react"
import { ElementContext, ElementContext2 } from "../../../ElementContext"
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti"
import { saveRecord, clearRedoRecord } from "../../../undo"
import savePage from "../../../savePage"

let px

function Padding() {
	const [selectedTarget] = useContext(ElementContext2)
	const [selectedElement, setSelectedElement] = useContext(ElementContext)
	const [paddingTop, setpaddingTop] = useState("")
	const [paddingBottom, setpaddingBottom] = useState("")
	const [paddingRight, setpaddingRight] = useState("")
	const [paddingLeft, setpaddingLeft] = useState("")
	const [px_d1, setPx_d1] = useState("px")
	const [px_d2, setPx_d2] = useState("px")
	const [px_d3, setPx_d3] = useState("px")
	const [px_d4, setPx_d4] = useState("px")

	useEffect(() => {
		setpaddingTop(check(selectedElement.paddingTop))
		setPx_d1(px)
		setpaddingBottom(check(selectedElement.paddingBottom))
		setPx_d2(px)
		setpaddingRight(check(selectedElement.paddingRight))
		setPx_d3(px)
		setpaddingLeft(check(selectedElement.paddingLeft))
		setPx_d4(px)
	}, [selectedElement])

	const check = value => {
		let num = ""
		px = ""
		if (value === "") {
			return
		} else {
			if (value !== undefined) {
				num = value.indexOf("p")
				if (num === -1) {
					num = value.indexOf("%")
					if (num === -1) {
						num = value.indexOf("v")
					}
				}
				px = value.slice(num)
				value = value.slice(0, num)
				savePage(false)
				return value
			}
		}
	}

	const updateState = (name, value) => {
		switch (name) {
			case "paddingTop":
				setpaddingTop(value)
				break
			case "paddingBottom":
				setpaddingBottom(value)
				break
			case "paddingRight":
				setpaddingRight(value)
				break
			case "paddingLeft":
				setpaddingLeft(value)
				break
			case "px_d1":
				setPx_d1(value)
				break
			case "px_d2":
				setPx_d2(value)
				break
			case "px_d3":
				setPx_d3(value)
				break
			case "px_d4":
				setPx_d4(value)
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
			case "paddingTop":
				temp[e.target.name] = e.target.value + px_d1
				break
			case "paddingBottom":
				temp[e.target.name] = e.target.value + px_d2
				break
			case "paddingRight":
				temp[e.target.name] = e.target.value + px_d3
				break
			case "paddingLeft":
				temp[e.target.name] = e.target.value + px_d4
				break

			default:
				break
		}

		setSelectedElement(temp)
		savePage(false)
	}

	const handlePx = e => {
		saveRecord(selectedTarget, "style-change")
		clearRedoRecord()

		updateState(e.target.name, e.target.value)
		const temp = selectedElement
		switch (e.target.name) {
			case "px_d1":
				temp.paddingTop = paddingTop + e.target.value
				break
			case "px_d2":
				temp.paddingBottom = paddingBottom + e.target.value
				break
			case "px_d3":
				temp.paddingRight = paddingRight + e.target.value
				break
			case "px_d4":
				temp.paddingLeft = paddingLeft + e.target.value
				break
			default:
				break
		}
		savePage(false)
	}
	const checkInput = e => {
		var ch = String.fromCharCode(e.which)
		if (!/[0-9-auto]/.test(ch)) {
			e.preventDefault()
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
				<span>Padding</span>
			</div>
			<div className="style-group">
				<div>
					<div>
						<span>Top </span>
					</div>
					<div className="flex-row shadow">
						<input name="paddingTop" type="text" value={paddingTop ? paddingTop : ""} onChange={handleInput} onKeyPress={checkInput}></input>

						<select name="px_d1" value={px_d1} onChange={handlePx}>
							<option value="px">px</option>
							<option value="%">%</option>
							<option value="vh">vh</option>
						</select>

						<div className="white">
							<button id="+Ptop" name="paddingTop" value={paddingTop ? paddingTop : ""} onClick={increase} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="+Ptop">
								<TiArrowSortedUp />
							</label>

							<button id="-Ptop" name="paddingTop" value={paddingTop ? paddingTop : ""} onClick={decrease} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="-Ptop">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
				<div>
					<div>
						<span>Bottom </span>
					</div>
					<div className="flex-row shadow">
						<input name="paddingBottom" type="text" value={paddingBottom ? paddingBottom : ""} onChange={handleInput} onKeyPress={checkInput}></input>

						<select name="px_d2" value={px_d2} onChange={handlePx}>
							<option value="px">px</option>
							<option value="%">%</option>
							<option value="vh">vh</option>
						</select>

						<div className="white">
							<button id="+PBottom" name="paddingBottom" value={paddingBottom ? paddingBottom : ""} onClick={increase} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="+PBottom">
								<TiArrowSortedUp />
							</label>

							<button id="-PBottom" name="paddingBottom" value={paddingBottom ? paddingBottom : ""} onClick={decrease} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="-PBottom">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
				<div>
					<div>
						<span>Right </span>
					</div>
					<div className="flex-row shadow">
						<input name="paddingRight" type="text" value={paddingRight ? paddingRight : ""} onChange={handleInput} onKeyPress={checkInput}></input>

						<select name="px_d3" value={px_d3} onChange={handlePx}>
							<option value="px">px</option>
							<option value="%">%</option>
							<option value="vh">vh</option>
						</select>

						<div className="white">
							<button id="+PRight" name="paddingRight" value={paddingRight ? paddingRight : ""} onClick={increase} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="+PRight">
								<TiArrowSortedUp />
							</label>

							<button id="-PRight" name="paddingRight" value={paddingRight ? paddingRight : ""} onClick={decrease} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="-PRight">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
				<div>
					<div>
						<span>Left </span>
					</div>
					<div className="flex-row shadow">
						<input name="paddingLeft" type="text" value={paddingLeft ? paddingLeft : ""} onChange={handleInput} onKeyPress={checkInput}></input>

						<select name="px_d4" value={px_d4} onChange={handlePx}>
							<option value="px">px</option>
							<option value="%">%</option>
							<option value="vh">vh</option>
						</select>

						<div className="white">
							<button id="+PLeft" name="paddingLeft" value={paddingLeft ? paddingLeft : ""} onClick={increase} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="+PLeft">
								<TiArrowSortedUp />
							</label>

							<button id="-PLeft" name="paddingLeft" value={paddingLeft ? paddingLeft : ""} onClick={decrease} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="-PLeft">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Padding
