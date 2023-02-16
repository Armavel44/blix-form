import React from "react";
import { Form, Field } from "react-final-form";
import { FormFieldWithValidation } from "../formField"

const FormRow = ({children}) => (
    <div style={{ width: "400px", display: "flex", justifyContent: "flex-end", flexDirection: "row", marginBottom: "7px" }}>
        {children}
    </div>
)

const InputLabel = ({ label }: { label: string }) => <label style={{ marginRight: "4px", fontWeight: 500 }}>{label}:</label>

export const FormComponent = () => {
    const [accountType, setAccountType] = React.useState("Advanced");
    const [formValues, setFormValues] = React.useState(null);
    const handleSubmit = (values: any) => {
        setFormValues(values)
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20%" }}>
                <Form
                    onSubmit={handleSubmit}
                    validate={values => {
                        const errors: any = {};
                        if (!values.username) {
                            errors.username = "Required";
                        }
                        if (values.username && !values.username.match(/[A-Za-z0-9]+@[a-z]+\.[a-z]+/)) {
                            errors.username = "Username is not valid"
                        }
                        if (!values.password) {
                            errors.password = "Required";
                        }
                        if (values.serverAddress && !values.serverAddress.match(/[A-Za-z0-9]+\.[a-z]+/)) {
                            errors.serverAddress = "Incorrect server address";
                        }
                        if (values.port && (Number(values.port) > 255 || Number(values.port) < 0)) {
                            errors.port = "Incorrect port value"
                        }
                        return errors;
                    }}
                    render={(props) => (
                        <form onSubmit={props.handleSubmit}>
                            <FormRow>
                                <Field name="AccountType">
                                    {({ input}) => <div>
                                        <label style={{ fontWeight: 500 }}>Account type: </label>
                                        <select {...input} onChange={(e) => { input.onChange(e.target.value); setAccountType(e.target.value) }} style={{ width: "280px" }}>
                                            <option value="Advanced" selected>Advanced</option>
                                            <option value="Manual">Manual</option>
                                        </select>
                                    </div>}
                                </Field>
                            </FormRow>
                            <FormRow>
                                <InputLabel label="User Name" />
                                <Field name="username">{({input, meta}) => (
                                    <FormFieldWithValidation input={input} meta={meta} placeholder="username@example.com" />
                                )}</Field>
                            </FormRow>
                            <FormRow>
                                <InputLabel label="Password" />
                                <Field name="password">{({input, meta}) => (
                                    <FormFieldWithValidation input={input} meta={meta} placeholder="Required" type="password" />
                                )}</Field>
                            </FormRow>
                            <FormRow>
                                <InputLabel label="Server Address" />
                                <Field name="serverAddress">{({input, meta}) => (
                                    <FormFieldWithValidation input={input} meta={meta} placeholder="example.com" />
                                )}</Field>
                            </FormRow>
                            {accountType === "Advanced" &&
                                <FormRow>
                                    <InputLabel label="Server Path" />
                                    <Field name="serverPath" component="input" style={{ width: "272px" }} placeholder="/calendars/user" />
                                </FormRow>
                            }
                            {accountType === "Advanced" &&
                                <FormRow>
                                    <InputLabel label="Port" />
                                    <div style={{ width: "280px", display: "flex" }}>
                                        <Field name="port">{({input, meta}) => (
                                            <FormFieldWithValidation input={input} meta={meta} placeholder="" width="72px" />
                                        )}</Field>
                                        <Field name="ssl" component="input" type="checkbox" style={{ marginLeft: "25px", maxHeight: "21px" }} /><span style={{ marginLeft: "2px", maxHeight: "21px" }}>Use SSL</span>
                                    </div>
                                </FormRow>
                            }
                            <button type="submit">Submit</button>
                        </form>
                    )}
                />
            </div>
            {formValues && <p>{JSON.stringify(formValues)}</p>}
        </>
    )
}