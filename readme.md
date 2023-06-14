# Consumption Range

click up task: [here](https://app.clickup.com/t/85zt9qm22)

## Task

Write a dummy script to post data on a specific Topic for about 1 hour using MQTT and write that data to influxDB. Then write a function that will accept a startTime,endTime, measurement name, and sensor Name. and it will find the consumption between that time range.

## Thoughts

Setup MQTT and InfluxDB:

1. Set up an MQTT client that can publish data to a specific topic.
2. Configure the connection to the InfluxDB database to store the received data.

Generate Dummy Data:

1. Create a loop that runs atleast 60 times per second, publishing data packets to the specified MQTT topic.
2. Define a starting value for the meter reading.
   Increment the meter reading value in each packet, following an ever-increasing trend.

Subscribe and Store Data in InfluxDB:

1. Create a separate MQTT client that subscribes to the same topic as the data publisher.
2. Implement a message callback function that receives the published data packets.
3. Parse the received data packets and write them to the InfluxDB database using the provided measurement name.

Calculate Consumption:

1. Create a function that accepts the startTime, endTime, measurement name, and sensor name as parameters.
2. Query the InfluxDB database to retrieve the meter reading values just before the startTime and endTime.
3. Calculate the consumption by subtracting the meter reading value just before the startTime from the value just before the endTime.
4. Display the calculated consumption.

## GitHub repo

- [consumption range](https://github.com/shubham-am-i/consumption-range)
