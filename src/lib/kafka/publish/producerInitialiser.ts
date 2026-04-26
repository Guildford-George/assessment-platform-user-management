import { Kafka, logLevel, Producer } from "kafkajs"
import { KafkaTopics } from "../topics"

class ProducerInitialiser {
    private producer:Producer
        constructor (){
            this.producer= this.initialise()
        }

        private async start (){
        try {
            await this.producer.connect()
        } catch (error) {
            
        }
    }

    private async shutdown(){
        try {
            await this.producer.disconnect()
        } catch (error) {
            
        }
    }

    public async sendEvent(topic: KafkaTopics, message: object){
        await this.start()
        await this.producer.send({
            topic,
            messages: [{value: JSON.stringify(message)}]
        })
        await this.shutdown()
    }

   private initialise(){
        const brokers=[process.env["KAFKA_BROKER"]] as string[]
        const kafka= new Kafka({
            brokers,
            clientId: "",
            logLevel: logLevel.INFO
        })

        return kafka.producer()
    }
}

export default new ProducerInitialiser()