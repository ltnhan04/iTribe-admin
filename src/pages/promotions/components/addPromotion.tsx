import { Divider, Input, Button, Form, DatePicker  } from "antd";
import {
  promotionNameRules,
  descriptionRules,
  startDateRules,
  endDateRules,
  discountRules,
} from "../../../schemaValidation/promotion.schema";
// import {
//   fetchPromotions,
//   createPromotion,
//   updatePromotion,
//   deletePromotion,
// }from "../../../api/services/promotion/promotionApi";

const AddPromotion = () => {
    return (
    <div className="bg-white h-screen rounded-lg shadow-md px-8 py-6">
      <Divider
        orientation="left"
        style={{ borderColor: "#f0f0f0" }}
        className="text-2xl font-bold justify-center"
      >
        Add Promotion
      </Divider>

      <div className="">
        <div className="space-y-6">
          <Form layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
                rules={promotionNameRules}
                validateFirst
                label="Name Promotion"
                name="name"
                className="text-base font-medium"
              >
              <Input.TextArea
                placeholder="Enter Promotion name"
                className="w-full border-gray-300 rounded-md"
              />
            </Form.Item>
            
            <Form.Item
                rules={discountRules}
                validateFirst
                label="Discount"
                name="discount"
                className="text-base font-medium"
              >
              <Input.TextArea
                rows={2}
                placeholder="Enter % discord"
                className="w-full border-gray-300 rounded-md"
              />
              </Form.Item>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              rules={startDateRules}
              validateFirst
              label="Start Date"
              name="startDate"
              className="text-base font-medium"
            >
              <DatePicker className="w-full" /> 
            </Form.Item>

            <Form.Item
              rules={endDateRules}
              validateFirst
              label="End Date"
              name="endDate"
              className="text-base font-medium"
            >
              <DatePicker className="w-full" /> 
            </Form.Item>
            </div>

            <Form.Item
              rules={descriptionRules}
              validateFirst
              label="Description"
              name="description"
              className="text-base font-medium"
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter Promotion description"
                className="w-full border-gray-300 rounded-md"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block className="mt-4">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddPromotion;
