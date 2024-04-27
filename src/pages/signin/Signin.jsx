import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../img/bssicon.png";
import "./Signin.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase.config'
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Signin = () => {

  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();



  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/dashboard")
      })

      .catch((error) => {
        console.error('Error message', error.message)
        setOpen(true)
      });
  };

  return (
    <div className="signInContainer">
      <div className="loginContainer">
        <div className="logoContainer">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <form className="formField" onSubmit={handleLogin} >
          <TextField
            type="email"
            label="Email"
            id="filled-basic"
            variant="filled"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            type={showPassword ? "text" : "password"}
            label="Password"
            id="filled-basic"
            required
            variant="filled"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                  style={{marginTop:'15px'}}
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <input
            type="button"
            value="Login"
            className="button"
            onClick={handleLogin}
          />
        </form>
        <div className="forgotPassword">
          <a href="forgot-password">Forgot password?</a>
        </div>
        <hr />

        <Stack spacing={2} sx={{ width: "100%", position: "fixed", bottom: 16, left: 16 }}>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Incorrect login details
            </Alert>
          </Snackbar>
        </Stack>
      </div>
    </div>
  );
};

export default Signin;
