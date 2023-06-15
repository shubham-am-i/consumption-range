import mqtt from 'mqtt'
import Influx from 'influx'
import colors from 'colors'

// configurations
const protocol = 'mqtt'
const host = 'broker.emqx.io'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

// assignment exports
export const connectUrl = `${protocol}://${host}:${port}`

// creating subscriber instance
const client_Subscriber = mqtt.connect(connectUrl, {
  clientId,
})
const devID = 'INEM_DEMO'
const topic = `devicesIn/${devID}/data`
client_Subscriber.on('connect', () => {
  console.log('Subscriber connected')

  // Subscribe to Shared Topic Pattern
  client_Subscriber.subscribe(topic, { qos: 2 }, (error) => {
    if (error) {
      console.error('Subscription failed', error)
    } else {
      console.log('Subscriber subscribed to topic:'.yellow + topic)
    }
  })
})

// Connect to the InfluxDB server
const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'consumption_range',
})
console.log('Influx DB Connected'.cyan.bold)

// Subscriber 1: Handle Received Messages
client_Subscriber.on('message', (topic, message) => {
  console.log('Subscriber received new consumption reading:'.green)

  const { data, device, time } = JSON.parse(message.toString())

  async function writePoints(data, device, time) {
    let point = {
      measurement: device,
      tags: { sensor: data.tag },
      fields: { value: data.value },
      timestamp: time ? time : Date.now(),
    }

    // console.log(point)
    try {
      await influx.writePoints([point])
      console.log('successfully inserted Consumption reading into Influx DB')
    } catch (error) {
      console.error('Error writing data points:', error)
    }
  }

  writePoints(data, device, time)
})
