import styled from "styled-components";

const mainColor = "#FF4F8B";
const secondColor = "#ff81ab";

const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 20px;
  background-color: ${mainColor};
  color: #F9F9F9;
  font-weight: bold;
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  transition: background-color 1s;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    background-color: ${secondColor}
    }
  }
`;

Button.displayName = "Button";

export default Button;
