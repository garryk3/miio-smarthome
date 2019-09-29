import Device from '../device.js';

export default class Plugs extends Device {
    constructor(devices) {
        super();
        this._deviceSubscribes(devices);
    }

    _deviceSubscribes(devices) {
        try {
            for (const name of Object.keys(devices)) {
                const device = devices[name].device;
                const deviceName = devices[name].info.name;

                this._subscribeOnStateChanges(device, deviceName, name);
                this._subscribeOnPowerChanges(device, deviceName, name);
                this._subscribeOnPowerConsumedChanges(device, deviceName, name);
            }
        } catch (error) {
            console.error(`[Plugs] subscribe error ${error}`)
        }
    }

    _subscribeOnPowerChanges(device, deviceName, name) {
        device.on('power', (action) => {
            console.log('!!!!!!plugs power', action, deviceName)
        })
    }

    _subscribeOnPowerConsumedChanges(device, deviceName, name) {
        device.on('powerConsumedChanged', (action) => {
            console.log('!!!!!!plugs power capture', action, deviceName)
        })
    }
}