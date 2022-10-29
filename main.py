# audio configuration
def playSoundEffect(name: str):
    if name == "beep":
        music.play_tone(466, music.beat(BeatFraction.WHOLE))

# directional arrow hall latern
def elevatorDirection(direction: number):
    global display_direction_arrows_frames, display
    # going up
    if direction >= 1:
        display_direction_arrows_frames = [images.create_image("""
                . . . . .
                            . . . . .
                            . . . . .
                            . . . . .
                            . . # . .
            """),
            images.create_image("""
                . . . . .
                            . . . . .
                            . . . . .
                            . . # . .
                            . # # # .
            """),
            images.create_image("""
                . . . . .
                            . . . . .
                            . . # . .
                            . # # # .
                            . # # # .
            """),
            images.create_image("""
                . . . . .
                            . . # . .
                            . # # # .
                            . # # # .
                            . # # # .
            """),
            images.create_image("""
                . . # . .
                            . # # # .
                            # # # # #
                            . # # # .
                            . # # # .
            """)]
    elif direction <= -1:
      # going down
        display_direction_arrows_frames = [images.create_image("""
                . . # . .
                            . . . . .
                            . . . . .
                            . . . . .
                            . . . . .
            """),
            images.create_image("""
                . # # # .
                            . . # . .
                            . . . . .
                            . . . . .
                            . . . . .
            """),
            images.create_image("""
                . # # # .
                            . # # # .
                            . . # . .
                            . . . . .
                            . . . . .
            """),
            images.create_image("""
                . # # # .
                            . # # # .
                            . # # # .
                            . . # . .
                            . . . . .
            """),
            images.create_image("""
                . # # # .
                            . # # # .
                            # # # # #
                            . # # # .
                            . . # . .
            """)]
    for display_current in display_direction_arrows_frames:
        display = display_current
        display.show_image(0)
        basic.pause(50)
    while elevator_call_direction:
        for display_brightness_frame in [False, True]:
            led.enable(display_brightness_frame)
            basic.pause(100)

# remotely receive data about the lift
def on_received_value(name2, value):
    global elevator_call_direction
    configuration_floorNumber = 0
    if name2 == "beep" and value == configuration_floorNumber:
        playSoundEffect("beep")
    elif name2 == "dir_" + str(configuration_floorNumber):
        elevator_call_direction = value
    else:
        pass
radio.on_received_value(on_received_value)

display_direction_arrows_frames: List[Image] = []
display: Image = None
elevator_call_direction = 0
display = images.create_image("""
    . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
""")

def on_forever():
    pass
basic.forever(on_forever)
