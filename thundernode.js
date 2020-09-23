module.exports = function(RED) {
    function ThunderNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var config = {
            "086bd7fe1064" : {
             "uuid" : "086bd7fe1064",
             "enabled" : true,
             "family" : "thunderboard",
             "type" : "sense",
             "autoconnect" : true,
             "readIntervals" : {
               "environment" : {
                 "humidity" : 60000,
                 "temperature" : 60000,
                 "uv" : 60000,
                 "ambient-light":60000
               }
              },
             "services" : {
               "environment" : ["humidity","temperature","uv","ambient-light"]
            }
          }
        };

        var dataCallback = function(data) {
            console.log('Thunderboard Event',data);
            var val = data.value;
            if(data.characteristic.name === "temperature")
                val = val.C;
            var msg = {};
            msg.payload = data;
            node.send(msg);
        };         
      
        var normalizeData = true;          
        var ThunderBoard = require('thunderboard-ble');
        var tb = new ThunderBoard(config,dataCallback,normalizeData);
        this.trace("Init done");
        node.on('input', function(msg) {
            node.send(msg);
        });
    }
    RED.nodes.registerType("thundernode",ThunderNode);
}