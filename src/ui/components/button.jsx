"use client";
import React from "react";

function Button({ children, onClick, disabled = false, ariaLabel, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        backgroundColor: disabled ? "#cccccc" : "#007bff",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background-color 0.3s ease",
        outline: "none",
      }}
      onFocus={(e) => (e.target.style.boxShadow = "0 0 0 3px rgba(0,123,255,0.5)")}
      onBlur={(e) => (e.target.style.boxShadow = "none")}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
