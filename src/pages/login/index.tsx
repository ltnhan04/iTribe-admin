import { useEffect } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { loginThunk } from "../../redux/features/authentication/authThunk";
import {
  clearError,
  clearMessage,
} from "../../redux/features/authentication/authSlice";
import { LoginType } from "./type";
import { emailRules, passwordRules } from "../../schemaValidation/auth.schema";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, isLoading, loginState } = useAppSelector(
    (state) => state.auth.login
  );
  const { message } = loginState;

  const onFinish = async (values: LoginType) => {
    await dispatch(loginThunk({ user: values, navigate }));
  };

  useEffect(() => {
    if (error) {
      notification.error({
        message: "Login Failed",
        description: error,
      });
      dispatch(clearError());
    }

    if (message) {
      notification.success({
        message: "Success",
        description: message,
      });
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="max-w-[400px] w-full px-8 py-6 bg-[#fff] rounded-2xl shadow-xl cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl border border-grayLight">
        <div className="w-full flex justify-center">
          <img
            src="/assets/images/i-Tribe-logo.png"
            alt="img"
            className="w-12 h-12 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4 mt-4">
          Login with your email
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Welcome back! Please login to your account.
        </p>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={emailRules}
            validateFirst
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              disabled={isLoading}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={passwordRules}
            validateFirst
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              disabled={isLoading}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 ease-in-out"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
