import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Progress,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({
  color,
  icon,
  title,
  value,
  footer,
  completion,
}) {
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color={color}
        className="absolute -mt-4 grid h-16 w-16 place-items-center rounded-xl"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value}
        </Typography>
      </CardBody>

      <CardFooter className="border-t border-blue-gray-50 p-4">
        <div className="w-10/12">
          <Typography
            variant="small"
            className="mb-1 block text-xs font-medium text-blue-gray-600"
          >
            {completion ? completion : 0}%
          </Typography>
          <Progress
            value={completion ? completion : 0}
            variant="gradient"
            color={completion === 100 ? "green" : "blue"}
            className="h-1"
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export function StatisticsCards({
  color,
  icon,
  title,
  value,
  footer,
  completion,
}) {
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color={color}
        className="absolute mt-3 grid h-14 w-14 place-items-center"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value ? value : 0}
        </Typography>
      </CardBody>

      <CardFooter className="border-t border-blue-gray-50 p-4">
        <div className="w-10/12">
          <Typography
            variant="small"
            className="mb-1 block text-xs font-medium text-blue-gray-600"
          >
            {completion ? completion : 0}%
          </Typography>
          <Progress
            value={completion ? completion : 0}
            variant="gradient"
            color={completion === 100 ? "green" : "blue"}
            className="h-1"
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export function StatisticsCards1({
  color,
  icon,
  title,
  value,
  footer,
  completion,
}) {
  return (
    <Card>
      <CardHeader
        variant="gradient"
        color={color}
        className="absolute mt-3 grid h-14 w-14 place-items-center"
      >
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-sm text-blue-gray-600">
          {title}
        </Typography>
        <Typography color="blue-gray" className="text-xl font-bold">
          {value ? value : 0}
        </Typography>
      </CardBody>
      {completion ? (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          <div className="">
            <Typography
              variant="small"
              className="mb-1 block text-xs font-medium text-blue-gray-600"
            >
              {completion ? completion : 0}%
            </Typography>
            <Progress
              value={completion ? completion : 0}
              variant="gradient"
              color={completion === 100 ? "green" : "blue"}
              className="h-1"
            />
          </div>
        </CardFooter>
      ) : (
        ""
      )}
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
