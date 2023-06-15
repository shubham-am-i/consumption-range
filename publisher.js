import mqtt from 'mqtt'
import moment from 'moment'

const devID = 'INEM_DEMO'
const topic = `devicesIn/${devID}/data`
let mqttClient

function publishData() {
  /** Publish on mqtt every second */
  let value = 10,
    i = 2
  const interval = setInterval(() => {
    const dataPacket = {
      device: devID,
      time: Date.now(),
      data: {
        tag: 'meterReading',
        value,
      },
    }
    mqttClient.publish(topic, JSON.stringify(dataPacket))
    console.log('Publishing ', devID, ' Energy Consumption: ' + value)

    value += i
    i++
  }, 1000)
}
const mqttconfig = {
  host: 'broker.emqx.io',
  port: 1883,
  qos: 2,
}
mqttconfig.clientId = 'DMFM_D2' + Date.now()
mqttClient = mqtt.connect(mqttconfig)
console.log('EnergyMeter Mqtt client connected:-', mqttClient.options.clientId)

publishData()
