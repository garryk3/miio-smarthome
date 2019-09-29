import MiioController from './miio/index.js';

import MotionDevices from './devices/sensors/motion.js';
import FireDevices from './devices/sensors/fire.js';
import WaterDevices from './devices/sensors/water.js';

import Plugs from './devices/plugs/index.js';
import WallSwitches from './devices/wall-switches/index.js';

(async function startApp() {
    try {
        const miio = new MiioController();

        await miio.init();

        const devices = miio.sortDevicesByType();

        new MotionDevices(devices.sensors.motion);
        new FireDevices(devices.sensors.fire);
        new WaterDevices(devices.sensors.water);
        new Plugs(devices.plugs);
        new WallSwitches(devices.switchers);
    } catch(error) {
        console.error('[startApp] error', error);
    }
})()