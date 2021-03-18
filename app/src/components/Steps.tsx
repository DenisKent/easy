import React from "react";
import { useQuery } from "react-query";
import MaterialTable from "material-table";
import dayjs from "dayjs";
import { getAllUserSteps } from "../api/steps";

const createColumns = (flattenedUsers: any[]) => {
  return Object.keys(flattenedUsers[0] || {}).map((key) => {
    if (key === "name") {
      return { title: key, field: key };
    } else {
      return { title: dayjs(key, "YYYY-MM-DD").format("D MMM"), field: key };
    }
  });
};

type allStepsData = {
  name: string;
  steps: {
    date: string;
    stepCount: number;
  }[];
}[];

const flattenUserData = (users: allStepsData) => {
  return users.map((user) => {
    const flattenedUser: any = { name: user.name };
    user?.steps?.forEach(({ date, stepCount }) => {
      flattenedUser[date] = stepCount;
    });
    return flattenedUser;
  });
};

const Steps: React.FC = () => {
  const { data: users = [] } = useQuery("allUserSteps", getAllUserSteps);

  const flatUsers = flattenUserData(users);
  const columns = createColumns(flatUsers);
  return (
    <section style={{ maxWidth: "100%", marginTop: "50px" }}>
      <MaterialTable columns={columns} data={flatUsers} title="Step tracker" />
    </section>
  );
};

export default Steps;
