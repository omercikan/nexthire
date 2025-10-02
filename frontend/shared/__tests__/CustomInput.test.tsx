import { render, screen } from "@testing-library/react";
import { Form, Formik } from "formik";
import userEvent from "@testing-library/user-event";
import CustomInput from "../components/ui/CustomInput";

describe("CustomInput component", () => {
  it("renders the input field", async () => {
    render(
      <Formik initialValues={{ email: "" }} onSubmit={() => {}}>
        <Form>
          <CustomInput name="email" label="Email Address" />
        </Form>
      </Formik>
    );

    const event = userEvent.setup(); //* user events

    //? Input is working, test is successful ?//
    const input = screen.getByRole("textbox");
    await event.type(input, "Change input text");
    expect(input).toHaveValue("Change input text");
  });

  it("renders the label", () => {
    render(
      <Formik initialValues={{ email: "" }} onSubmit={() => {}}>
        <Form>
          <CustomInput name="email" label="Email Address" />
        </Form>
      </Formik>
    );

    const label = screen.getByText("Email Address");
    expect(label).toBeInTheDocument();
  });
});
