import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        {/* <DashboardContent /> */}
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title"> Admin Dashboard </h2>
          </div>
          {/* Top Total */}
          <div className="row">
            <div className="col-lg-4">
              <div className="card card-body mb-4 shadow-sm">
                <article className="icontext">
                  <span className="icon icon-sm rounded-circle alert-primary">
                    <i className="text-primary fas fa-usd-circle"></i>
                  </span>
                  <div className="text">
                    <h6 className="mb-1">Total Sales</h6> <span>$22,678</span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
