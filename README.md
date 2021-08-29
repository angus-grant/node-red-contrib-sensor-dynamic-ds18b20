# DS18B20 Sensor Node-RED node for Raspberry Pi

Node-RED node for working with [DS18B20 sensors](https://www.maximintegrated.com/en/products/analog/sensors-and-sensor-interface/DS18B20.html), inspired in this [library](https://github.com/stibi/node-red-contrib-ds18b20), but modified to behave slightly different with dynamically reading DS18B20 sensor id's at run-time in the UI.

![example screenshot](https://user-images.githubusercontent.com/45915404/131245035-7db71763-bf86-4cd2-b8ff-d66bd73ccd6e.png)


It is compatible only with RaspberryPi hardware and it only reads the temperature values from sensors. The [base library](https://www.npmjs.com/package/ds18b20) is a npm module, which handles with the whole 1-Wire protocol with DS18B20 sensors (aka it does the magic).

* NPM site: https://www.npmjs.com/package/node-red-contrib-sensor-ds18b20
* Historic downloads statistics: https://npm-stat.com/charts.html?package=node-red-contrib-sensor-ds18b20&from=2017-01-23&to=2022-01-23

### Physical Connection of sensor(s)
The DS18B20 sensors must be connected on GPIO4 (or physical pin #7) because this is the only pin that supports native 1-Wire protocol. The scheme of connection is typically the one on the image below.

![example screenshot](https://raw.githubusercontent.com/charlielito/node-red-contrib-sensor-ds18b20/master/icons/schema.png)

## Requirements

On the Linux system where your Node-RED is running and where your sensors are connected to, make sure you have loaded all the kernel modules needed for working with 1-Wire devices, what the DS18B20 sensor is.
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

Usage is split into 2 sections:
* Assigning sensor id
  * Click the "Retrieve sensors" button
  * This will hit the http://127.0.0.1:1880/sensors/1wire/ API provided by the underlying DS18B20 module
  * Sensor id's will be loaded into the drop-down menu by assigning msg.payload from HTTP request node to drop-down menu msg.options property
  * The global.temp_sensorid variable is passed into the drop-down node as well to pre-select that option
  * once the drop-down menu selected item is changed, the selected DS18B20 id to a global variable
* Retrieving temperature
  * This global variable is written to the "msg.sensorid" property of the node-red-contrib-sensor-dynamic-ds18b20 module.
  * dynamic DS18B20 node msg.payload value is set the temperature of that probe

![sensor id drop-down](https://user-images.githubusercontent.com/45915404/125449045-21c003ab-15e9-4248-b0be-97f0cd343537.png)

## Sample flow

[{"id":"531a9bf4.bad494","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"53695c22.da6614","type":"http request","z":"531a9bf4.bad494","name":"get sensors","method":"GET","ret":"obj","paytoqs":"ignore","url":"http://127.0.0.1:1880/sensors/1wire/","tls":"","persist":false,"proxy":"","authType":"","x":400,"y":120,"wires":[["7230633d.41834c"]]},{"id":"c3f032f9.2146c","type":"ui_dropdown","z":"531a9bf4.bad494","name":"temp sensor","label":"","tooltip":"","place":"Select option","group":"10788b43.59cf15","order":4,"width":0,"height":0,"passthru":false,"multiple":false,"options":[],"payload":"","topic":"","x":760,"y":120,"wires":[["1cebd71d.7e4829"]]},{"id":"64b1d95c.229e58","type":"sensor-dynamic-ds18b20","z":"531a9bf4.bad494","name":"temp","topic":"","x":330,"y":220,"wires":[["ee57abfa.593ea8","cd85f616.a65b38"]]},{"id":"ee57abfa.593ea8","type":"ui_text","z":"531a9bf4.bad494","group":"10788b43.59cf15","order":3,"width":0,"height":0,"name":"","label":"Current temp","format":"{{msg.payload}}","layout":"row-spread","x":490,"y":220,"wires":[]},{"id":"cd85f616.a65b38","type":"debug","z":"531a9bf4.bad494","name":"DS18B20 output","active":true,"tosidebar":true,"console":true,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":510,"y":260,"wires":[]},{"id":"1cebd71d.7e4829","type":"change","z":"531a9bf4.bad494","name":"","rules":[{"t":"set","p":"temp_sensorid","pt":"global","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":990,"y":120,"wires":[[]]},{"id":"a94a9ac2.f233f8","type":"ui_button","z":"531a9bf4.bad494","name":"Retrieve sensors","group":"10788b43.59cf15","order":1,"width":0,"height":0,"passthru":false,"label":"Retrieve sensors","tooltip":"","color":"","bgcolor":"","icon":"","payload":"","payloadType":"str","topic":"","x":190,"y":120,"wires":[["53695c22.da6614"]]},{"id":"8b835913.b816e8","type":"inject","z":"531a9bf4.bad494","name":"","props":[{"p":"sensorid","v":"temp_sensorid","vt":"global"}],"repeat":"5","crontab":"","once":true,"onceDelay":0.1,"topic":"","x":160,"y":220,"wires":[["64b1d95c.229e58"]]},{"id":"ca27b8f9.6b1628","type":"inject","z":"531a9bf4.bad494","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"","payloadType":"str","x":340,"y":180,"wires":[["ee57abfa.593ea8"]]},{"id":"7230633d.41834c","type":"change","z":"531a9bf4.bad494","name":"","rules":[{"t":"set","p":"options","pt":"msg","to":"payload","tot":"msg"},{"t":"set","p":"payload","pt":"msg","to":"temp_sensorid","tot":"global"}],"action":"","property":"","from":"","to":"","reg":false,"x":580,"y":120,"wires":[["c3f032f9.2146c"]]},{"id":"10788b43.59cf15","type":"ui_group","name":"Dashboard","tab":"970798f9.ff53c8","order":1,"disp":true,"width":"6","collapse":false},{"id":"970798f9.ff53c8","type":"ui_tab","name":"Home","icon":"dashboard","disabled":false,"hidden":false}]
