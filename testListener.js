const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline
const parser = new Readline()

const myPort = new SerialPort('/dev/cu.usbmodem14101', {
    baudRate: 9600
})
myPort.pipe(parser)
myPort.on('open', onOpen)
// myPort.on('data', onData)

function onOpen(){
    console.log('oper connection')
}
parser.on('data', (data)=> { postBPM(data) } )

function postBPM(number){
    fetch('http://localhost:3000/heartrates', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({bpm: number, user_id: 1})
    })
}