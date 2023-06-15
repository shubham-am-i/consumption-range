import mqtt from 'mqtt';
import moment from 'moment';

const devID = 'INEM_DEMO';
const topic = `devicesIn/${devID}/data`;
let mqttClient;

function publishData() {
  /** Publish on mqtt every 5 seconds */
  let i = 2;
  const startTime = moment(); // Get the current time
  const endTime = moment().add(65, 'minutes'); // Add 65 minutes to the current time

  const interval = setInterval(() => {
    const currentTime = moment();
    if (currentTime.isAfter(endTime)) {
      clearInterval(interval);
      console.log('Finished publishing data');
      return;
    }

    const dataPacket = {
      device: devID,
      time: moment().valueOf(),
      data: [
        {
          tag: 'VOLTS1',
          value: 228.07602856051832 + i,
        },
        {
          tag: 'VOLTS2',
          value: 228.3990800794001 + i,
        },
        {
          tag: 'CUR1',
          value: 1.676028560518326 + i,
        },
        {
          tag: 'CUR2',
          value: 2.776028560518326 + i,
        },
        {
          tag: 'W1',
          value: 0.4260285605183258 + i,
        },
        {
          tag: 'W2',
          value: 0.6460285605183258 + i,
        },
        {
          tag: 'PF1',
          value: 0.8376028560518325 + i,
        },
        {
          tag: 'PF2',
          value: 0.8076028560518327 + i,
        },
        {
          tag: 'FREQ',
          value: 50.076028560518324 + i,
        },
        {
          tag: 'REACTIVE',
          value: 1.306028560518326 + i,
        },
        {
          tag: 'ACTIVE',
          value: 1.326028560518326 + i,
        },
        {
          tag: 'RSSI',
          value: 16.076028560518324 + i,
        },
      ],
    };
    mqttClient.publish(topic, JSON.stringify(dataPacket));
    console.log('Publishing ', devID, ' Energy Consumption data... ');

    i++;
  }, 5000);
}
const mqttconfig = {
  host: 'broker.emqx.io',
  port: 1883,
  qos: 2,
};
mqttconfig.clientId = 'DMFM_D2' + Date.now();
mqttClient = mqtt.connect(mqttconfig);
console.log('EnergyMeter Mqtt client connected:-', mqttClient.options.clientId);

publishData();
