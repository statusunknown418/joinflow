"use client";

import {
  BadgeDelta,
  Card,
  DeltaType,
  Flex,
  Grid,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";

type Kpi = {
  title: string;
  metric: string;
  progress: number;
  target: string;
  delta: string;
  deltaType: DeltaType;
};

const kpiData: Kpi[] = [
  {
    title: "New hires",
    metric: "5",
    progress: 50,
    target: "10",
    delta: "200%",
    deltaType: "increase",
  },
  {
    title: "Profit",
    metric: "$ 45,564",
    progress: 36.5,
    target: "$ 125,000",
    delta: "23.9%",
    deltaType: "increase",
  },
  {
    title: "Customers",
    metric: "1,072",
    progress: 53.6,
    target: "2,000",
    delta: "10.1%",
    deltaType: "moderateDecrease",
  },
];

export const KpiCardGrid = () => {
  return (
    <Grid numItemsLg={4} className="mt-6 gap-6">
      {kpiData.map((item) => (
        <Card key={item.title}>
          <Flex alignItems="start">
            <div className="truncate">
              <Text>{item.title}</Text>
              <Metric className="truncate">{item.metric}</Metric>
            </div>
            <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
          </Flex>
          <Flex className="mt-4 space-x-2">
            <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
            <Text>{item.target}</Text>
          </Flex>
          <ProgressBar value={item.progress} className="mt-2" />
        </Card>
      ))}
    </Grid>
  );
};
