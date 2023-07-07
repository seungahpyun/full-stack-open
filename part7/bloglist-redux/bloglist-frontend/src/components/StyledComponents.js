import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
margin-top: 3rem;
margin-bottom: 1rem;
margin-left: auto;
margin-right: auto;
padding: 1rem;
width: 40rem;
flex-direction: column;
align-items: center;
text-align: center;
`

export const Button = styled.button`
margin-left: 0.5rem;
margin-right: 0.5rem;

&:hover {
  background-color: #ff4d00;
  color: #fff;
}
`

export const HeaderLink = styled(Link)`
margin-bottom: 0;
padding: 1rem;
text-decoration: none;
color: #ff4d00;
font-size: 1.5rem;
`

export const Nav = styled.nav`
  display: flex;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .dropdown {
    position: relative;
    display: inline-block;
    text-align: center;

    span {
      cursor: pointer;
      font-size: 1.5rem;
    }

    hr {
      solid #f7f9fa;
      margin: 0.5rem 0;
    }

    .dropdown-content {
      display: none;
      position: absolute;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      top: 100%;
      z-index: 1;
      padding: 12px 12px;
      border-radius: 0.25rem;

      a {
        color: #ff4d00;
        text-decoration: none;
        display: block;
        align-items: center;
      }
    }

    &:hover .dropdown-content {
      display: block;
    }
  }
`

export const LinkItem = styled(Link)`
margin-right: 1rem;
text-decoration: none;
color:#ff4d00;
`

export const StyledLoginListGroup = styled.div`
padding: 1rem;
width: 50%;
border: 1px solid #ced4da;
border-radius: 0.25rem;
background-color: #f7f9fa;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`

export const BlogListGroup = styled.div`
margin-top: 0.5rem;
padding: 1rem;

> #each-blog {
  margin-bottom: 0.5rem;
  padding: 1rem;
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  text-align: left;
}


:hover {
  background-color: #e9ecef;
}
`

export const StyledBlog = styled.div`
padding: 1rem;
width: 100%;
border: 1px solid #ced4da;
border-radius: 0.25rem;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
text-align: left;
margin-left: auto;
margin-right: auto;

> #added-by {
  font-size: 0.8rem;
  color: #6c757d;
  text-align: right;
}
`


/*BlogComment.js*/
export const StyledBlogComment = styled.div`
padding: 1rem;
// border: 1px solid #ced4da;
// border-radius: 0.25rem;
// box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
text-align: left;
`


export const Form = styled.form`
width: 15em;
display: flex;
flex-direction: column;
align-items: center;
margin-left: auto;
margin-right: auto;

> #login-button{
  margin-top: 1rem;
}
`

export const CommentForm = styled.form`
width: 35em;
display: flex;
margin-left: auto;
margin-right: auto;
margin-top: 1rem;
margin-bottom: 1rem;

> #comment{
  width: 100%;
`


export const Table = styled.table`
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

  :hover {
    background-color: #e9ecef;
  }
  `

export const Th = styled.th`
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #ced4da;
  `

export const Alert = styled.div`
margin-top: 1rem;
padding: 1rem;
width: 50%;
border: 1px solid #ced4da;
border-radius: 0.25rem;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);`


export const Input = styled.input`
  width: 60%;
  margin-top: 1rem;
  &:hover {
    background-color: #343a40;
    border-color: #343a40;
  }`
