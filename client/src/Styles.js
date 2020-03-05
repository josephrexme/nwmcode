import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  html{
    --link-color: #3769b5;
    font-size: 62.5%;
  }
  body{
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  main{
    width: 90%;
    max-width: 110rem;
    margin: auto;
    padding: 10rem 0;
  }
  h1,h2,h3,h4,h5{
    margin: 1rem 0;
    color: #667;
  }
  strong{
    color: #667;
  }
  p{
    margin: 1rem 0;
  }
  a{
    color: var(--link-color);
    word-break: break-word;
    text-decoration: none;
  }
`;

export const List = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
  gap: 2rem;
`;

export const Entry = styled.div`
  position: relative;
  height: 40rem;
  padding: 2rem;
  border-radius: .5rem;
  box-shadow: 1px 2px 5px rgba(0,0,0, .1), 0 0 8px 10px rgba(0,0,0,.02);
  overflow: hidden;
  h1:not(h1:first-of-type) {
    font-size: 3.0rem;
  }
  h1:first-of-type{
    color: #000;
  }
  &::after{
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 15rem;
    background: linear-gradient(to bottom, transparent 0%, white 90%);
  }
`;

export const SearchForm = styled.form`
  input{
    display: block;
    width: 100%;
    height: 5rem;
    margin: 0 0 10rem;
    padding: 1rem 3rem;
    border-radius: 2rem;
    border: solid thin transparent;
    font: inherit;
    box-shadow: 1px 2px 4px rgba(0,0,0,.1), 0 0 10px rgba(0,0,0,.05), 0 0 25px 10px rgba(0,0,0,.02);
    &:focus{
      outline: none;
      border-color: #ddd;
    }
  }
`;

