/**
 * NOTICE: THE DOCUMENTATION PRESENT IN THIS FILE IS AN ADAPTED
 * VERSION OF THE xdotool MANUAL PAGE, ALL CREDIT GOES TO THE 
 * RESPECTIVE COPYRIGHT HOLDERS
 */

import {xdotoolRun} from './core.ts'

/**
 * Type a given keystroke. Examples being "alt+r", "Control_L+J", "ctrl+alt+n", "BackSpace".
 *
 * Generally, any valid X Keysym string will work. Multiple keys are separated by ’+’. Aliases exist for "alt", "ctrl", "shift", "super", and "meta" which all map to Foo_L, such as Alt_L and Control_L, etc.
 *
 * In cases where your keyboard doesn’t actually have the key you want to type, xdotool will automatically find an unused keycode and use that to type the key.
 *
 * Example: Send the keystroke "F2"
 * ```key("F2")```
 *
 * Example: Send ’a’ with an accent over it (not on English keyboards, but still works with xdotool)
 * ```key("Aacute")```
 * 
 * @param key keystroke
 * @param window Send keystrokes to a specific window id. See " SENDEVENT NOTES" below. The default, if no window is given, depends on the window stack. If the window stack is empty the current window is typed at using XTEST. Otherwise, the default is "%1" (see " WINDOW STACK" ).
 * @param delay Delay between keystrokes. Default is 12ms.
 * @param clearmodifiers Clear modifiers before sending keystrokes. See CLEARMODIFIERS below.
 */
async function key(
    key: string,
    window = "",
    delay: number | undefined = undefined,
    clearmodifiers = false) {
    return await xdotoolRun(["key",
        window ? "--window" : "", window ? window : "",
        delay ? "--delay" : "", delay ? delay.toString() : "",
        clearmodifiers ? "--clearmodifiers" : "",
        key])
}

/**
 * Same as `key()`, except only keydown (press) events are sent.
 * 
 * @param key keystroke
 * @param window Send keystrokes to a specific window id. See " SENDEVENT NOTES" below. The default, if no window is given, depends on the window stack. If the window stack is empty the current window is typed at using XTEST. Otherwise, the default is "%1" (see " WINDOW STACK" ).
 * @param delay Delay between keystrokes. Default is 12ms.
 * @param clearmodifiers Clear modifiers before sending keystrokes. See CLEARMODIFIERS below.
 */
async function keyDown(
    key: string,
    window = "",
    delay: number | undefined = undefined,
    clearmodifiers = false) {
    return await xdotoolRun(["keydown",
        window ? "--window" : "", window ? window : "",
        delay ? "--delay" : "", delay ? delay.toString() : "",
        clearmodifiers ? "--clearmodifiers" : "",
        key])
}

/**
 * Same as `key()`, except only keyup (release) events are sent.
 * 
 * @param key keystroke
 * @param window Send keystrokes to a specific window id. See " SENDEVENT NOTES" below. The default, if no window is given, depends on the window stack. If the window stack is empty the current window is typed at using XTEST. Otherwise, the default is "%1" (see " WINDOW STACK" ).
 * @param delay Delay between keystrokes. Default is 12ms.
 * @param clearmodifiers Clear modifiers before sending keystrokes. See CLEARMODIFIERS below.
 */
async function keyUp(
    key: string,
    window = "",
    delay: number | undefined = undefined,
    clearmodifiers = false) {
    return await xdotoolRun(["keyup",
        window ? "--window" : "", window ? window : "",
        delay ? "--delay" : "", delay ? delay.toString() : "",
        clearmodifiers ? "--clearmodifiers" : "",
        key])
}

/**
 * Types as if you had typed it. Supports newlines and tabs ( ASCII newline and tab). Each keystroke is separated by a delay given by the −−delay option.
 * 
 * With respect to " COMMAND CHAINING" , this command consumes the remainder of the arguments and types them. That is, no commands can chain after ’type’.
 * 
 * Example: to type ’Hello world!’ you would do:
 * ```type('Hello world!')```
 * 
 * @param text something to type
 * @param window Send keystrokes to a specific window id. See " SENDEVENT NOTES" below. The default, if no window is given, depends on the window stack. If the window stack is empty the current window is typed at using XTEST. Otherwise, the default is "%1" (see " WINDOW STACK" ).
 * @param delay Delay between keystrokes. Default is 12ms.
 * @param clearmodifiers Clear modifiers before sending keystrokes. See CLEARMODIFIERS below.
 */
async function type(
    text: string,
    window = "",
    delay: number | undefined = undefined,
    clearmodifiers = false
) {
    return await xdotoolRun(["type",
        window ? "--window" : "", window ? window : "",
        delay ? "--delay" : "", delay ? delay.toString() : "",
        clearmodifiers ? "--clearmodifiers" : "",
        text])
}



/**
 * Custom evil hacky workaround function that allows xdotool to type any character no matter the installed keyboard layout
 * 
 * Otherwise same as `type()`
 * 
 * https://github.com/jordansissel/xdotool/issues/150#issuecomment-284409367
 */
async function typeUnicode(
    text: string,
    window = "",
    delay: number | undefined = undefined,
    clearmodifiers = false) {
    await key(" ")
    await key("BackSpace")
    await type(text, window, delay, clearmodifiers)
}

export { key, keyDown, keyUp, type, typeUnicode }