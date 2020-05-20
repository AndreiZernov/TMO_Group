import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { Item } from "../context/createStore";

const ModalModify = (record: Item, data: Item[], setData: any) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const Save = async (values: {}, key: React.Key) => {
    try {
      const row = values as Item;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
      } else {
        newData.push({ ...row, key: key.toString() });
        form.setFieldsValue({ name: "", age: "", address: "" });
        setData(newData);
      }
      setVisible(false);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const setName = () =>
    data.filter((item) => item.key === record.key).length > 0
      ? "Modify"
      : "Add New";

  return (
    <>
      <Button
        style={{ marginLeft: "auto" }}
        type="primary"
        onClick={() => setVisible(true)}
      >
        {setName()}
      </Button>
      <Modal
        visible={visible}
        title={`Do you want to ${setName()} item?`}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Return
          </Button>,
        ]}
      >
        <Form
          form={form}
          initialValues={record}
          onFinish={(values) => Save(values, record.key)}
        >
          {["name", "age", "address"].map((item) => (
            <Form.Item
              key={item}
              label={item}
              name={item}
              rules={[
                { required: true, message: `Please input your ${item}!` },
              ]}
            >
              {item === "age" ? (
                <Input type="number" min="0" max="150" />
              ) : (
                <Input maxLength={50} />
              )}
            </Form.Item>
          ))}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalModify;
