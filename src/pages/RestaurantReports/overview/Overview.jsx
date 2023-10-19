import { StatisticsCards1 } from "@/widgets/cards";
import { FaFemale, FaMale, FaRegRegistered } from "react-icons/fa";
import {
  MdAppBlocking,
  MdExitToApp,
  MdFullscreenExit,
  MdOutlineAirlineSeatReclineExtra,
  MdOutlineAppsOutage,
  MdOutlineAssignmentReturn,
  MdOutlineChair,
  MdOutlineChairAlt,
  MdOutlineEventSeat,
  MdOutlineTimelapse,
  MdOutlineWorkspacePremium,
  MdStoreMallDirectory,
} from "react-icons/md";

import {
  useGetAllRestBranchByNameQuery,
  useGetAllRestByNameQuery,
} from "@/pages/Redux/ReduxApi";
import { useGetOverviewByNameQuery } from "@/pages/Redux/ReportsApi";
import Button from "@/widgets/Button/Button";
import { Progress, Typography } from "@material-tailwind/react";
import { Card, Grid } from "@mui/material";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";

export function Home() {
  const today = new Date().toISOString().split("T")[0];
  const [search, setsearch] = useState("");
  const [resto, setresto] = useState(-1);
  const [restId, setrestID] = useState(-1);
  const [branchid, setbranchid] = useState(-1);
  const [parentId, setparentId] = useState(-1);
  const [sdate, setSdate] = useState(today);
  const [Edate, setEdate] = useState(today);
  const [startDate, setstartdate] = useState(today);
  const [EndDate, setEndDate] = useState(today);
  const { data: overview } = useGetOverviewByNameQuery({
    branchid: -1,
    startDate: "01/06/2023",
    EndDate,
    restId: -1,
    position: -1,
  });

  const { data: restaurant } = useGetAllRestByNameQuery();
  const { data: branch, refetch } = useGetAllRestBranchByNameQuery({
    id: resto,
  });

  const restaurantdata = restaurant?.data;
  const restaurantbranchdata = branch?.data;

  const total = overview?.totalPurchaseCount;
  const totals = overview?.totalCount;
  const perseated = Math.ceil(
    (overview?.totalSeatedCount / overview?.totalCount) * 100
  );
  const perwaited = Math.ceil(
    (overview?.totalWaitingCount / overview?.totalCount) * 100
  );
  const percancel = Math.ceil(
    (overview?.totalCancelCount / overview?.totalCount) * 100
  );
  const perkiosk = Math.ceil(
    (overview?.totalKioskCount / overview?.totalCount) * 100
  );
  const pershost = Math.ceil(
    (overview?.totalHostCount / overview?.totalCount) * 100
  );

  const perApp = Math.ceil(
    (overview?.totalAppCount / overview?.totalCount) * 100
  );
  const perappseat = Math.ceil(
    (overview?.totalAppSeatedCount / overview?.totalCount) * 100
  );
  const perAppCancelled = Math.ceil(
    (overview?.totalAppCancelCount / overview?.totalCount) * 100
  );
  const perAppWaiting = Math.ceil(
    (overview?.totalAppWaitingCount / overview?.totalCount) * 100
  );
  const perpremiumpaid = Math.ceil(
    (overview?.totalPremiumCount / overview?.totalCount) * 100
  );
  const perpremiumseated = Math.ceil(
    (overview?.totalPremiumSeatedCount / overview?.totalCount) * 100
  );

  const perkuwait = Math.ceil(
    (overview?.totalPurchaseKW / overview?.totalPurchaseCount) * 100
  );
  const peruae = Math.ceil(
    (overview?.totalPurchaseUAE / overview?.totalPurchaseCount) * 100
  );

  const perbahrain = Math.ceil(
    (overview?.totalPurchaseBAH / overview?.totalPurchaseCount) * 100
  );
  const persaudi = Math.ceil(
    (overview?.totalPurchaseSA / overview?.totalPurchaseCount) * 100
  );
  const perqatar = Math.ceil(
    (overview?.totalPurchaseQA / overview?.totalPurchaseCount) * 100
  );

  const permale = Math.ceil(
    (overview?.totalCountMale / overview?.totalCount) * 100
  );
  const perfemale = Math.ceil(
    (overview?.totalCountFemale / overview?.totalCount) * 100
  );

  const perinside = Math.ceil(
    (overview?.totalInside / overview?.totalCount) * 100
  );
  const peroutside = Math.ceil(
    (overview?.totalOutside / overview?.totalCount) * 100
  );
  const perany = Math.ceil((overview?.totalAny / overview?.totalCount) * 100);

  return (
    <div className="mt-6">
      <Typography className="mx-2  grid grid-cols-1 gap-4 md:grid-cols-5">
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Date From:
          </label>
          <input
            type="date"
            defaultValue={today}
            onChange={(e) => setSdate(e.target.value)}
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            To:
          </label>
          <input
            type="date"
            defaultValue={today}
            onChange={(e) => setEdate(e.target.value)}
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-blue-500 dark:border-purple-600 dark:bg-purple-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Restaurant:
          </label>
          <select
            id="countries"
            onChange={(e) => setresto(e.target.value)}
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          >
            <option value={"-1"}>Choose a Restaurant</option>
            {restaurantdata?.map((item, i) => (
              <option key={i} value={item.id}>
                {item.ResturantName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Branch
          </label>

          <select
            id="countries"
            onChange={(e) => setbranchid(e.target.value)}
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-700 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-700 dark:focus:ring-blue-500"
          >
            <option value={"-1"}>Choose a Branch</option>
            {restaurantbranchdata?.map((item, i) => (
              <option key={i} value={item.id}>
                {item.name_en}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-7">
          <Button name={"search"} />
        </div>
      </Typography>
      <hr className="my-8" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={2}>
          <Link
            target="_blank"
            to={
              "/dashboard/guestdata" +
              `?type=0&sdate=${sdate}&edate=${Edate}&rest=${restId}`
            }
          >
            <Card
              style={{
                width: "100%",
                minHeight: 130,
                borderRadius: "8px",
                background:
                  "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                color: "white",
                padding: "1rem",
                cursor: "pointer",
              }}
            >
              <div className="text-2xl">{overview?.totalCount}</div>
              <div className="text-xl font-semibold">Total</div>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Link
            target="_blank"
            to={
              "/dashboard/guestdata" +
              `?type=4&sdate=${sdate}&edate=${Edate}&rest=${restId}`
            }
          >
            <Card
              style={{
                width: "100%",
                minHeight: 130,
                borderRadius: "8px",
                background: "linear-gradient(to right, #093028, #237a57)",
                color: "white",
                padding: "1rem",
                cursor: "pointer",
              }}
            >
              <div className="text-2xl">{overview?.totalSeatedCount}</div>
              <div className="text-lg">Seated</div>
              <div className="mt-2">
                <Progress
                  value={perseated ? perseated : 0}
                  variant="gradient"
                  color={perseated === 100 ? "green" : "blue"}
                  className="h-1"
                />
                <div style={{ fontSize: "16px", fontFamily: "system-ui" }}>
                  {perseated ? perseated : 0}% of {totals ? totals : 0}
                </div>
              </div>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Link
            target="_blank"
            to={
              "/dashboard/guestdata" +
              `?type=5&sdate=${sdate}&edate=${Edate}&rest=${restId}`
            }
          >
            <Card
              style={{
                width: "100%",
                minHeight: 130,
                borderRadius: "8px",
                background:
                  "linear-gradient(to right,rgb(254, 140, 0), rgb(221 148 58)",
                color: "white",
                padding: "1rem",
                cursor: "pointer",
              }}
            >
              <div className="text-2xl">{overview?.totalWaitingCount}</div>
              <div className="text-lg">Waiting(Not Seat)</div>
              <div className="mt-2">
                <Progress
                  value={perwaited ? perwaited : 0}
                  variant="gradient"
                  color={perwaited === 100 ? "green" : "blue"}
                  className="h-1"
                />
                <div style={{ fontSize: "16px", fontFamily: "system-ui" }}>
                  {perwaited ? perwaited : 0}% of {totals ? totals : 0}
                </div>
              </div>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Link
            target="_blank"
            to={
              "/dashboard/guestdata" +
              `?type=6&sdate=${sdate}&edate=${Edate}&rest=${restId}`
            }
          >
            <Card
              style={{
                width: "100%",
                minHeight: 130,
                borderRadius: "8px",
                background: "linear-gradient(to right,#f85032, #e73827)",
                color: "white",
                padding: "1rem",
                cursor: "pointer",
              }}
            >
              <div className="text-2xl">{overview?.totalCancelCount}</div>
              <div className="text-lg">Cancelled</div>
              <div className="mt-2">
                <Progress
                  value={percancel ? percancel : 0}
                  variant="gradient"
                  color={percancel === 100 ? "green" : "blue"}
                  className="h-1"
                />
                <div style={{ fontSize: "16px", fontFamily: "system-ui" }}>
                  {percancel ? percancel : 0}% of {totals ? totals : 0}
                </div>
              </div>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <Link
            target="_blank"
            to={
              "/dashboard/guestdata" +
              `?type=11&sdate=${sdate}&edate=${Edate}&rest=${restId}`
            }
          >
            <Card
              style={{
                width: "100%",
                minHeight: 130,
                borderRadius: "8px",
                background: "linear-gradient(to right,#141e30, #243b55)",
                color: "white",
                padding: "1rem",
                cursor: "pointer",
              }}
            >
              <div className="text-2xl">{overview?.totalKioskCount}</div>
              <div className="text-lg">Kiosk</div>
              <div className="mt-2">
                <Progress
                  value={perkiosk ? perkiosk : 0}
                  variant="gradient"
                  color={perkiosk === 100 ? "green" : "blue"}
                  className="h-1"
                />
                <div style={{ fontSize: "16px", fontFamily: "system-ui" }}>
                  {perkiosk ? perkiosk : 0}% of {totals ? totals : 0}
                </div>
              </div>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Link
            target="_blank"
            to={
              "/dashboard/guestdata" +
              `?type=12&sdate=${sdate}&edate=${Edate}&rest=${restId}`
            }
          >
            <Card
              style={{
                width: "100%",
                minHeight: 130,
                borderRadius: "8px",
                background: "linear-gradient(to right, #4ecdc4, #556270)",
                color: "white",
                padding: "1rem",
                cursor: "pointer",
              }}
            >
              <div className="text-2xl">{overview?.totalHostCount}</div>
              <div className="text-lg">Host</div>
              <div className="mt-2">
                <Progress
                  value={pershost ? pershost : 0}
                  variant="gradient"
                  color={pershost === 100 ? "green" : "blue"}
                  className="h-1"
                />
                <div style={{ fontSize: "16px", fontFamily: "system-ui" }}>
                  {pershost ? pershost : 0}% of {totals ? totals : 0}
                </div>
              </div>
            </Card>
          </Link>
        </Grid>
      </Grid>
      <hr className="my-8 " />
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 capitalize  md:grid-cols-3 xl:grid-cols-4">
        <Link
          target="_blank"
          to={
            "/dashboard/guestdata" +
            `?type=7&sdate=${sdate}&edate=${Edate}&rest=${restId}`
          }
        >
          <StatisticsCards1
            key={"No Tickets"}
            value={overview?.totalAppCount}
            color={"white"}
            title="App"
            icon={<MdOutlineAppsOutage className="h-8 w-8 text-black" />}
            completion={perApp}
          />
        </Link>
        <Link
          target="_blank"
          to={
            "/dashboard/guestdata" +
            `?type=15&sdate=${sdate}&edate=${Edate}&rest=${restId}`
          }
        >
          <StatisticsCards1
            key={"No Tickets"}
            value={overview?.totalAppSeatedCount}
            color={"light-green"}
            title="App Seated"
            icon={
              <MdOutlineAirlineSeatReclineExtra className="h-6 w-6 text-white" />
            }
            completion={perappseat}
          />
        </Link>
        <Link
          target="_blank"
          to={
            "/dashboard/guestdata" +
            `?type=16&sdate=${sdate}&edate=${Edate}&rest=${restId}`
          }
        >
          <StatisticsCards1
            key={"No Tickets"}
            value={overview?.totalAppWaitingCount}
            color={"deep-purple"}
            title="App Waiting (No Action)"
            icon={<MdOutlineTimelapse className="h-6 w-6 text-white" />}
            completion={perAppWaiting}
          />
        </Link>
        <Link
          target="_blank"
          to={
            "/dashboard/guestdata" +
            `?type=17&sdate=${sdate}&edate=${Edate}&rest=${restId}`
          }
        >
          <StatisticsCards1
            key={"No Tickets"}
            value={overview?.totalAppCancelCount}
            color={"red"}
            title="App Canceled"
            icon={<MdAppBlocking className="h-6 w-6 text-white" />}
            completion={perAppCancelled}
          />
        </Link>
        <Link
          target="_blank"
          to={
            "/dashboard/guestdata" +
            `?type=13&sdate=${sdate}&edate=${Edate}&rest=${restId}`
          }
        >
          <StatisticsCards1
            key={"No Tickets"}
            value={overview?.totalPremiumCount}
            color={"brown"}
            title="Premium (Paid)"
            icon={<MdOutlineWorkspacePremium className="h-6 w-6 text-white" />}
            completion={perpremiumpaid}
          />
        </Link>
        <Link
          target="_blank"
          to={
            "/dashboard/guestdata" +
            `?type=14&sdate=${sdate}&edate=${Edate}&rest=${restId}`
          }
        >
          <StatisticsCards1
            key={"No Tickets"}
            value={overview?.totalPremiumSeatedCount}
            color={"indigo"}
            title="Premium Seated"
            icon={<MdOutlineEventSeat className="h-6 w-6 text-white" />}
            completion={perpremiumseated}
          />
        </Link>
        <StatisticsCards1
          key={"No Tickets"}
          value={overview?.totalPurchaseCount}
          color={"gray"}
          title={"total purchase"}
          icon={<MdStoreMallDirectory className="h-6 w-6 text-white" />}
          // completion={10}
        />
        <StatisticsCards1
          key={"No Tickets"}
          value={overview?.totalPurchaseKW}
          color={"white"}
          title={"total purchase-kuwait"}
          icon={
            <ReactCountryFlag
              countryCode="KW"
              svg
              className="-mt-2 text-7xl "
            />
          }
          completion={perkuwait}
        />
        <StatisticsCards1
          key={"No Tickets"}
          value={overview?.totalPurchaseSA}
          color={"white"}
          title={"total purchase-saudi arabia"}
          icon={
            <ReactCountryFlag
              countryCode="SA"
              svg
              className="-mt-2 text-7xl "
            />
          }
          completion={persaudi}
        />
        <StatisticsCards1
          key={"No Tickets"}
          value={overview?.totalPurchaseUAE}
          color={"white"}
          title={"total purchase-UAE"}
          icon={
            <ReactCountryFlag
              countryCode="AE"
              svg
              className="-mt-2 text-7xl "
            />
          }
          completion={peruae ? peruae : 0}
        />
        <StatisticsCards1
          key={"No Tickets"}
          value={overview?.totalPurchaseQA}
          color={"white"}
          title={"total purchase-qatar"}
          icon={
            <ReactCountryFlag
              countryCode="QA"
              svg
              className="-mt-2 text-7xl "
            />
          }
          completion={perqatar}
        />
        <StatisticsCards1
          key={"No Tickets"}
          value={overview?.totalPurchaseBAH}
          color={"white"}
          title={"total purchase-bahrain"}
          icon={
            <ReactCountryFlag
              countryCode="BH"
              svg
              className="-mt-2 text-7xl "
            />
          }
          completion={perbahrain}
        />
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 capitalize  md:grid-cols-3 xl:grid-cols-4">
        <Link
          target="_blank"
          to={
            "/dashboard/guestdata" +
            `?type=8&sdate=${sdate}&edate=${Edate}&rest=${restId}`
          }
        >
          <StatisticsCards1
            key={"No Tickets"}
            value={overview?.totalCountMale}
            color={"purple"}
            title="Total Male"
            icon={<FaMale className="h-6 w-6 text-white" />}
            completion={permale}
          />
        </Link>{" "}
        <Link
          target="_blank"
          to={
            "/dashboard/guestdata" +
            `?type=9&sdate=${sdate}&edate=${Edate}&rest=${restId}`
          }
        >
          <StatisticsCards1
            key={"No Tickets"}
            value={overview?.totalCountFemale}
            color={"pink"}
            title="Total Female"
            icon={<FaFemale className="h-6 w-6 text-white" />}
            completion={perfemale}
          />
        </Link>
        <Link
          target="_blank"
          to={
            "/dashboard/guestdata" +
            `?type=10&sdate=${sdate}&edate=${Edate}&rest=${restId}`
          }
        >
          <StatisticsCards1
            key={"No Tickets"}
            value={overview?.totalCountNewRegister}
            color={"yellow"}
            title="New By Registered "
            icon={<FaRegRegistered className="h-6 w-6 text-white" />}
          />
        </Link>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 capitalize  md:grid-cols-3 xl:grid-cols-4">
        <StatisticsCards1
          key={"No Tickets"}
          value={overview?.totalCountChairs ? overview?.totalCountChairs : 0}
          color={"green"}
          title="Chairs(All) "
          icon={<MdOutlineChair className="h-6 w-6 text-white" />}
        />
        <StatisticsCards1
          key={"No Tickets"}
          value={overview?.totalSeatedChairs ? overview?.totalSeatedChairs : 0}
          color={"blue"}
          title="Chairs (Seated)"
          icon={<MdOutlineChairAlt className="h-6 w-6 text-white" />}
        />
        <Link
          target="_blank"
          to={
            "/dashboard/guestdata" +
            `?type=1&sdate=${sdate}&edate=${Edate}&rest=${restId}`
          }
        >
          <StatisticsCards1
            key={"No Tickets"}
            value={overview?.totalInside}
            color={"orange"}
            title="Inside"
            icon={<MdOutlineAssignmentReturn className="h-6 w-6 text-white" />}
            completion={perinside}
          />
        </Link>
        <Link
          target="_blank"
          to={
            "/dashboard/guestdata" +
            `?type=2&sdate=${sdate}&edate=${Edate}&rest=${restId}`
          }
        >
          <StatisticsCards1
            key={"No Tickets"}
            value={overview?.totalOutside}
            color={"deep-orange"}
            title="Outside "
            icon={<MdExitToApp className="h-6 w-6 text-white" />}
            completion={peroutside}
          />
        </Link>
        <Link
          target="_blank"
          to={
            "/dashboard/guestdata" +
            `?type=3&sdate=${sdate}&edate=${Edate}&rest=${restId}`
          }
        >
          <StatisticsCards1
            key={"No Tickets"}
            value={overview?.totalAny}
            color={"cyan"}
            title="Any "
            icon={<MdFullscreenExit className="h-6 w-6 text-white" />}
            completion={perany}
          />
        </Link>
      </div>
   
    </div>
  );
}

export default Home;
