import React from "react";
import * as Yup from "yup";
import { useAuth } from "../context/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from 'react-router-dom';
import { registerApi } from "../services/AuthService";

interface Props {}

type RegisterFormsInputs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
};

const validation = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
});

const SignUpPage = (props: Props) => {
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

  const handleSignUp = (form: RegisterFormsInputs) => {
    console.log(form);
    registerUser(form.email, form.password, form.firstName, form.lastName, form.address);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sign Up</h5>
              <form onSubmit={handleSubmit(handleSignUp)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    placeholder="email"
                    {...register("email")}
                  />
                  {errors.email ? (
                    <p className="text-danger">{errors.email.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="password"
                    required
                    {...register("password")}
                  />
                  {errors.password ? (
                    <p className="text-danger">{errors.password.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First name</label>
                  <input
                    type="firstName"
                    className="form-control"
                    id="firstName"
                    placeholder="firstName"
                    required
                    {...register("firstName")}
                  />
                  {errors.firstName ? (
                    <p className="text-danger">{errors.firstName.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="lastName"
                    className="form-control"
                    id="lastName"
                    placeholder="lastName"
                    required
                    {...register("lastName")}
                  />
                  {errors.lastName ? (
                    <p className="text-danger">{errors.lastName.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="address"
                    className="form-control"
                    id="address"
                    placeholder="address"
                    required
                    {...register("address")}
                  />
                  {errors.address ? (
                    <p className="text-danger">{errors.address.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
              <div className="mt-3">
                <Link to="/login">Already have an account? Login here</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
