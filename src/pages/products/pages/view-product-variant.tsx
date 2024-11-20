import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetProductVariantsQuery } from "../../../redux/api/productVariantApi";
import {
  Image,
  Typography,
  Tabs,
  Card,
  Space,
  Avatar,
  Rate,
  Divider,
  message,
  Tag,
} from "antd";
import {
  DollarCircleOutlined,
  InfoCircleOutlined,
  SmileOutlined,
  CalendarOutlined,
  StockOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import type { Review } from "../../../redux/types";
import { formatCurrency } from "../../../utils/format-currency";
import Loading from "../../../loading";

const { Text, Title } = Typography;

interface ErrorType {
  data: {
    error: string;
  };
}

const ProductVariantDetail = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { data, isLoading, error } = useGetProductVariantsQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (error) {
      const typedError = error as ErrorType;
      const errMsg = typedError?.data?.error;
      message.error(errMsg);
    }
  }, [error]);

  if (isLoading) return <Loading />;

  const tabItems = [
    {
      key: "1",
      label: (
        <Space>
          <SmileOutlined />
          Reviews
        </Space>
      ),
      children: (
        <Card title="Customer Reviews" bordered={false}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div className="flex items-center justify-between">
              <Text strong>Average Rating:</Text>
              <Rate disabled defaultValue={data?.variant.rating} allowHalf />
            </div>
            <Divider />
            {data?.variant.reviews.length === 0 ? (
              <div className="text-center">No reviews yet</div>
            ) : (
              data?.variant.reviews.map((review: Review) => (
                <Card key={review._id} bordered={false}>
                  <Space>
                    <Avatar>{review.user.name[0]}</Avatar>
                    <Space direction="vertical" size="small">
                      <Text strong>{review.user.name}</Text>
                      <Rate disabled defaultValue={review.rating} />
                      <Text>{review.comment}</Text>
                      <Text type="secondary">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Text>
                    </Space>
                  </Space>
                </Card>
              ))
            )}
          </Space>
        </Card>
      ),
    },
    {
      key: "2",
      label: (
        <Space>
          <CalendarOutlined />
          Additional Info
        </Space>
      ),
      children: (
        <Card title="Additional Information" bordered={false}>
          <Space direction="vertical" size="large">
            <Space size="large" wrap>
              <Text strong>Created At:</Text>
              <Text>
                {new Date(data?.variant.createdAt || "").toLocaleString()}
              </Text>
            </Space>
            <Space size="large" wrap>
              <Text strong>Last Updated:</Text>
              <Text>
                {new Date(data?.variant.updatedAt || "").toLocaleString()}
              </Text>
            </Space>
          </Space>
        </Card>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card
        title={
          <Space>
            <InfoCircleOutlined />
            <Title style={{ marginBottom: 0 }} level={5}>
              Variant Details
            </Title>
          </Space>
        }
      >
        <Space direction="vertical" size="large" className="w-full">
          <Space size="large" wrap>
            <Text strong>ID:</Text>
            <Tag color="blue">{data?.variant._id}</Tag>
          </Space>
          <Space size="large" wrap>
            <DollarCircleOutlined style={{ color: "green" }} />
            <Text strong>Price:</Text>
            <Tag color="gold">{formatCurrency(data?.variant.price || 0)}</Tag>
          </Space>
          <Space size="large" wrap>
            <StockOutlined />
            <Text strong>Stock:</Text>
            <Text>{data?.variant.stock}</Text>
          </Space>
          <Space size="large" wrap>
            <DatabaseOutlined />
            <Text strong>Storage:</Text>
            <Text>{data?.variant.storage}</Text>
          </Space>
          <Space size="large" wrap>
            <Text strong>Slug:</Text>
            <Tag color="geekblue">{data?.variant.slug}</Tag>
          </Space>
        </Space>
      </Card>

      <Card
        title={
          <Space>
            <SmileOutlined />
            <Title style={{ marginBottom: 0 }} level={5}>
              Color Information
            </Title>
          </Space>
        }
      >
        <Space align="center" size="large">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: data?.variant.color.colorCode,
              border: "1px solid #ccc",
            }}
          />
          <Space direction="vertical">
            <Text>{data?.variant.color.colorName}</Text>
            <Text type="secondary">{data?.variant.color.colorCode}</Text>
          </Space>
        </Space>
      </Card>

      <Card
        title={
          <Space>
            <Image />
            <Title level={5}>Product Images</Title>
          </Space>
        }
      >
        <Space size="middle" wrap>
          {data?.variant.images.map((image: string, index: number) => (
            <div key={index} style={{ cursor: "pointer" }}>
              <Image
                key={image}
                src={image}
                alt="Product"
                width={50}
                height={50}
                className="object-cover rounded-md border border-white shadow-sm"
                style={{ borderRadius: 4 }}
                preview={{
                  maskClassName: "bg-gray-900/50",
                  mask: (
                    <span className="text-white text-center text-xs">View</span>
                  ),
                }}
              />
            </div>
          ))}
        </Space>
      </Card>

      <Tabs defaultActiveKey="1" items={tabItems} />
    </div>
  );
};

export default ProductVariantDetail;
