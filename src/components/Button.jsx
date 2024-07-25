import React from "react";

export default function Button({
    children,
    type = "button",
    className = "",
    bg = 'black',
    ...props
}) {
    return (
        <button style={{background:bg}} className={`px-8 text-base py-1.5 rounded-md cursor-pointe bg-[${bg}] ${className}`} {...props}>
            {children}
        </button>
    );
}