// Setup
// Background light brightness checker
// If dark, set brightness to max
input.onLightConditionChanged(LightCondition.Dark, function () {
    strip.setBrightness(255)
})

// If light, set brightness to minimum
input.onLightConditionChanged(LightCondition.Bright, function () {
    strip.setBrightness(0)
})

let strip: light.NeoPixelStrip = null

// Define strip on pin 0 and 30 pixels long
strip = light.createStrip(pins.A0, 30)

// Set light threshold 20 out of 255
input.setLightThreshold(LightCondition.Bright, 20)

// Default no color
let led_color = 0

// Main loop for checking inputs from touch pads, button, or IMU
forever(function () {
    // Set color to none if button A pressed
    if (input.buttonA.isPressed()) {
        led_color = 0
        strip.clear()
    }
    // Set color to blue if touch 5 pressed
    if (input.touchA5.wasPressed()) {
        led_color = 1
        strip.setAll(0x007fff)
    }
    // Set color to teal if touch 4 pressed
    if (input.touchA4.wasPressed()) {
        led_color = 2
        strip.setAll(0x00ffff)
    }
    // Set color to purple if touch 3 pressed
    if (input.touchA3.wasPressed()) {
        led_color = 3
        strip.setAll(0x7f00ff)
    }
    // If IMU detects negative acceleration in z-axis et to pink
    // wait 2000ms then check previous color state and return
    if (input.acceleration(Dimension.Z) < 0) {
        strip.setAll(0xff0080)
        pause(2000)
        if (led_color == 0) {
            strip.clear()
        }
        if (led_color == 1) {
            strip.setAll(0x007fff)
        }
        if (led_color == 2) {
            strip.setAll(0x00ffff)
        }
        if (led_color == 3) {
            strip.setAll(0x7f00ff)
        }
    }
})
