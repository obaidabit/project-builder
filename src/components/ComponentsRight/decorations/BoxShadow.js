import React, { useState, useContext, useEffect } from "react"
import { ElementContext } from "../../../ElementContext"
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti"
import savePage from "../../../savePage"
let r, g, b, x, y, blur, spread, type

function TextShadow() {
	const [selectedElement, setSelectedElement] = useContext(ElementContext)
	const [BXposition, setBXposition] = useState("")
	const [BYposition, setBYposition] = useState("")
	const [BBlur, setBBlur] = useState("")
	const [BSpread, setBSpread] = useState("")
	const [color, setColor] = useState("#000000")
	const [Type, setType] = useState("")

	useEffect(() => {
		checkColor(selectedElement.boxShadow)
		setBXposition(x)
		setBYposition(y)
		setBBlur(blur)
		setBSpread(spread)
		setType(type)
	}, [selectedElement])

	const checkColor = value => {
		r = ""
		g = ""
		b = ""
		x = ""
		y = ""
		blur = ""
		spread = ""
		type = ""
		if (value !== "") {
			if (value !== undefined) {
				//red
				r = parseInt(value.slice(value.indexOf("(") + 1, value.indexOf(",")))
				r = r.toString(16)
				r = r.length === 1 ? "0" + r : r
				//green
				value = value.slice(value.indexOf(",") + 1)
				g = parseInt(value.slice(0, value.indexOf(",")))
				g = g.toString(16)
				g = g.length === 1 ? "0" + g : g
				//blue
				value = value.slice(value.indexOf(",") + 1)
				b = parseInt(value.slice(0, value.indexOf(",")))
				b = b.toString(16)
				b = b.length === 1 ? "0" + b : b
				//BXposition
				x = value.slice(5, value.indexOf("p"))
				value = value.slice(value.indexOf("x"))
				//BYposition
				y = value.slice(2, value.indexOf("p"))
				value = value.slice(value.indexOf("p"))
				//BBlur
				value = value.slice(3)
				blur = value.slice(0, value.indexOf("p"))
				//BSpread
				value = value.slice(3)
				spread = value.slice(0, value.indexOf("p"))
				//type
				value = value.slice(3)
				console.log(value)
				type = value.slice(2)
				if (type !== "inset") {
					type = ""
				}
				savePage(false)
			}
		} else {
			return "#000000"
		}
	}

	const updateState = (name, value) => {
		switch (name) {
			case "BXposition":
				setBXposition(value)
				break
			case "BYposition":
				setBYposition(value)
				break
			case "BBlur":
				setBBlur(value)
				break
			case "BSpread":
				setBSpread(value)
				break
			case "Type":
				setType(value)
				break
			case "color":
				setColor(value)
				break
			default:
				break
		}
		savePage(false)
	}

	const handleInput = e => {
		updateState(e.target.name, e.target.value)
		const value = e.target.value
		const temp = selectedElement
		switch (e.target.name) {
			case "BXposition":
				temp.boxShadow = `${value ? value : "0"}px ${BYposition ? BYposition : "0"}px ${BBlur ? BBlur : "0"}px ${BSpread ? BSpread : "0"}px ${
					color ? color : ""
				} ${Type ? Type : ""}`
				break
			case "BYposition":
				temp.boxShadow = `${BXposition ? BXposition : "0"}px ${value ? value : "0"}px ${BBlur ? BBlur : "0"}px ${BSpread ? BSpread : "0"}px ${
					color ? color : ""
				} ${Type ? Type : ""}`
				break
			case "BBlur":
				temp.boxShadow = `${BXposition ? BXposition : "0"}px ${BYposition ? BYposition : "0"}px ${value ? value : "0"}px ${
					BSpread ? BSpread : "0"
				}px ${color ? color : ""} ${Type ? Type : ""}`
				break
			case "BSpread":
				temp.boxShadow = `${BXposition ? BXposition : "0"}px ${BYposition ? BYposition : "0"}px  ${BBlur ? BBlur : "0"}px ${value ? value : "0"}px ${
					color ? color : ""
				} ${Type ? Type : ""}`
				break
			case "color":
				temp.boxShadow = `${BXposition ? BXposition : "0"}px ${BYposition ? BYposition : "0"}px ${BBlur ? BBlur : "0"}px ${
					BSpread ? BSpread : "0"
				}px ${value ? value : ""} ${Type ? Type : ""}`
				break
			case "Type":
				temp.boxShadow = `${BXposition ? BXposition : "0"}px ${BYposition ? BYposition : "0"}px ${BBlur ? BBlur : "0"}px ${
					BSpread ? BSpread : "0"
				}px ${color ? color : ""} ${value ? value : ""} `
				break
			default:
				break
		}

		setSelectedElement(temp)
		savePage(false)
	}
	const checkInput = e => {
		var ch = String.fromCharCode(e.which)
		if (e.target.name === "BXposition" || e.target.name === "BYposition") {
			if (!/[0-9-]/.test(ch)) {
				e.preventDefault()
			}
		} else if (e.target.name === "BBlur" || e.target.name === "BSpread") {
			if (!/[0-9]/.test(ch)) {
				e.preventDefault()
			}
		} else {
			if (e.target.value.length >= 7) e.preventDefault()
			if (!/[0-9#AaBbCcDdEeFf]/.test(ch)) {
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
				<span className="sub-head">Box Shadow</span>
			</div>
			<div className="style-group">
				<div>
					<div>
						<span>X Position </span>
					</div>
					<div className="flex-row shadow">
						<input name="BXposition" type="text" value={BXposition ? BXposition : ""} onChange={handleInput} onKeyPress={checkInput}></input>

						<select name="px_m1">
							<option value="px">px</option>
						</select>

						<div className="white">
							<button id="+Xpos" name="BXposition" value={BXposition ? BXposition : ""} onClick={increase} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="+Xpos">
								<TiArrowSortedUp />
							</label>

							<button id="-Xpos" name="BXposition" value={BXposition ? BXposition : ""} onClick={decrease} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="-Xpos">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
				<div>
					<div>
						<span>Y Position </span>
					</div>
					<div className="flex-row shadow">
						<input name="BYposition" type="text" value={BYposition ? BYposition : ""} onChange={handleInput} onKeyPress={checkInput}></input>

						<select name="px_m2">
							<option value="px">px</option>
						</select>

						<div className="white">
							<button id="+Ypos" name="BYposition" value={BYposition ? BYposition : ""} onClick={increase} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="+Ypos">
								<TiArrowSortedUp />
							</label>

							<button id="-Ypos" name="BYposition" value={BYposition ? BYposition : ""} onClick={decrease} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="-Ypos">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
				<div>
					<div>
						<span>Blur </span>
					</div>
					<div className="flex-row shadow">
						<input name="BBlur" type="text" value={BBlur ? BBlur : ""} onChange={handleInput} onKeyPress={checkInput}></input>

						<select name="px_m3">
							<option value="px">px</option>
						</select>

						<div className="white">
							<button id="+BBlur" name="BBlur" value={BBlur ? BBlur : ""} onClick={increase} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="+BBlur">
								<TiArrowSortedUp />
							</label>

							<button id="-BBlur" name="BBlur" value={BBlur ? BBlur : ""} onClick={decrease} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="-BBlur">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>

				<div>
					<div>
						<span>Spread </span>
					</div>
					<div className="flex-row shadow">
						<input name="BSpread" type="text" value={BSpread ? BSpread : ""} onChange={handleInput} onKeyPress={checkInput}></input>

						<select name="px_m3">
							<option value="px">px</option>
						</select>

						<div className="white">
							<button id="+BSpread" name="BSpread" value={BSpread ? BSpread : ""} onClick={increase} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="+BSpread">
								<TiArrowSortedUp />
							</label>

							<button id="-BSpread" name="BSpread" value={BSpread ? BSpread : ""} onClick={decrease} style={{ display: "none" }} />
							<label className="icon-label" htmlFor="-BSpread">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>

				<div>
					<div>
						<span>Color </span>
					</div>
					<div className="flex-row">
						<input
							className="shadow flex-grow"
							name="color"
							type="text"
							value={color ? color : ""}
							onChange={handleInput}
							onKeyPress={checkInput}></input>
						<input className="flex-shrink" name="color" type="color" value={color ? color : ""} onChange={handleInput}></input>
					</div>
				</div>

				<div>
					<div>
						<span>Shadow Type</span>
					</div>
					<div className="shadow">
						<select name="Type" value={Type ? Type : ""} onChange={handleInput}>
							<option value="">Outside</option>
							<option value="inset">Inside</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TextShadow
