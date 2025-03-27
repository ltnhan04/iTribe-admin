import React from 'react';
import { Card, Row, Col, Image, Descriptions, Badge, Rate, List, Avatar, Tag, Space } from 'antd';
import { ProductVariant, Review, User } from '../types';

interface VariantDetailsProps {
  variant: ProductVariant;
  reviews: Review[];
  users: User[];
}

const VariantDetails: React.FC<VariantDetailsProps> = ({
  variant,
  reviews,
  users,
}) => {
  return (
    <div>
      <Card className="mb-4">
        <Image.PreviewGroup>
          <Row gutter={[8, 8]}>
            {variant.images.map((img, index) => (
              <Col span={8} key={index}>
                <Image
                  src={img}
                  alt={`Product image ${index + 1}`}
                  width={150}
                  height={150}
                  style={{ objectFit: "cover" }}
                />
              </Col>
            ))}
          </Row>
        </Image.PreviewGroup>
      </Card>

      <Descriptions bordered column={1} className="mb-6">
        <Descriptions.Item label="ID">{variant.id}</Descriptions.Item>
        <Descriptions.Item label="Product ID">{variant.product_id}</Descriptions.Item>
        <Descriptions.Item label="Storage">{variant.storage}</Descriptions.Item>
        <Descriptions.Item label="Price">
          ${variant.price.toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Stock Quantity">
          {variant.stock_quantity}
        </Descriptions.Item>
        <Descriptions.Item label="Slug">{variant.slug}</Descriptions.Item>
        <Descriptions.Item label="Rating">
          <Rate disabled defaultValue={variant.rating} />
        </Descriptions.Item>
        <Descriptions.Item label="Colors">
          <Space>
            {variant.color.map((color, index) => (
              <Tag key={index} color="blue">
                {color}
              </Tag>
            ))}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Badge
            status={variant.status === "in_stock" ? "success" : "error"}
            text={variant.status === "in_stock" ? "In Stock" : "Out of Stock"}
          />
        </Descriptions.Item>
      </Descriptions>

      <Card title="Reviews" className="mt-4">
        <List
          dataSource={reviews.filter(
            (review) => review.product_variant_id === variant.id
          )}
          renderItem={(review) => {
            const user = users.find((u) => u.id === review.user_id);
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{user?.name[0]}</Avatar>}
                  title={
                    <Space>
                      <span>{user?.name}</span>
                      <Rate disabled defaultValue={review.rating} />
                    </Space>
                  }
                  description={review.comment}
                />
              </List.Item>
            );
          }}
        />
      </Card>
    </div>
  );
};

export default VariantDetails; 