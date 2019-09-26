export default class Device {
    _subscribeOnStateChanges(device, deviceName, name) {
        device.on('stateChanged', (action, device) => {
            console.log('@@', action, deviceName)
        })
    }

    _subscribeOnAction(device, deviceName, name) {
        device.on('action', (action, device) => {
            console.log('@@device action', action, deviceName)
        })
    }
}