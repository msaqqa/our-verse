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

const Typography = ({ ...props }) => {
  const styles = {
    color: props.color || "black",
    fontWeight: props.bold,
    fontSize: getTypographySize(props?.variant),
    lineHeight: props?.bold ? 1.1 : 1.25,
    fontFamily: props?.fontFamily || "PlusJakartaSans",
  };

  return (
    <div as={props.variant} {...props} style={styles}>
      {props.content}
    </div>
  );
};
export default Typography;
