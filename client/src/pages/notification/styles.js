import styled from "styled-components";

export const Container = styled.div`
   display:flex;
   gap:50px;
	@media (max-width: 430px){
		flex-direction:column
	}
`
export const Content = styled.div`
   display:flex;
   flex-direction:column;
   gap: 10px;
   margin: 0 20px;
`