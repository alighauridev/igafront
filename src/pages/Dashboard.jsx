import React, { useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../redux/slices/stats/statsActions";
import ModalWrapper from "../components/ModalWrapper";
import Loading from "../components/Loading";



const DataFirst = ({ number, job }) => {
    return(
        <div
                style={{
                  background: "white",
                  width: "100%",
                  padding: "30px 0",
                  borderRadius: "8px",
                }}
              >
                <h1
                  style={{
                    fontSize: "20px",
                    color: "blue",
                    textAlign: "center",
                    fontWeight: "600",
                    fontFamily: "Manrope",
                  }}
                >
                  {number}
                </h1>
                <h1
                  style={{
                    fontSize: "20px",
                    color: "black",
                    textAlign: "center",
                    marginTop: "15px",
                    fontWeight: "600",
                    fontFamily: "Manrope",
                  }}
                >
                  {job}
                </h1>
              </div>
    )
}


const DataTwo = ({ number, job }) => {
    return(
        <div
                  style={{
                    background: "white",
                    width: "100%",
                    padding: "30px 0",
                    borderRadius: "8px",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "20px",
                      color: "black",
                      textAlign: "center",
                      fontWeight: "600",
                      fontFamily: "Manrope",
                    }}
                  >
                    {number}
                  </h1>
                  <h1
                    style={{
                      fontSize: "20px",
                      color: "black",
                      textAlign: "center",
                      marginTop: "15px",
                      fontWeight: "600",
                      fontFamily: "Manrope",
                    }}
                  >
                    {job}
                  </h1>
                </div>
    )
}


const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, stats, error } = useSelector((state) => state.stats);

//   const datatwo = [
//     {
//       number: "Total transaction",
//       job: "$32,45654",
//     },
//     {
//       number: "$32,45654",
//       job: "$32,45654",
//     },
//     {
//       number: "Total freelancer",
//       job: "45",
//     },
//     {
//       number: "Total buyers",
//       job: "13",
//     },
//   ];

  useEffect(() => {
    dispatch(getStats());
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden bg-tertiary">
      <ModalWrapper style={{ backgroundColor: "transparent" }} isOpen={loading}>
        <div className="flex self-center items-center justify-center">
          <Loading type="bars" size={40} />
        </div>
      </ModalWrapper>
      <Header />
      <div style={{ background: "#F2F5FA", height: "100vh" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            width: "100%",
            maxWidth: "1100px",
            margin: "auto",
            placeItems: "center",
            gap: "20px",
            padding: "40px 0",
          }}
        >
          <DataFirst number={ stats?.totalJobs } job={"Total Jobs"} />
        <DataFirst number={ stats?.completedJobs } job={"Completed Jobs"} />
        <DataFirst number={ stats?.cancelledJobs } job={"Cancelled Jobs"} />
        <DataFirst number={ stats?.disputedJobs } job={"Disputed Jobs"} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 3fr",
            width: "100%",
            maxWidth: "1100px",
            margin: "auto",
            placeItems: "center",
            gap: "40px",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "0px 0",
              borderRadius: "8px",
              background: "white",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "60px",
                  padding: "50px 20px",
                  textAlign: "center",
                  background: "#C2D6FE",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontFamily: "Manrope",
                }}
              >
                $ {stats?.totalEarnings || 0}
              </h1>
            </div>
            <h1
              style={{
                fontSize: "36px",
                padding: "30px 20px",
                textAlign: "center",
                borderRadius: "8px",
                fontWeight: "600",
                fontFamily: "Manrope",
              }}
            >
              Total Earning
            </h1>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              width: "100%",
              gap: "20px",
            }}
          >
            <DataTwo number={ stats?.totalTransactions } job={"Total Transactions"} />
            <DataTwo number={ stats?.totalUsers } job={"Total Users"} />
            <DataTwo number={ stats?.totalFreelancers } job={"Total Freelancers"} />
            <DataTwo number={ stats?.totalBuyers } job={"Total Buyers"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
