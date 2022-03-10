import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import MyInputText from "../../app/common/form/myInputText";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationError from "../errors/validationError";

export default observer(function RegisterForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{
        displayName: "",
        userName: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.registerUser(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        userName: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as={"h2"}
            content="Sign In To Activities"
            color="teal"
            textAlign="center"
          />
          <MyInputText name="displayName" placeholder="Display Name" />
          <MyInputText name="userName" placeholder="User Name" />
          <MyInputText name="email" placeholder="Email" />
          <MyInputText name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => <ValidationError errors={errors.error} />}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
