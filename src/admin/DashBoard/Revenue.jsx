import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { RevenueCharts } from "./DashboardEcommerceCharts";
import CountUp from "react-countup";
import { useSelector, useDispatch } from "react-redux";
import { fetchRevenueData } from "../../redux/revenueSlice";
import YearPicker from "../../component/Common/YearPicker";

const Revenue = () => {
  const dispatch = useDispatch();
  const [chartData, setchartData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const { revenueData } = useSelector((state) => ({
    revenueData: state.revenue.data,
  }));

  //apply data to chart
  useEffect(() => {
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: `${i + 1}`,
      total: 0,
      orders: 0,
    }));

    revenueData?.forEach((result) => {
      const monthIndex = parseInt(result.month) - 1;
      months[monthIndex].total = result.total;
      months[monthIndex].orders = result.orders;
    });

    setchartData([
      {
        name: "Orders",
        type: "area",
        data: months.map((month) => month.orders),
      },
      {
        name: "Total",
        type: "bar",
        data: months.map((month) => month.total),
      },
      // {
      //     name: "Refunds",
      //     type: "line",
      //     data: [58, 42, 47, 57, 71, 21, 15, 69, 17, 39, 52, 55],
      // },
    ]);
  }, [revenueData]);

  const onChangeChartYear = (year) => {
    setYear(year);
    dispatch(fetchRevenueData(year));
  };

  useEffect(() => {
    dispatch(fetchRevenueData(new Date().getFullYear()));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Card>
        <CardHeader className="border-0 align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Revenue: {year}</h4>
          <YearPicker
            startYear={2020}
            endYear={new Date().getFullYear()}
            handleSelect={onChangeChartYear}
          />
        </CardHeader>

        <CardHeader className="p-0 border-0 bg-soft-light">
          <Row className="g-0 text-center">
            <Col xs={6} sm={3}>
              <div className="p-3 border border-dashed border-start-0">
                <h5 className="mb-1">
                  <CountUp
                    start={0}
                    end={revenueData?.reduce(
                      (sum, month) => sum + month.orders,
                      0
                    )}
                    duration={3}
                    separator=","
                  />
                </h5>
                <p className="text-muted mb-0">Orders</p>
              </div>
            </Col>
            <Col xs={6} sm={3}>
              <div className="p-3 border border-dashed border-start-0">
                <h5 className="mb-1">
                  <CountUp
                    
                    prefix="$"
                    start={0}
                    decimals={2}
                    end={revenueData?.reduce(
                      (sum, month) => sum + month.total,
                      0
                    )}
                    duration={3}
                  />
                </h5>
                <p className="text-muted mb-0">Total</p>
              </div>
            </Col>
            
          </Row>
        </CardHeader>

        <CardBody className="p-0 pb-2">
          <div className="w-100">
            <div dir="ltr">
              <RevenueCharts
                series={chartData}
                dataColors='["--vz-success", "--vz-primary", "--vz-danger"]'
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Revenue;
