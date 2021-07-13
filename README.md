# DS18B20 Sensor Node-RED node for Raspberry Pi

Node-RED node for working with [DS18B20 sensors](https://www.maximintegrated.com/en/products/analog/sensors-and-sensor-interface/DS18B20.html), inspired in this [library](https://github.com/stibi/node-red-contrib-ds18b20), but modified to behave slightly different with some extra functionalities.

![example screenshot](https://user-images.githubusercontent.com/45915404/125448195-3d739f28-7bca-4331-b991-abb52190ebee.png)

It is compatible only with RaspberryPi hardware and it only reads the temperature values from sensors. The [base library](https://www.npmjs.com/package/ds18b20) is a npm module, which handles with the whole 1-Wire protocol with DS18B20 sensors (aka it does the magic).

* NPM site: https://www.npmjs.com/package/node-red-contrib-sensor-ds18b20
* Historic downloads statistics: https://npm-stat.com/charts.html?package=node-red-contrib-sensor-ds18b20&from=2017-01-23&to=2022-01-23

### Physical Connection of sensor(s)
The DS18B20 sensors must be connected on GPIO4 (or physical pin #7) because this is the only pin that supports native 1-Wire protocol. The scheme of connection is typically the one on the image below.

![example screenshot](https://raw.githubusercontent.com/charlielito/node-red-contrib-sensor-ds18b20/master/icons/schema.png)

## Requirements

On the Linux system where your Node-RED is running and where your sensors are connected to, make sure you have loaded all the kernel modules needed for working with 1-Wire devices, what the DS1820 sensor is.
Thus, you need to active or have activated the 1-Wire Interface on the Rpi. To do this just go to the Raspi-Configuration page with:

```
sudo raspi-config
```

Go to `Interfaces` and then to `1-Wire` and `enable` it and reboot the device. You are done.


## Installation

Run the following command in the root directory of your Node-RED install

```
npm install node-red-contrib-sensor-dynamic-ds18b20
```

Or just use the `package manager`(or manage pallette) from the Node-Red Interface to search for this module and install it manually.


## Features

* Click the "Retrieve sensors" button
* This will hit the http://127.0.0.1:1880/sensors/1wire/ API provided by th eunderlying DS18B20 module
* Sensor id's will be loaded into the drop-down menu
* The sample flow writes the selected id to a global variable
* This global variabl eis written to the "msg.sensorid" property of the node-red-contrib-sensor-dynamic-ds18b20 module.
* This then reads the temp value from that sensor
* No more defining temp sensor id's in design mode, you can allocate them dynamically in the UI

![sensor id drop-down](https://user-images.githubusercontent.com/45915404/125449045-21c003ab-15e9-4248-b0be-97f0cd343537.png)
