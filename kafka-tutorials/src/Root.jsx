import { Composition } from "remotion";
import { KafkaIntro } from "./compositions/KafkaIntro";
import { TopicsAndPartitions } from "./compositions/TopicsAndPartitions";
import { ProducersAndConsumers } from "./compositions/ProducersAndConsumers";
import { ConsumerGroups } from "./compositions/ConsumerGroups";
import { KafkaArchitecture } from "./compositions/KafkaArchitecture";
import { SpringBatchIntro } from "./compositions/SpringBatchIntro";
import { JobAndSteps } from "./compositions/JobAndSteps";
import { ChunkProcessing } from "./compositions/ChunkProcessing";
import { ErrorHandling } from "./compositions/ErrorHandling";
import { SpringBatchArchitecture } from "./compositions/SpringBatchArchitecture";
import { SpringBatchIntroWays } from "./compositions/SpringBatchIntroWays";
import { JobAndStepsWays } from "./compositions/JobAndStepsWays";
import { ChunkProcessingWays } from "./compositions/ChunkProcessingWays";
import { ErrorHandlingWays } from "./compositions/ErrorHandlingWays";
import { ScalingWays } from "./compositions/ScalingWays";
import { InterfacesAndDSA } from "./compositions/InterfacesAndDSA";
import { FailureScenarios } from "./compositions/FailureScenarios";
import { RedisCacheSpringBatch } from "./compositions/RedisCacheSpringBatch";
import { RedisInternals } from "./compositions/RedisInternals";

export const RemotionRoot = () => {
  return (
    <>
      {/* Kafka Tutorials */}
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

      {/* Spring Batch Tutorials — "The Gym of Data Processing" */}
      <Composition
        id="SpringBatchIntro"
        component={SpringBatchIntro}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="JobAndSteps"
        component={JobAndSteps}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ChunkProcessing"
        component={ChunkProcessing}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ErrorHandling"
        component={ErrorHandling}
        durationInFrames={420}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SpringBatchArchitecture"
        component={SpringBatchArchitecture}
        durationInFrames={480}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Spring Batch — "Ways to Implement" Deep Dives */}
      <Composition
        id="SpringBatchIntroWays"
        component={SpringBatchIntroWays}
        durationInFrames={550}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="JobAndStepsWays"
        component={JobAndStepsWays}
        durationInFrames={580}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ChunkProcessingWays"
        component={ChunkProcessingWays}
        durationInFrames={540}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ErrorHandlingWays"
        component={ErrorHandlingWays}
        durationInFrames={580}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ScalingWays"
        component={ScalingWays}
        durationInFrames={650}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Spring Batch — Interfaces & DSA Deep Dive */}
      <Composition
        id="InterfacesAndDSA"
        component={InterfacesAndDSA}
        durationInFrames={970}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Spring Batch — Failure Scenarios Story */}
      <Composition
        id="FailureScenarios"
        component={FailureScenarios}
        durationInFrames={2090}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Spring Batch — Redis Cache Integration Story */}
      <Composition
        id="RedisCacheSpringBatch"
        component={RedisCacheSpringBatch}
        durationInFrames={2110}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Redis Internals — The Kingdom of Redis Story */}
      <Composition
        id="RedisInternals"
        component={RedisInternals}
        durationInFrames={2950}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
