import React from "react";

interface IPhoneLabelProps {
  label: string;
}

export const PhoneLabel = (props: IPhoneLabelProps) => {
  return (
    <label
      style={{
        color: "rgba(0, 0, 0, 0.6)",
        fontFamily: "sans-serif",
        fontWeight: 400,
        fontSize: "0.75rem",
        lineHeight: "1.4375em",
        letterSpacing: "0.00938em",
        paddingLeft: "0.5em",
        paddingRight: "0.5em",
        position: "relative",
        top: "1rem",
        left: "4rem",
        backgroundColor: "white",
        zIndex: 1000,
        display: "inline-block",
        transformOrigin: "top left",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "calc(133% - 24px)",
      }}
    >
      {props.label}
    </label>
  );
};
