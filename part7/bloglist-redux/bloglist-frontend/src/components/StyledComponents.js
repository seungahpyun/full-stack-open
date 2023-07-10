import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
margin-top: 2rem;
margin-bottom: 1rem;
margin-left: auto;
margin-right: auto;
padding: 1rem;
width: 42rem;
flex-direction: column;
align-items: center;
text-align: center;
`

export const UserContainer = styled.div`
margin-top: 2rem;
margin-bottom: 1rem;
margin-left: auto;
margin-right: auto;
padding: 1rem;
width: 40rem;
flex-direction: column;
align-items: center;
text-align: center;

> h3 {
  margin-bottom: 2rem;
}

> ul > li {
  list-style-type: none;
  text-decoration: none;
  padding: 0;
  margin: 0;
  text-align: left;
  margin-bottom: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  padding: 0.5rem;
  text-decoration: none;
}
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
  }

  hr {
    solid #f7f9fa;
    margin: 0.5rem 0;
  }

  .dropdown-content > button {
    font-size: 0.8rem;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    top: 100%;
    z-index: 1;
    padding: 0.4rem;
    border-radius: 0.25rem;
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
  padding: 0.4rem 0.4rem 0.4rem 1rem;
  width: 100%;
  border: 1px solid #BFCCA8;
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

> #blog-url {
  font-size: clamp(0.8rem, 3vw, 1rem);

  a {
    word-break: break-all;
  }
}
`

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
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  width: 60%;
  text-align: left;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: #f7f9fa;
  color: #343a40;
  font-size: 0.9rem;

  > thead > tr > th {
    padding: 0.5rem;
    border-bottom: 1px solid #ced4da;
  }

  > tbody > tr > td {
    padding: 0.5rem;
    border-bottom: 1px solid #ced4da;
  }
  > tbody > tr
  &:hover {
    background-color: #e9ecef;
  }
`

export const Alert = styled.div`
margin-top: 1rem;
padding: 1rem;
width: 100%;
border: 1px solid #ced4da;
border-radius: 0.25rem;
box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
text-align: center;
margin-left: auto;
margin-right: auto;
`

export const Input = styled.input`
  width: 60%;
  margin-top: 1rem;
  &:hover {
    background-color: #343a40;
    border-color: #343a40;
  }`
