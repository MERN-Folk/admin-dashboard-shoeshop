import React, { useEffect } from 'react'
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deletePerson,
  getPersonsByStaff,
} from "../../redux/features/personSlice";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import moment from "moment";
import th from 'moment/locale/th'
import Loading from "../../components/LoadingError/Loading";

const Skw301Home = () => {
  const { staff } = useSelector((state) => ({ ...state.auth }));
  const { staffPersons, loading } = useSelector((state) => ({
    ...state.person,
  }));
  const staffId = staff?.result?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (staffId) {
      dispatch(getPersonsByStaff(staffId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffId]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person ?")) {
      dispatch(deletePerson({ id, toast }));
    }
  };

  const columns = [
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "cFname",
      key: "cFname",
    },
    {
      title: "อายุ",
      dataIndex: "nAge",
      key: "nAge",
    },
    {
      title: "ตฉซ",
      dataIndex: "cPro",
      key: "cPro",
    },
    {
      title: "วันรับธรรมะ",
      // render: (item) => {
      //   var date = new Date(item.dDate);
      //   var options = { year: "numeric", month: "short", day: "numeric" };
      //   return date.toLocaleDateString("th-TH", options);
      // },
      render: (item) =>
      moment(item.createdAt).local("th",th).add(543, "year").format("LL"),
      defaultSortOrder: "descend",
      sorter: (a, b) => new Date(a.dDate) - new Date(b.dDate),
    },
    {
      title: "อ.แนะนำ",
      dataIndex: "cRec",
      key: "cRec",
    },
    {
      title: "อ.รับรอง",
      dataIndex: "cSup",
      key: "cSup",
    },
    {
      title: "ที่อยู่",
      dataIndex: "cAddress",
      key: "cAddress",
    },
    // {
    //   title: "รูปภาพ",
    //   dataIndex: "imageFile",
    //   key: "imageFile",
    // },
    {
      title: "Actions",
      render: (item) => (
        <>
          <span
            className="btn btn-sm float-right"
            onClick={() => handleDelete(item._id)}
          >
            <DeleteOutlined className="text-danger" />
          </span>
          <Link to={`/editPerson/${item._id}`}>
            <span className="btn btn-sm float-right">
              <EditOutlined className="text-warning" />
            </span>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        {/* <DashboardContent /> */}
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title mb-2"> Skw301 Manage Staffs </h2>
            <Link to="/addPerson" className="btn btn-primary text-white mb-2">
              Add Persons
            </Link>
          </div>
          {/* Top Total */}
          <div className="row">
            <div className="col-lg">
              <div className="card card-body mb-4 shadow-sm">
                {/* <article className="icontext">
                  <span className="icon icon-sm rounded-circle alert-primary">
                    <i className="text-primary fas fa-usd-circle"></i>
                  </span>
                  <div className="text">
                    <h6 className="mb-1">Total Sales</h6> <span>$22,678</span>
                  </div>
                </article> */}
                {loading && <Loading />}
                <Table
                  columns={columns}
                  dataSource={staffPersons}
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
          </div>
        </section>
      </main>
    </>
  )
}

export default Skw301Home