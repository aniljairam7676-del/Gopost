# Kafka Tutorials — Remotion

Animated video tutorials explaining core Apache Kafka concepts, built with [Remotion](https://www.remotion.dev/).

## Tutorials

| Composition | Duration | Description |
|---|---|---|
| `KafkaIntro` | 10s | What is Apache Kafka and why it matters |
| `TopicsAndPartitions` | 15s | How Kafka organizes data into topics and partitions |
| `ProducersAndConsumers` | 14s | The data pipeline — writing and reading messages |
| `ConsumerGroups` | 13s | Scaling consumption with load balancing |
| `KafkaArchitecture` | 16s | Brokers, replication, ZooKeeper and KRaft |

## Getting Started

```bash
cd kafka-tutorials
npm install
npm run studio
```

This opens the Remotion Studio where you can preview and edit all compositions.

## Rendering Videos

Render a single video:
```bash
npm run render -- KafkaIntro out/kafka-intro.mp4
```

Render all tutorials:
```bash
npm run render:all
```

## Project Structure

```
kafka-tutorials/
├── src/
│   ├── index.js              # Remotion entry point
│   ├── Root.jsx              # Composition registry
│   ├── components/           # Reusable animated components
│   │   ├── Title.jsx         # Animated title with subtitle
│   │   ├── AnimatedBox.jsx   # Spring-animated box container
│   │   ├── Arrow.jsx         # Animated directional arrow
│   │   └── MessageFlow.jsx   # Animated message particles
│   └── compositions/         # Tutorial video compositions
│       ├── KafkaIntro.jsx
│       ├── TopicsAndPartitions.jsx
│       ├── ProducersAndConsumers.jsx
│       ├── ConsumerGroups.jsx
│       └── KafkaArchitecture.jsx
├── remotion.config.js
└── package.json
```

## Tech Stack

- **Remotion** — React-based programmatic video creation
- **React** — UI component framework
- All animations use Remotion's `spring()` and `interpolate()` for smooth motion
