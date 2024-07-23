import styled from "styled-components";

const Form = styled.form`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #000;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 0 5px 5px 0;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export { Form, Input, Button };
