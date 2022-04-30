import { Container, Stack } from "@mui/material";
import { LoginForm } from "./features/user/LoginForm";

export const LoginPage = () => {
  return (
    <Container>
      <Stack spacing={2}>
        <LoginForm />
      </Stack>
    </Container>
  );
};
