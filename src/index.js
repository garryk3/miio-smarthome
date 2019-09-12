import MiioController from './miio/index.js';

(async function startApp() {
    const miio = new MiioController();

    await miio.init();

    const devices = miio.sortDevicesByType();
    console.log(devices)
})()