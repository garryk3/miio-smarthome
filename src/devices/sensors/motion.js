import Device from '../device.js';

export default class MotionSensors extends Device {
    constructor(devices) {
        super();
        this._deviceSubscribes(devices);
    }

    _deviceSubscribes(devices) {
        try {
            for (const name of Object.keys(devices)) {
                const device = devices[name].device;
                const deviceName = devices[name].info.name;

                this._subscribeOnMotionChanges(device, deviceName, name);
            }
        } catch (error) {
            console.error(`[MotionSensor] subscribe error ${error}`)
        }
    }

    _subscribeOnMotionChanges(device, deviceName, name) {
        device.on('motionChanged', (action) => {
            console.log('!!!!!!1', action, deviceName)
        })
    }
}