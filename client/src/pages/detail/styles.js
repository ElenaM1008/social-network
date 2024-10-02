import styled from "styled-components";

export const Container = styled.div`
   display:flex;
   gap:50px;
`

export const Nav = styled.nav`
	border-radius: 20px;
	background: gray;
	border:none;
	padding:15px;
	margin: 15px;
	font-size: 20px;
	font-family: Arial, Helvetica, sans-serif;
	width: 200px;
	height: 200px;
`
export const List = styled.ul`
   display: flex;
   flex-direction: column;
   gap: 15px;
	padding:10px;
	margin:0;
`
export const ListItem = styled.li`
   padding: 4px;
   cursor: pointer;
	list-style: none;

	&:hover{
		background: #989fa6;
		border-radius: 10px;
		font-weight:600;
	}
`

export const Content = styled.div`
   display: flex;
   flex-direction: column;
   gap: 50px;
`

export const Textarea = styled.textarea`
   background: transparent;
   width: 80%;
   resize: none;
   height: 150px;
`

export const Posts = styled.div`
   display:flex;
	flex-direction:column;
	gap:10px;
`

export const Title = styled.h1`
   font-size:24px;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: 700;
`
export const Button = styled.button`
   width: 215px;
	height: 30px;
	border-radius: 15px;
	border:none;
	font-size:16px;
	background: gray;

	&:hover{
		background: #989fa6;
	}	
`