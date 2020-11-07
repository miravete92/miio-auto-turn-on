const miio = require('miio');

// Resolve a device, resolving the token automatically or from storage
miio.device({ address: '192.168.1.149', token: 'f55d89875db0a7d410d34a0c559e4a54' })
  .then(device => doSomething(device))
  .catch(err => console.log('Connected to', err));


function doSomething(device) {
    console.log('Connected to', device)
    if(device.matches('type:miio:gateway')) {
        console.log('Device is GW');
        const children = device.children();

        const plug = getPowerPlug(children);
        console.log('Plug ', plug);
        
        turnOn(plug);
        setTimeout(y => {
            turnOff(plug);
        },92000);

        setInterval(x => {
            turnOn(plug);
            setTimeout(y => {
                turnOff(plug);
            },92000);
        },97000);
      }
}

function getPowerPlug(childrenDevices) {
    for(const child of childrenDevices) {
        if(child.matches('type:power-plug'))
        return child;
    }
    return null;
}

function turnOn(plug) {
    plug.setPower(true)
    .then(res => {
        console.log("Result", res);
    })
    .catch(err => {
        console.error("Result", err);
    });
}

function turnOff(plug) {
    plug.setPower(false)
    .then(res => {
        console.log("Result", res);
    })
    .catch(err => {
        console.error("Result", err);
    });
}