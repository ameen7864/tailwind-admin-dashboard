import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import bkgrd from "./background.png";

export function SignIn() {
  return (
    <>
      <img
        src={bkgrd}
        className="animaioneffect absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[30rem] -translate-y-2/4 -translate-x-2/4 ">
          <CardHeader
            variant="gradient"
            color="blue"
            style={{ background: " linear-gradient(195deg, #7537be, #31206d)" }}
            className="mb-4 grid h-32  place-items-center "
          >
            <Typography variant="h3" color="white">
              Welcome To Requeue
            </Typography>
          </CardHeader>
          <form>
            <CardBody className="flex flex-col gap-6">
              <Input
                type="email"
                label="Email"
                size="lg"
                className="border border-purple-700"
              />
              <Input type="password" label="Password" size="lg" />
              <div className="ml-2.5">
                {/* <Checkbox label="Remember Me" /> */}
              </div>
            </CardBody>
            <CardFooter className="my-3 pt-0">
              <Button
                variant="gradient"
                fullWidth
                style={{
                  background: " linear-gradient(195deg, #7537be, #31206d)",
                }}
              >
                Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
