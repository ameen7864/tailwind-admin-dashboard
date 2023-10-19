import {
  StatisticsCard,
  StatisticsCards,
  StatisticsCards1,
} from "@/widgets/cards";
import { BsFillPeopleFill, BsStar, BsTicketPerforated } from "react-icons/bs";
import { MdCancelPresentation, MdStoreMallDirectory } from "react-icons/md";
import { useGetDashboardByNameQuery } from "../Redux/ReduxApi";

import { Typography } from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/solid";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

export function Home() {
  const { data } = useGetDashboardByNameQuery();
  const PaidPercentage =
    (data?.PaidCustomer[0].count / data?.CountofCustomes[0].count) * 100;
  const freePercentage =
    (data?.FreeCustomes[0].count / data?.CountofCustomes[0].count) * 100;
  const noticketPercentage =
    (data?.NoTickets[0].count / data?.CountofCustomes[0].count) * 100;

  const countrydata = data?.countries;
  const kuwait = countrydata?.totalPurchaseKW
    ? countrydata?.totalPurchaseCount
    : 0;
  const saudi = countrydata?.totalPurchaseSA
    ? countrydata?.totalPurchaseCount
    : 0;
  const uae = countrydata?.totalPurchaseUAE
    ? countrydata?.totalPurchaseCount
    : 0;
  const qatar = countrydata?.totalPurchaseQA
    ? countrydata?.totalPurchaseCount
    : 0;
  const bahrain = countrydata?.totalPurchaseBAH
    ? countrydata?.totalPurchaseCount
    : 0;

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          key={"All Customers"}
          value={data?.CountofCustomes[0].count}
          title={"All Customers"}
          icon={<BsFillPeopleFill className="h-6 w-6 text-white" />}
          completion={100}
        />
        <StatisticsCard
          key={"All Customers"}
          value={data?.PaidCustomer[0].count}
          color={"purple"}
          title={"Paid Tickts"}
          icon={<BsStar className="h-6 w-6 text-white" />}
          completion={Math?.ceil(PaidPercentage)}
        />
        <StatisticsCard
          key={"All Customers"}
          value={data?.FreeCustomes[0].count}
          color={"green"}
          title={"Free Ticket"}
          icon={<BsTicketPerforated className="h-6 w-6 text-white" />}
          completion={Math?.ceil(freePercentage)}
        />
        <StatisticsCard
          key={"No Tickets"}
          value={data?.NoTickets[0].count}
          color={"red"}
          title={"No Tickets"}
          icon={<MdCancelPresentation className="h-6 w-6 text-white" />}
          completion={Math?.ceil(noticketPercentage)}
        />
      </div>
      <hr className="mb-8 " />
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 capitalize md:grid-cols-2 xl:grid-cols-3">
        <Link to={"/dashboard/purchase?id=11"}>
          <StatisticsCards1
            key={"No Tickets"}
            value={0}
            color={"amber"}
            title={"total purchase"}
            icon={<MdStoreMallDirectory className="h-6 w-6 text-white" />}
            // completion={10}
          />
        </Link>
        <Link to={"/dashboard/purchase?country=1"}>
          <StatisticsCards1
            key={"No Tickets"}
            value={countrydata?.totalPurchaseCount}
            color={"white"}
            title={"total purchase-kuwait"}
            icon={
              <ReactCountryFlag
                countryCode="KW"
                svg
                className="-mt-2 text-7xl "
              />
            }
            completion={Math.ceil(kuwait)}
          />
        </Link>
        <Link to={"/dashboard/purchase?country=2"}>
          <StatisticsCards1
            key={"No Tickets"}
            value={countrydata?.totalPurchaseSA}
            color={"white"}
            title={"total purchase-saudi arabia"}
            icon={
              <ReactCountryFlag
                countryCode="SA"
                svg
                className="-mt-2 text-7xl "
              />
            }
            completion={Math.ceil(saudi)}
          />
        </Link>
        <Link to={"/dashboard/purchase?country=3"}>
          <StatisticsCards1
            key={"No Tickets"}
            value={countrydata?.totalPurchaseUAE}
            color={"white"}
            title={"total purchase-UAE"}
            icon={
              <ReactCountryFlag
                countryCode="AE"
                svg
                className="-mt-2 text-7xl "
              />
            }
            completion={Math.ceil(uae)}
          />
        </Link>
        <Link to={"/dashboard/purchase?country=4"}>
          <StatisticsCards1
            key={"No Tickets"}
            value={countrydata?.totalPurchaseQA}
            color={"white"}
            title={"total purchase-qatar"}
            icon={
              <ReactCountryFlag
                countryCode="QA"
                svg
                className="-mt-2 text-7xl "
              />
            }
            completion={Math.ceil(qatar)}
          />
        </Link>
        <Link to={"/dashboard/purchase?country=5"}>
          <StatisticsCards1
            key={"No Tickets"}
            value={countrydata?.totalPurchaseBAH}
            color={"white"}
            title={"total purchase-bahrain"}
            icon={
              <ReactCountryFlag
                countryCode="BH"
                svg
                className="-mt-2 text-7xl "
              />
            }
            completion={Math.ceil(bahrain)}
          />
        </Link>
      </div>
    </div>
  );
}

export default Home;
