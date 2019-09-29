import Device from '../device.js';

export default class FireSensors extends Device {
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
            }
        } catch (error) {
            console.error(`[FireSensor] subscribe error ${error}`)
        }
    }
}