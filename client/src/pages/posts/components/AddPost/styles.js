import styled from "styled-components";

export const Textarea = styled.textarea`
   background: transparent;
   resize: none;
   height: 100px;
	border-radius: 5px;
`

export const Button = styled.button`
   width: 215px;
	height: 30px;
	border-radius: 5px;
	border:none;
	font-size:16px;
	background: #5a74d1;
	color: white;
	cursor: pointer;

	&:hover{
		background: #6885ed;
	}	
`