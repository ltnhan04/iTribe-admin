import { LoadingOutlined } from "@ant-design/icons";

const Loading = () => {
  return (
    <div className="w-full h-full absolute z-20 flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-grayLight">
      <LoadingOutlined className="text-blue w-10 h-10 animate-spin" />
    </div>
  );
};

export default Loading;
