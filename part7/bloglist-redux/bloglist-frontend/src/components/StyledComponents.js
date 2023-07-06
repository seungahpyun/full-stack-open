import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledContainer = styled.div`
margin-top: 1rem;
margin-bottom: 1rem;
margin-left: auto;
margin-right: auto;
padding: 1rem;
width: 50%;
flex-direction: column;
align-items: center;
`

/* LoginForm.js*/
export const StyledLoginContainer = styled.div`
margin-top: 10rem;
padding: 1rem;
flex-direction: column;
align-items: center;
`

export const StyledLoginForm = styled.form`
margin-top: 1srem;
margin-bottom: 1rem;
margin-left: auto;
margin-right: auto;
padding: 0.5rem;
width: 60%;
gap: 0.8rem;
display: flex;
flex-direction: column;
align-items: center;
`

export const StyledLoginListGroup = styled.div`
margin-top: 1rem;
margin-bottom: 1rem;
margin-left: auto;
margin-right: auto;
padding: 1rem;
width: 50%;
border: 1px solid #ced4da;
border-radius: 0.25rem;
background-color: #f7f9fa;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`
export const StyledLoginFormItem = styled.div`
padding: 0.5rem;
`

/* BlogList.js */
export const StyledBlogContainer = styled.div`
margin-top: 1rem;
margin-bottom: 1rem;
margin-left: auto;
margin-right: auto;
padding: 1rem;
width: 100%;
flex-direction: column;
align-items: center;
border: 1px solid #ced4da;
border-radius: 0.25rem;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`


export const StyledBlog = styled.div`
margin-top: 1rem;
margin-bottom: 1rem;
margin-left: auto;
margin-right: auto;
padding: 1rem;
width: 50%;
border: 1px solid #ced4da;
border-radius: 0.25rem;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
text-align: left;
`

export const StyledBlogListGroup = styled.div`
margin-top: 0.5rem;
padding: 1rem;
width: 100%;
border: 2px solid #ced4da;
border-radius: 0.25rem;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
:hover {
  background-color: #e9ecef;
}
`

export const StyledButton = styled.button`
margin-left: 0.5rem;
margin-right: 0.5rem;
`

export const StyledButtonGroup = styled.div`
margin-top: 1rem;
margin-bottom: 1rem;
margin-left: auto;
margin-right: auto;
padding: 0.5rem;
width: 50%;
display: flex;
justify-content: space-around;
border: 1px solid #ced4da;
border-radius: 0.25rem;
background-color: #f7f9fa;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`

export const StyledListGroup = styled.div`
  width: 50%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: #f7f9fa;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  `

export const StyledForm = styled.form`
width: 37%;
margin-top: 1rem;
margin-bottom: 1rem;
margin-left: auto;
margin-right: auto;
padding: 1rem;
border: 1px solid #ced4da;
border-radius: 0.25rem;
background-color: #f7f9fa;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);`

export const StyledTable = styled.table`
  width: 50%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  background-color: #f7f9fa;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  `

export const StyledTh = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #ced4da;
  `

export const StyledAlert = styled.div`
margin-top: 1rem;
margin-bottom: 1rem;
margin-left: auto;
margin-right: auto;
padding: 1rem;
width: 50%;
border: 1px solid #ced4da;
border-radius: 0.25rem;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);`


export const StyledInput = styled.input`
  width: 60%;
  margin-top: 1rem;
  &:hover {
    background-color: #343a40;
    border-color: #343a40;
  }`

export const StyledNav = styled.nav`
display: flex;
justify-content: space-between;
padding: 1rem;
background-color: #f7f9fa;
width: 70%;
margin-left: auto;
margin-right: auto;
`

export const StyledLink = styled(Link)`
margin-right: 1rem;
text-decoration: none;
color: black;
`

export const StyledTitle = styled.h1`
margin-bottom: 0;
margin-left: auto;
margin-right: auto;
padding: 1rem;
`
