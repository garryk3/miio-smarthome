import MiioController from './miio/index.js';
import MotionDevices from './devices/sensors/motion.js';
import FireDevices from './devices/sensors/fire.js';
import WaterDevices from './devices/sensors/water.js';

(async function startApp() {
    try {
        const miio = new MiioController();

        await miio.init();

        const devices = miio.sortDevicesByType();

        new MotionDevices(devices.sensors.motion);
        new FireDevices(devices.sensors.fire);
        new WaterDevices(devices.sensors.water);
    } catch(error) {
        console.error('[startApp] error', error);
    }
})()