import React, { useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Table } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getPersons } from "../../redux/features/personSlice";
import Loading from "../../components/LoadingError/Loading";
// import { Link } from "react-router-dom";

const SkwHome = () => {
  const { persons, loading } = useSelector((state) => ({ ...state.person }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersons());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      render: (item) => {
        var date = new Date(item.dDate);
        var options = { year: "numeric", month: "short", day: "numeric" };
        return date.toLocaleDateString("th-TH", options);
      },
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
  ];

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        {/* <DashboardContent /> */}
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title mb-2"> Skw3 Manage Staffs </h2>
            {/* <Link to="/addPerson" className="btn btn-primary text-white mb-2">
              Add Persons
            </Link> */}
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
                  dataSource={persons}
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
  );
};

export default SkwHome;
