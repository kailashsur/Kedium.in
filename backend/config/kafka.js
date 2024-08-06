import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"], // Replace with your Kafka broker addresses
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "like-group" });

export const connectKafka = async () => {
  await producer.connect();
  await consumer.connect();
};
