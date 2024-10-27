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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-sm w-full px-8 py-6 bg-[#fff] rounded-lg shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Đăng nhập
        </h1>
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
              className="w-full rounded-lg transition duration-300 ease-in-out hover:bg-blue-600"
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
