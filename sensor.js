module.exports = function(RED) {

    var sense = require('ds18b20');

    function DynamicDS18B20Node(config) {
        RED.nodes.createNode(this, config);
        this.sensorid = config.sensorid;
        this.repeat = config.repeat;
        // user input is in seconds, this is conversion to miliseconds
        this.timer = config.timer * 1000;
        this.topic = config.name; 
        var node = this;

        var readSensor = function(input_msg) {
            //node.log("reading a sensor with id=" + node.sensorid);
            // TODO error handling
            sense.temperature(node.sensorid, function(err, value) {
                var topic;
                if (input_msg == null)
                      topic = node.topic;
                else{
                    if (node.topic != "")
                        topic = node.topic;
                    else
                        topic = input_msg.topic;
                }

                var msg = { ...input_msg, payload: value, topic: topic };
                node.send(msg);
            });
        }

        node.on("close", function() {
            clearInterval(this.tout);
        });

        if (node.repeat)
          node.tout = setInterval(readSensor, node.timer);

        node.on('input', function(msg){
            readSensor(msg)
            });
    }

    RED.nodes.registerType("sensor-dynamic-ds18b20", DynamicDS18B20Node);

    RED.httpAdmin.get('/sensors/1wire',function(req,res) {
        // TODO how to handle this credential thing?
        //var credentials = RED.nodes.getCredentials(req.params.id);
        //if (credentials) {
        sense.sensors(function(err, ids) {
            // TODO error handling
            res.send(JSON.stringify(ids));
        });
    });
}
