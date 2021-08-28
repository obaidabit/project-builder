import React, { useState, useContext, useEffect } from "react"
import { ElementContext, ElementContext2 } from "../../../ElementContext"
import { saveRecord, clearRedoRecord } from "../../../undo"
import savePage from "../../../savePage"

function Background() {
	const [selectedTarget] = useContext(ElementContext2)
	const [selectedElement, setSelectedElement] = useContext(ElementContext)
	const [, setbackgroundImage] = useState("")
	const [backgroundRepeat, setbackgroundRepeat] = useState("")
	const [backgroundPosition, setbackgroundPosition] = useState("")
	const [backgroundAttachment, setbackgroundAttachment] = useState("")
	const [backgroundSize, setbackgroundSize] = useState("")
	const [backgroundColor, setbackgroundColor] = useState("")

	useEffect(() => {
		setbackgroundImage(selectedElement.backgroundImage)
		setbackgroundRepeat(selectedElement.backgroundRepeat)
		setbackgroundPosition(selectedElement.backgroundPosition)
		setbackgroundAttachment(selectedElement.backgroundAttachment)
		setbackgroundSize(selectedElement.backgroundSize)
		setbackgroundColor(checkColor(selectedElement.backgroundColor))
	}, [selectedElement])

	const checkColor = value => {
		if (value !== "") {
			if (value !== undefined) {
				//red
				var r = parseInt(value.slice(value.indexOf("(") + 1, value.indexOf(",")))
				r = r.toString(16)
				r = r.length === 1 ? "0" + r : r
				//green
				value = value.slice(value.indexOf(",") + 1)
				var g = parseInt(value.slice(0, value.indexOf(",")))
				g = g.toString(16)
				g = g.length === 1 ? "0" + g : g
				//blue
				value = value.slice(value.indexOf(",") + 1)
				var b = parseInt(value.slice(0, value.indexOf(",")))
				b = b.toString(16)
				b = b.length === 1 ? "0" + b : b
				savePage(false)
				return "#" + r + g + b
			}
		} else {
			return "#000000"
		}
	}

	const updateState = (name, value) => {
		switch (name) {
			case "backgroundImage":
				setbackgroundImage(value)
				break
			case "backgroundRepeat":
				setbackgroundRepeat(value)
				break
			case "backgroundPosition":
				setbackgroundPosition(value)
				break
			case "backgroundAttachment":
				setbackgroundAttachment(value)
				break
			case "backgroundSize":
				setbackgroundSize(value)
				break
			case "backgroundColor":
				setbackgroundColor(value)
				break
			default:
				break
		}
		savePage(false)
	}

	const handleSelect = e => {
		saveRecord(selectedTarget, "style-change")
		clearRedoRecord()
		updateState(e.target.name, e.target.value)
		const temp = selectedElement
		temp[e.target.name] = e.target.value
		setSelectedElement(temp)
		savePage(false)
	}

	const checkInput = e => {
		var ch = String.fromCharCode(e.which)
		if (e.target.value.length >= 7) e.preventDefault()
		if (!/[0-9#AaBbCcDdEeFf]/.test(ch)) {
			e.preventDefault()
		}
	}

	const uploadImage = e => {
		const { files } = e.target
		if (files.length === 0) {
			return
		}

		const file = files[0]
		const fileReader = new FileReader()
		const temp = selectedElement

		fileReader.onload = () => {
			temp[e.target.name] = `url(${fileReader.result})`
			setSelectedElement(temp)
			savePage(false)
		}
		fileReader.readAsDataURL(file)
	}

	return (
		<div className="expand-grid style-group">
			<div className="expand-grid">
				<span className="sub-head">Background</span>
			</div>
			<div>
				<span>Image </span>
				<div className="flex-row shadow">
					<label className="background-label" htmlFor="myFile">
						Select Image
					</label>
					<input className="hide" name="backgroundImage" id="myFile" type="file" onChange={uploadImage}></input>
				</div>
			</div>

			<div>
				<span>Repeat</span>

				<div className="shadow">
					<select name="backgroundRepeat" value={backgroundRepeat ? backgroundRepeat : "repeat"} onChange={handleSelect}>
						<option value="repeat">repeat</option>
						<option value="repeat-x">repeat-x</option>
						<option value="repeat-y">repeat-y</option>
						<option value="no-repeat">no-repeat</option>
					</select>
				</div>
			</div>

			<div>
				<span>Position </span>

				<div className="shadow">
					<select name="backgroundPosition" value={backgroundPosition ? backgroundPosition : "left top"} onChange={handleSelect}>
						<option value="left top">left top</option>
						<option value="left center">left center</option>
						<option value="left bottom">left bottom</option>
						<option value="right top">right top</option>
						<option value="right center">right center</option>
						<option value="right bottom">right bottom</option>
						<option value="center top">center top</option>
						<option value="center center">center center </option>
						<option value="center bottom">center bottom </option>
					</select>
				</div>
			</div>

			<div>
				<span>Attachment </span>

				<div className="shadow">
					<select name="backgroundAttachment" value={backgroundAttachment ? backgroundAttachment : "scroll"} onChange={handleSelect}>
						<option value="scroll">scroll</option>
						<option value="fixed">fixed</option>
						<option value="local">local</option>
					</select>
				</div>
			</div>

			<div>
				<span>Size </span>

				<div className="shadow">
					<select name="backgroundSize" value={backgroundSize ? backgroundSize : "auto"} onChange={handleSelect}>
						<option value="auto">auto</option>
						<option value="cover">cover</option>
						<option value="contain">contain</option>
						<option value="inherit">inherit</option>
					</select>
				</div>
			</div>
			<div>
				<div>
					<span>Color </span>
				</div>
				<div>
					<div className="flex-row shadow">
						<input
							className="flex-grow"
							name="backgroundColor"
							type="text"
							value={backgroundColor ? backgroundColor : ""}
							onChange={handleSelect}
							onKeyPress={checkInput}></input>
						<input
							className="flex-shrink"
							name="backgroundColor"
							type="color"
							value={backgroundColor ? backgroundColor : ""}
							onChange={handleSelect}></input>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Background
