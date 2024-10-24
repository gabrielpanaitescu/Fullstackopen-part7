import { useState, forwardRef, useImperativeHandle } from "react";
import { Button, rem } from "@mantine/core";

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={toggleVisibility} mt={rem(10)} color="red">
          Cancel
        </Button>
      </div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} size="compact-sm">
          {buttonLabel}
        </Button>
      </div>
    </>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
