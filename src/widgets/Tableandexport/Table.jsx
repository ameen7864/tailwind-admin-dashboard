
import { Empty, Spin, Table } from "antd";
import { Loader } from "../Button/Button";

const Tables = ({ data, loading, columns, pagination , onChange}) => {
  const customEmptyText = (
    <Empty
      style={{
        display: "flex",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
      }}
      image={
        <img
          src={
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          }
          alt="Custom Loader"
        />
      }
      description={
        <div>
          <div>{"Custom Loader Text"}</div>
        </div>
      }
    />
  );

  const customLoader = (
    <Spin indicator={<Loader />} size="large">
      {loading && <div style={{ minHeight: 200 }}></div>}
    </Spin>
  );
  
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={false} 
        onChange={onChange}
        locale={{
          emptyText: customEmptyText,
          filterConfirm: customLoader,
          filterReset: customLoader,
        
        }}
      />
    </div>
  );
};

export default Tables;
