import { Loading3QuartersOutlined } from "@ant-design/icons";

const Loading = () => {
  return (
    <div className="w-full h-full fixed z-20 flex items-center justify-center top-0 left-0 bg-gray-100 opacity-80">
      <Loading3QuartersOutlined
        spin
        className="text-blue text-2xl animate-spin"
      />
    </div>
  );
};

export default Loading;
