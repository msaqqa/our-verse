import styled from "styled-components";

const getTypographySize = (variant) => {
  switch (variant) {
    case "h1":
      return "2em";
    case "h2":
      return "1.5em";
    case "h3":
      return "1.17em";
    case "h4":
      return "1em";
    case "h5":
      return ".83em";
    case "h6":
      return "0.76em";
    default:
      return "1em";
  }
};

const Wrapper = styled.div`
  color: ${(props) => {
    console.log("props style", props);
    props.color || "black";
  }};
  font-weight: ${(props) =>
    props?.bold || props?.variant === "h2" ? 700 : 500};
  font-size: ${(props) =>
    props?.fontSize || getTypographySize(props?.variant || "")};
  width: ${(props) => props?.width || "100%"};
  line-height: ${(props) => (props?.bold ? 1.1 : 1.25)};
  font-family: ${(props) => props?.fontFamily || "PlusJakartaSans"};
  ${(props) =>
    Object.keys(props)
      .map((key) => `${key}: ${props?.[key]};`)
      .join(";")};
`;

export default Wrapper;
