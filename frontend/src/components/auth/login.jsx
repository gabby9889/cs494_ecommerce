import react, { useEffect, useState } from 'react';
import { useLoginMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [login, { isLoading, error, data}] = useLoginMutation();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
      if(isAuthenticated) {
         navigate("/")
      }
        if(error ) {
            toast.error(error?.data?.message);
        }
    }, [error, isAuthenticated]);

    const submitHandler = (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password,
        };

        login(loginData);
    };

    return (
        <div class="row wrapper">
        <div class="col-10 col-lg-5">
        <form
          class="shadow rounded bg-body"
          onSubmit={submitHandler}
        >
          <h2 class="mb-4">Login</h2>
          <div class="mb-3">
            <label htmlFor="email_field" class="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              class="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label for="password_field" class="form-label">Password</label>
            <input
              type="password"
              id="password_field"
              class="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <a href="/password/forgot" class="float-end mb-4">Forgot Password?</a>

          <button id="login_button" type="submit" class="btn w-100 py-2" disabled={isLoading}>
            {isLoading? "Authenticating...": "LOGIN"}
          </button>

          <div class="my-3">
            <a href="/register" class="float-end">New User?</a>
          </div>
        </form>
      </div>
    </div>

    )
} 

export default Login;