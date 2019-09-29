import miio from 'miio';

import config from '../../config.json';
import deviceMap from './map.json';

export default class MiioController {
    constructor() {
        this.gateway = null;
        this.gatewayDevices = null;
    }

    async init() {
        try {
            const { devices: { gateway } } = config;

            this.gateway = await miio.device({
                address: gateway.url,
                token: gateway.token
            });
            this.gatewayDevices = this.gateway.children();
        } catch(error) {
            console.error(`[MiioController] init error: ${error}`)
        }
    }

    sortDevicesByType() {
        if (!this.gatewayDevices) {
            console.error('[MiioController] sortDevicesByType fail, device list is empty');

            return;
        }
        try {
            const groupedById = {};
        
            for (const child of this.gatewayDevices) {
                groupedById[child.id.replace('miio:', '')] = child;
            }

            return {
                plugs: this._addInfoToDevice(deviceMap.plugs, groupedById),
                switchers: this._addInfoToDevice(deviceMap.switchers, groupedById),
                buttons: this._addInfoToDevice(deviceMap.buttons, groupedById),
                sensors: {
                    motion: this._addInfoToDevice(deviceMap.sensors.motion, groupedById),
                    water: this._addInfoToDevice(deviceMap.sensors.water, groupedById),
                    fire: this._addInfoToDevice(deviceMap.sensors.fire, groupedById)
                },
                gateway: this.gateway
            }
        } catch(error) {
            console.error(error);
        }
    }

    _addInfoToDevice(devicesFromMap, miioDevices) {
        const result = {};

        Object.keys(devicesFromMap).map((key) => {
            const mapId = devicesFromMap[key].did;
            const miioDevice = miioDevices[mapId];

            if(!miioDevice) {
                return;
            }
            result[key] = {
                info: devicesFromMap[key],
                device: miioDevice
            }
        })

        return result;
    }
}