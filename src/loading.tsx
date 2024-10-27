import { LoadingOutlined } from "@ant-design/icons";

const Loading = () => {
  return (
    <div className="w-full h-full absolute flex items-center justify-center top-0 left-0 right-0 bottom-0 bg-grayLight bg-opacity-70">
      <LoadingOutlined spin={true} className="text-blue w-8 h-8" />
    </div>
  );
};

export default Loading;
