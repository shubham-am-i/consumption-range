import Influx from 'influx';
import moment from 'moment';
import colors from 'colors';
// Connect to the InfluxDB server
const influx = new Influx.InfluxDB({
  host: 'localhost',
  database: 'consumption_range',
});

async function calculateConsumption(startTime, endTime, measurementName, sensorName) {
  const query = `
    SELECT LAST("value") AS endValue, FIRST("value") AS startValue
    FROM ${measurementName}
    WHERE "sensor"='${sensorName}'
      AND time >= ${startTime}
      AND time <= ${endTime}
  `;
  try {
    const result = await influx.query(query);
    const endValue = result[0].endValue;
    const startValue = result[0].startValue;

    console.log(`EndValue: ${endValue} |  StartValue: ${startValue}`.blue);

    const consumption = endValue - startValue;
    console.log(`Consumption for ${sensorName} is : ${consumption.toFixed(2)} units`.bgCyan);
  } catch (error) {
    console.error('Error calculating consumption:', error.message);
  }
}
// Get the current date
const currentDate = moment().format('YYYY-MM-DD');

// const startTime = 1686799304189;
// const endTime = 1686803787858;

const startTime = moment('2023-06-15 09:05:00').valueOf();
const endTime = moment('2023-06-15 09:34:00').valueOf();
const measurementName = 'INEM_DEMO';
const sensorName = 'W1';

calculateConsumption(startTime, endTime, measurementName, sensorName);
