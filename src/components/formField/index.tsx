import React from "react";

interface ComponentProps {
    input: any;
    meta: any;
    placeholder: string;
    type?: string;
    width?: string
}

export const FormFieldWithValidation = ({ input, meta, placeholder, type = "text", width = "272px" }: ComponentProps) => {
    return (
        <div>
            <div>
                <input {...input} placeholder={placeholder} style={{ width }} type={type}/>
            </div>
            {meta.error && meta.touched && <span style={{ color: "red" }}>{meta.error}</span>}
        </div>
    )
}