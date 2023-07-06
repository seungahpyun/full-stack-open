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
export const StyledHeader = styled.div`
padding: 1rem;
flex-direction: column;
align-items: center;
justify-content: flex-end;
`
export const StyledHeaderLink = styled(Link)`
margin-bottom: 0;
margin-left: auto;
margin-right: auto;
padding: 1rem;
text-decoration: none;
color: black;
font-size: 2.5rem;
`

export const StyledNav = styled.nav`
  display: flex;
  padding: 1rem;
  background-color: #f7f9fa;
  margin-left: auto;
  margin-right: auto;
  justify-content: flex-end;

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
`

export const StyledLink = styled(Link)`
margin-right: 1rem;
text-decoration: none;
color: black;
`

/* LoginForm.js*/
export const StyledLoginContainer = styled.div`
padding: 1rem;
margin-top: 8rem;
flex-direction: column;
align-items: center;
`

export const StyledLoginForm = styled.form`
padding: 0.5rem;
width: 6q0%;
gap: 0.8rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

export const StyledLoginListGroup = styled.div`
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
export const StyledBlogListContainer = styled.div`
padding: 1rem;
width: 100%;
flex-direction: column;
align-items: center;
border: 1px solid #ced4da;
border-radius: 0.25rem;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
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

/*Blog,js*/
export const StyledBlogContainer = styled.div`
padding: 1rem;
flex-direction: column;
align-items: center;
border: 1px solid #ced4da;
border-radius: 0.25rem;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`

export const StyledBlog = styled.div`
padding: 1rem;
width: 50%;
border: 1px solid #ced4da;
border-radius: 0.25rem;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
text-align: left;
`

export const StyledButtonGroup = styled.div`
padding: 0.5rem;
width: 100%;
// display: flex;
// justify-content: space-between;
border: 1px solid #ced4da;
border-radius: 0.25rem;
background-color: #f7f9fa;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
flex-direction: column;
`

/*BlogComment.js*/
export const StyledBlogComment = styled.div`
padding: 1rem;
// width: 100%;
border: 1px solid #ced4da;
border-radius: 0.25rem;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
text-align: left;
`

/* BlogCommnetForm.js */
export const StyledBlogCommentForm = styled.form`
// margin-bottom: 1rem;
// margin-left: auto;
// margin-right: auto;
// padding: 0.5rem;
// width: 50%;
// gap: 0.8rem;
// display: flex;
// align-items: center;
`

export const StyledBlogCommentFormContainer = styled.div`
padding: 1rem;
// width: 50%;
flex-direction: column;
align-items: center;
border: 1px solid #ced4da;
border-radius: 0.25rem;
background-color: #f7f9fa;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`

/* BlogForm.js */
export const StyledBlogFormContainer = styled.div`
padding: 1rem;
// width: 50%;
flex-direction: column;
align-items: center;
border: 1px solid #ced4da;
border-radius: 0.25rem;
background-color: #f7f9fa;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`

export const StyledBlogForm = styled.form`
padding: 0.5rem;
width: 50%;
gap: 0.8rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`










export const StyledButton = styled.button`
margin-left: 0.5rem;
margin-right: 0.5rem;
`

export const StyledListGroup = styled.div`
  width: 50%;
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
