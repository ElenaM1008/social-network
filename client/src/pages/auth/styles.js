import styled from "styled-components";

export const Form = styled.form`
   display:flex;
	flex-direction:column;
   gap:15px;
   align-items:center;
	padding: 20px;
	background: #5a74d1;
	width: 250px;
	margin: 50px auto;
	border-radius: 25px;
	border:none;
	box-shadow: 7px 5px 5px gray;
`

export const Input = styled.input`
   width: 200px;
	height: 25px;
	border-radius: 3px;
	border:none;
	padding:5px;
`
export const Button = styled.button`
   width: 210px;
	height: 30px;
	border-radius: 3px;
	border:none;
`
export const Label = styled.label`
   color: white;
	font-size: 12px;
	font-weight: 800;
`

export const Error = styled.span`
   color: #b01224;
	font-size: 14px;
	font-weight: 700;
	padding: 5px;
	display: flex;
	justify-content: center;
`