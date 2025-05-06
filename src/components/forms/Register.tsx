import { Link } from "react-router-dom";
import useRegister from "../../hooks/useRegister";
import OutlinedInput from "@mui/material/OutlinedInput";

import { Box, Button, FormControl, Typography } from "@mui/material";
import HourglassEmptySharpIcon from "@mui/icons-material/HourglassEmptySharp";
function Register() {
  const { form, isLoading, submitHandler } = useRegister();

  return (
    <form onSubmit={form.handleSubmit(submitHandler)}>
      <Typography
        variant="h3"
        sx={{
          fontSize: 24,
          mb: 2,
        }}
      >
        Sign Up
      </Typography>
      <Box
        sx={{
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <FormControl sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <label>First name</label>
          <OutlinedInput
            type="text"
            className="form-control"
            placeholder="First name"
            {...form.register("firstname")}
          />
        </FormControl>

        <FormControl sx={{ display: "flex", flexDirection: "column" }}>
          <label>Last name</label>
          <OutlinedInput
            type="text"
            className="form-control"
            placeholder="Last name"
            {...form.register("lastname")}
          />
        </FormControl>

        <FormControl sx={{ display: "flex", flexDirection: "column" }}>
          <label>Email address</label>
          <OutlinedInput
            type="email"
            className="form-control"
            placeholder="Enter email"
            {...form.register("email")}
          />
        </FormControl>

        <FormControl sx={{ display: "flex", flexDirection: "column" }}>
          <label>Password</label>
          <OutlinedInput
            type="password"
            className="form-control"
            placeholder="Enter password"
            {...form.register("password")}
          />
        </FormControl>
      </Box>

      <div className="d-grid">
        <Button
          endIcon={isLoading && <HourglassEmptySharpIcon />}
          type="submit"
        >
          Sign Up
        </Button>
      </div>
      <p>
        Already registered <Link to="/login">Login</Link>
      </p>
    </form>
  );
}
export default Register;
