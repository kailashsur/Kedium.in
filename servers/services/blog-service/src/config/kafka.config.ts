import { Admin, Consumer, EachMessagePayload, Kafka, logLevel, Producer } from "kafkajs";

import fs from 'fs';
import path from 'path';
import logger from "../utils/logger";


class KafkaConfigClass {
    private kafka: Kafka;
    private brokers: string[];
    private admin: Admin;


    constructor() {
        const isLocal = process.env.LOCAL_KAFKA === 'true';


        this.brokers = isLocal
            ? ['localhost:9092']   // Local Kafka broker
            : [process.env.KAFKA_BROKERS ?? 'kafka-6092fe7-sopnapatrainfo-cfa2.k.aivencloud.com:22610'];  // Aiven Kafka broker

        this.kafka = new Kafka({
            clientId: 'blog-service',
            brokers: this.brokers,
            logLevel: logLevel.ERROR,
            ssl: isLocal ? false : {   // Disable SSL for local Kafka
                rejectUnauthorized: true,
                ca: [fs.readFileSync(path.join(__dirname, 'certs/ca.pem'), 'utf-8')],
                key: fs.readFileSync(path.join(__dirname, 'certs/service.key'), 'utf-8'),
                cert: fs.readFileSync(path.join(__dirname, 'certs/service.cert'), 'utf-8'),
            }
        });

        this.admin = this.kafka.admin();
    }

    /** Admin Connect to Kafka */
    async adminConnect() {
        logger.info('Admin Connecting to Kafka...');
        await this.admin.connect();
        logger.info('Admin Connected to Kafka');
    }

    /** Admin Disconnect from Kafka */
    async adminDisconnect() {
        logger.info('Admin Disconnecting from Kafka...');
        await this.admin.disconnect();
        logger.info('Admin Disconnected from Kafka');
    }

    /** Create Topic */
    async createTopic(topic: string, numPartitions = 1) {
        // Ensure the admin is connected before creating the topic
        await this.adminConnect();

        logger.info(`Creating topic: [ ${topic} ]`);
        await this.admin.createTopics({
            topics: [{ topic, numPartitions: numPartitions }],
        });
        logger.info(`Topic created: [ ${topic} ]`);

        this.adminDisconnect();
    }


    /** Create Consumer */
    async createConsumer(groupId: string, topics: string[], eachMessage: (payload: EachMessagePayload) => Promise<void>) : Promise<Consumer | undefined> {

        const consumer = this.kafka.consumer({ groupId });

        try {
            
            await consumer.connect();
            
            await consumer.subscribe({ topics, fromBeginning: true });
            

            await consumer.run({ eachMessage });

            logger.info(`Consumer [ ${groupId} ] is running...`);

            return consumer;

        } catch (error) {
            logger.error(`Error creating consumer :: ${error}`);
        }
    }


    /** Create Producer */
    async createProducer() : Promise<Producer> {
        const producer = this.kafka.producer();
        
        try {
            await producer.connect();

            return producer;
        } catch (error) {
            throw new Error(`Error creating producer :: ${error}`);
        }
    }

}






const KafkaConfig = new KafkaConfigClass();
export default KafkaConfig;
