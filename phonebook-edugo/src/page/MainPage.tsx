import React, { useState } from "react";
import { Table, Form, Button, Modal } from "antd";
import ModalModify from "./modal.modify";
import { observer } from "mobx-react";
import { useStore } from "../context/store";
import { Item } from "../context/createStore";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const { confirm } = Modal;

const MainPage = observer(() => {
  const store = useStore();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState(store.originData);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Edit/Delete",
      dataIndex: "operation",
      render: (_: any, record: Item) => (
        <>
          {ModalModify(record, data, setData)}
          <Button
            danger
            type="primary"
            style={{ marginLeft: "5px" }}
            onClick={() => HandleDelete(record.key)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const HandleDelete = (key: string | any) => {
    confirm({
      title: `Do you want to delete ${
        typeof key === "string"
          ? "this 1 item"
          : "this " + key.length + " items"
      }?`,
      icon: <ExclamationCircleOutlined />,
      content: "If deleted, items cannot be restored",
      okText: "Confirm",
      okButtonProps: { type: "primary", danger: true },
      onOk() {
        const dataSource = [...data];
        const dataKeys = [...selectedRowKeys];
        if (typeof key === "string") {
          setData(dataSource.filter((item) => key !== item.key));
          setSelectedRowKeys(dataKeys.filter((i) => i !== key));
        } else {
          setData(dataSource.filter((item) => !key.includes(item.key)));
          setSelectedRowKeys([]);
        }
      },
    });
  };

  return (
    <>
      <h1>EDUGO.AI Small Web App</h1>
      <div className="buttons">
        {
          <Button
            danger
            disabled={selectedRowKeys.length > 1 ? false : true}
            type="primary"
            onClick={() => HandleDelete(selectedRowKeys)}
          >
            Delete All {selectedRowKeys.length}
          </Button>
        }
        {ModalModify(
          {
            key: uuidv4(),
            name: "",
            age: 0,
            address: "",
          },
          data,
          setData
        )}
        <h1>Total Items: {data.length}</h1>
      </div>
      <Form style={{ minWidth: "550px" }}>
        <Table
          bordered
          columns={columns}
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys: any) =>
              setSelectedRowKeys(selectedRowKeys),
          }}
          dataSource={data}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "25"],
          }}
        />
      </Form>
    </>
  );
});

export default MainPage;
