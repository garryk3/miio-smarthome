export default class Device {
    _subscribeOnStateChanges(device, deviceName, name) {
        device.on('stateChanged', (action, device) => {
            console.log('@@', action, deviceName)
        })
    }
}