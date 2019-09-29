import Device from '../device.js';

export default class WaterSensors extends Device {
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
                this._subscribeOnWaterDetectedChanges(device, deviceName, name);
            }
        } catch (error) {
            console.error(`[WaterSensor] subscribe error ${error}`)
        }
    }

    _subscribeOnWaterDetectedChanges(device, deviceName, name) {
        device.on('waterDetectedChanged', (action) => {
            console.log('!!!!!!water waterDetectedChanged', action, deviceName)
        })
    }
}