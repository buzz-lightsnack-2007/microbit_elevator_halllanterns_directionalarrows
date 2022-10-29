//  audio configuration
function playSoundEffect(name: string) {
    if (name == "beep") {
        music.playTone(466, music.beat(BeatFraction.Whole))
    }
    
}

//  directional arrow hall latern
function elevatorDirection(direction: number) {
    
    //  going up
    if (direction >= 1) {
        display_direction_arrows_frames = [images.createImage(`
                . . . . .
                            . . . . .
                            . . . . .
                            . . . . .
                            . . # . .
            `), images.createImage(`
                . . . . .
                            . . . . .
                            . . . . .
                            . . # . .
                            . # # # .
            `), images.createImage(`
                . . . . .
                            . . . . .
                            . . # . .
                            . # # # .
                            . # # # .
            `), images.createImage(`
                . . . . .
                            . . # . .
                            . # # # .
                            . # # # .
                            . # # # .
            `), images.createImage(`
                . . # . .
                            . # # # .
                            # # # # #
                            . # # # .
                            . # # # .
            `)]
    } else if (direction <= -1) {
        //  going down
        display_direction_arrows_frames = [images.createImage(`
                . . # . .
                            . . . . .
                            . . . . .
                            . . . . .
                            . . . . .
            `), images.createImage(`
                . # # # .
                            . . # . .
                            . . . . .
                            . . . . .
                            . . . . .
            `), images.createImage(`
                . # # # .
                            . # # # .
                            . . # . .
                            . . . . .
                            . . . . .
            `), images.createImage(`
                . # # # .
                            . # # # .
                            . # # # .
                            . . # . .
                            . . . . .
            `), images.createImage(`
                . # # # .
                            . # # # .
                            # # # # #
                            . # # # .
                            . . # . .
            `)]
    }
    
    for (let display_current of display_direction_arrows_frames) {
        display = display_current
        display.showImage(0)
        basic.pause(50)
    }
    while (elevator_call_direction) {
        for (let display_brightness_frame of [false, true]) {
            led.enable(display_brightness_frame)
            basic.pause(100)
        }
    }
}

//  remotely receive data about the lift
radio.onReceivedValue(function on_received_value(name2: string, value: number) {
    
    let configuration_floorNumber = 0
    if (name2 == "beep" && value == configuration_floorNumber) {
        playSoundEffect("beep")
    } else if (name2 == "dir_" + ("" + configuration_floorNumber)) {
        elevator_call_direction = value
    } else {
        
    }
    
})
let display_direction_arrows_frames : Image[] = []
let display : Image = null
let elevator_call_direction = 0
display = images.createImage(`
    . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
`)
basic.forever(function on_forever() {
    
})
