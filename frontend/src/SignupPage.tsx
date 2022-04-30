import { Container, Stack } from "@mui/material";
import { SignupForm } from "./features/user/SignupForm";

export const SignupPage = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <SignupForm />
      </Stack>
    </Container>
  );
};
