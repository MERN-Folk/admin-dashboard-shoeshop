import React, { useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import { Table, Switch, Select, Tag } from "antd";
import {
  getStaffs,
  changeStatus,
  changeRole,
  removeStaff,
} from "../../redux/features/authSlice";
import { getGroups } from "../../redux/features/groupSlice";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import th from 'moment/locale/th'
// import "moment/min/locales";
import Loading from "../../components/LoadingError/Loading";

const ManageStaff = () => {
  const { staffs, loading } = useSelector((state) => ({ ...state.auth }));
  const { groups } = useSelector((state) => ({
    ...state.group,
  }));
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getStaffs());
    dispatch(getGroups());
  }, [dispatch]);

  const handleChangeStatus = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };
    // dispatch(changeStatus({ value, navigate, toast }));
    dispatch(changeStatus({ value }));
    window.location.reload();
  };

  const handleChangeRole = (e, id) => {
    const value = {
      id: id,
      role: e,
    };
    // dispatch(changeStatus({ value, navigate, toast }));
    dispatch(changeRole({ value }));
    window.location.reload();
  };

  const handleRemove = (id) => {
    if (window.confirm("Are your sure delete?")) {
      // console.log("id", id);
      dispatch(removeStaff(id));
      window.location.reload();
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      render: (item) => (
        <>
          <span>
            <Select
              style={{ width: "100%" }}
              value={item.role}
              onChange={(e) => handleChangeRole(e, item._id)}
            >
              {groups.map((item, index) => (
                <Select.Option value={item.gname} key={index}>
                  {item.gname === "admin" ? (
                    <Tag color="blue">{item.gname}</Tag>
                  ) : (
                    <Tag color="green">{item.gname}</Tag>
                  )}
                </Select.Option>
              ))}
            </Select>
          </span>
        </>
      ),
    },
    {
      title: "Status",
      render: (item) => (
        <>
          <span>
            <Switch
              checked={item.enabled}
              onChange={(e) => handleChangeStatus(e, item._id)}
            />
          </span>
        </>
      ),
    },
    {
      title: "created",
      // render: (item) => {
      //   var date = new Date(item.createdAt);
      //   var options = { year: "numeric", month: "short", day: "numeric" };
      //   return date.toLocaleDateString("th-TH", options);
      // },
      render: (item) =>
      moment(item.createdAt).local("th",th).add(543, "year").format("LL"),
    },
    {
      title: "updated",
      // render: (item) => {
      //   var date = new Date(item.updatedAt);
      //   var dt = moment(date).locale("th").startOf(date).fromNow();
      //   return dt;
      // },
      render: (item) =>
      moment(item.updatedAt).locale("th",th).startOf().fromNow(),
    },
    {
      title: "Actions",
      render: (item) => (
        <>
          <span
            className="btn btn-sm float-right"
            onClick={() => handleRemove(item._id)}
          >
            <DeleteOutlined className="text-danger" />
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <section className="content-main">
          <div className="content-header mb-2">
            <h2 className="content-title">Manage Staffs</h2>
          </div>

          <div className="card mb-4">
            {/* Card */}
            <div className="card-body">
              {loading && <Loading />}
              <Table
                columns={columns}
                dataSource={staffs}
                rowKey="_id"
                // style={{ padding: '0 50px' }}
                size="small"
                // pagination={{
                //   defaultPageSize: 5,
                //   onChange: (pageNum) => {
                //     setCurrentPage(pageNum);
                //   },
                //   current: currentPage,
                // }}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ManageStaff;
