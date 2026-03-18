import { Composition } from "remotion";
import { KafkaIntro } from "./compositions/KafkaIntro";
import { TopicsAndPartitions } from "./compositions/TopicsAndPartitions";
import { ProducersAndConsumers } from "./compositions/ProducersAndConsumers";
import { ConsumerGroups } from "./compositions/ConsumerGroups";
import { KafkaArchitecture } from "./compositions/KafkaArchitecture";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="KafkaIntro"
        component={KafkaIntro}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="TopicsAndPartitions"
        component={TopicsAndPartitions}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ProducersAndConsumers"
        component={ProducersAndConsumers}
        durationInFrames={420}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ConsumerGroups"
        component={ConsumerGroups}
        durationInFrames={390}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="KafkaArchitecture"
        component={KafkaArchitecture}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
