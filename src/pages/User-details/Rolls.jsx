import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const Rolls = () => {
  return (
    <div>
      {" "}
      <Card className="mt-10">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-8 p-6"
          style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
        >
          <Typography variant="h6" color="white">
            Supper Admin
          </Typography>
        </CardHeader>
        <CardBody className="mx-4 h-[calc(100vh_-_120px)] overflow-x-scroll px-0 pt-0 pb-2">
          <div className="flex">
            <div className="mx-4 mb-3">
              <form>
                <div className="m-3">
                  <div className="m-3">
                    <div className="scroll2">
                      {/* {rolls.map((value, index) => ( */}
                      <label>
                        <input
                          className="mx-2"
                          type="checkbox"
                          //   value={value.roul_id}
                          //   onChange={() => handleCusinesUpdate(value.roul_id)}
                          //   checked={!!rollsData[value.roul_id]}
                        />
                        ameen
                      </label>
                      {/* ))} */}
                    </div>
                  </div>

                  <hr />
                  <div className="col-md-12 text-center">
                    <button className="btn btn-primary my-3" type="submit">
                      Submit form
                    </button>
                  </div>
                </div>
              </form>
            </div>{" "}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Rolls;
