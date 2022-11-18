import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import { toast } from "react-toastify";
import {
  createGroup,
  getGroups,
  deleteGroup,
  updateGroup,
} from "../../redux/features/groupSlice";
import Loading from "../../components/LoadingError/Loading";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const initialState = {
  nId_group: "",
  gname: "",
};

const AddEditGroup = () => {
  // const [last_nId_cpro, setLast_nid_cpro] = useState("")
  const [groupData, setGroupData] = useState(initialState);
  const { groups, error, loading } = useSelector((state) => ({
    ...state.group,
  }));
  // // console.log('cpros', cpros)
  const last = ({...groups.at(-1)}.nId_group)
  const next = String(last + 1)
  // console.log( next)
  const { staff } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { nId_group, gname } = groupData;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const singleGroup = groups.find((groups) => groups._id === id);
      // console.log(singleCpro);
      setGroupData({ ...singleGroup });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    dispatch(getGroups());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(cFname, nAge, cAddress)
    if (nId_group && gname) {
      const updatedGroupData = { ...groupData, name: staff?.result?.name };
      if (!id) {
        dispatch(createGroup({ updatedGroupData, navigate, toast }));
      } else {
        dispatch(updateGroup({ id, updatedGroupData, toast, navigate }));
      }
      handleClear();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData({ ...groupData, [name]: value });
  };

  const handleClear = () => {
    setGroupData({ nId_group: "", gname: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this group ?")) {
      dispatch(deleteGroup({ id, toast }));
    }
  };

  const columns = [
    {
      title: "รหัส",
      dataIndex: "nId_group",
      key: "nId_group",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.nId_group - b.nId_group,
    },
    {
      title: "Group",
      dataIndex: "gname",
      key: "gname",
    },
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
          <Link to={`/editGroup/${item._id}`}>
            <span
              className="btn btn-sm float-right"
            >
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
        <section className="content-main">
          <div className="content-header mb-2">
            <h2 className="content-title">Manage Group</h2>
          </div>
          <div className="row">
            <div
              className="card shadow col-md-3"
              // style={{ maxWidth: "380px", marginTop: "100px" }}
            >
              <div className="card-body">
                <h4 className="card-title mb-4 text-center">
                  {id ? "Update Group" : "Add Group"}
                </h4>
                {loading && <Loading />}
                <form onSubmit={handleSubmit} noValidate>
                  {/* <form noValidate> */}
                  <div className="mb-3">
                    <h6>{next}</h6>
                    <input
                      onChange={onInputChange}
                      className="form-control"
                      placeholder="nId_group"
                      type="number"
                      value={nId_group}
                      name="nId_group"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      onChange={onInputChange}
                      className="form-control"
                      placeholder="Name"
                      type="text"
                      value={gname}
                      name="gname"
                    />
                  </div>

                  <div className="mb-3">
                    <button className="btn btn-primary w-100 mb-2">
                      {id ? "Update" : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="card shadow col-md-9">
              <div className="card-body">
                <h4 className="card-title mb-4 text-center">Group Detail</h4>
                <div className="mb-3">
                  <Table
                    columns={columns}
                    dataSource={groups}
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
          </div>
        </section>
      </main>
    </>
  );
};

export default AddEditGroup;
