import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { loginThunk } from "../../redux/authentication/authThunk";
import { LoginType } from "./type";
import { emailRules, passwordRules } from "../../schemaValidation/auth.schema";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: LoginType) => {
    await dispatch(loginThunk({ user: values, navigate }));
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="Email" name="email" rules={emailRules} validateFirst>
          <Input prefix={<MailOutlined />} placeholder="Enter your email" />
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
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
