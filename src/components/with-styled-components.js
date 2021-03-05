import React, { useState } from "react";
import { createPortal } from "react-dom";
import styled, { StyleSheetManager } from "styled-components";

export const WithStyledComponents = ({ children, styleSelector, title, ...props }) => {
	const [contentRef, setContentRef] = useState(null);
	const doc = contentRef?.contentWindow?.document;

	const mountNode = doc?.body;
	const insertionTarget = doc?.createElement("link");
	if (insertionTarget) {
		doc.head.append(insertionTarget);
	}

	return (
		<iframe title={title} {...props} ref={setContentRef} style={{ position: "absolute", top: "6rem", left: "400px", backgroundColor: "#313131" }}>
			{mountNode && createPortal(<StyleSheetManager target={insertionTarget}>{children}</StyleSheetManager>, mountNode)}
		</iframe>
	);
};

export const StyledFlexBoard = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 300px;
	height: 800px;
	background-color: #313131;
	padding: 15px;
`;
export const StyledFlexBoardCard = styled.div`
	padding: 15px 25px;
	background-color: #f3f3f3;
	cursor: pointer;
	margin-bottom: 15px;
`;
/*export const StyledFlex = styled.main`
	display: flex;
	justify-content: space-between;
	width: 100%;
	max-width: 768px;
	height: 100vh;
	overflow: hidden;
	margin: 0 auto;
	padding: 15px;
	background-color: #313131;
	`;*/
