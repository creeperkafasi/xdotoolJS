/**
 * NOTICE: THE DOCUMENTATION PRESENT IN THIS FILE IS AN ADAPTED
 * VERSION OF THE xdotool MANUAL PAGE, ALL CREDIT GOES TO THE 
 * RESPECTIVE COPYRIGHT HOLDERS
 */


/**
 * xdotool − command−line X11 automation tool
 * 
 * xdotool lets you programmatically (or manually) simulate keyboard input and mouse activity, move and resize windows, etc. It does this using X11’s XTEST extension and other Xlib functions.
 *
 * There is some support for Extended Window Manager Hints (aka EWMH or NetWM). See the " EXTENDED WINDOW MANAGER HINTS" section for more information.
 * @param args 
 * @returns 
 */
async function xdotoolRun(args: string[] = []) {
    const xdotool = Deno.run({
        cmd: ["xdotool"].concat(args), stdout: "piped", stderr: "piped", stdin: "piped"
    })

    return (new TextDecoder().decode(await xdotool.output()))
}

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
    console.log(window == "")
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

export { xdotoolRun, key, keyDown, keyUp, type, typeUnicode }