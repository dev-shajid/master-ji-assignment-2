import React from "react";

export default function Button({
    children,
    type = "button",
    className = "",
    bg = 'black',
    ...props
}) {
    return (
        <button className={`px-8 text-base py-1.5 rounded-md cursor-pointe ${bg?`bg-[${bg}]`:null} ${className}`} {...props}>
            {children}
        </button>
    );
}