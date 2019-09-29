import Device from '../device.js';

export default class WallSwitches extends Device {
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
                this._subscribeOnAction(device, deviceName, name);
            }
        } catch (error) {
            console.error(`[WallSwitches] subscribe error ${error}`)
        }
    }

    _subscribeOnPowerChanges(device, deviceName, name) {
        device.on('power', (action) => {
            console.log('!!!!!!wall-switch', action, deviceName)
        })
    }
}