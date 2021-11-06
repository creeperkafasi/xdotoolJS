import { xdotoolRun } from "./core.ts";

/**
 * Move the mouse to the specific X and Y coordinates on the screen.
 *
 * You can move the mouse to the previous location if you specify ’restore’ instead of an X and Y coordinate. Restoring only works if you have moved previously in this same command invocation. Further, it does not work with the −−window option.
 *
 * For example, to click the top-left corner of the screen and move the mouse to the original position before you moved it, use this:
 *
 * @param window Specify a window to move relative to. Coordinates 0,0 are at the top left of the window you choose. " WINDOW STACK" references are valid here, such as %1 and %@. Though, using %@ probably doesn’t make sense.
 * @param screen Move the mouse to the specified screen to move to. This is only useful if you have multiple screens and ARE NOT using Xinerama. The default is the current screen. If you specify −−window, the −−screen flag is ignored.
 * @param clearmodifiers See https://man.cx/xdotool#heading10
 * @param polar Use polar coordinates. This makes ’x’ an angle (in degrees, 0−360, etc) and ’y’ the distance. Rotation starts at ’up’ (0 degrees) and rotates clockwise: 90 = right, 180 = down, 270 = left. The origin defaults to the center of the current screen. If you specify a −−window, then the origin is the center of that window.
 * @param sync After sending the mouse move request, wait until the mouse is actually moved. If no movement is necessary, we will not wait. This is useful for scripts that depend on actions being completed before moving on. Note: We wait until the mouse moves at all, not necessarily that it actually reaches your intended destination. Some applications lock the mouse cursor to certain regions of the screen, so waiting for any movement is better in the general case than waiting for a specific target.
 */
async function mouseMove(
    x: number,
    y: number,
    window = "",
    screen = "",
    clearmodifiers = false,
    polar = false,
    sync = false
) {

    const options = [];
    if (window)
        options.push("--window", window)
    if (screen)
        options.push("--screen", screen)
    if (polar)
        options.push("--polar")
    if (clearmodifiers)
        options.push("--clearmodifiers")
    if (sync)
        options.push("--sync")

    return await xdotoolRun(["mousemove"].concat(options).concat(["--", x.toString(), y.toString()]))
}


/**
 * Move the mouse x,y pixels relative to the current position of the mouse cursor.
 * 
 * @param clearmodifiers See https://man.cx/xdotool#heading10
 * @param polar Use polar coordinates. This makes ’x’ an angle (in degrees, 0−360, etc) and ’y’ the distance. Rotation starts at ’up’ (0 degrees) and rotates clockwise: 90 = right, 180 = down, 270 = left.
 * @param sync After sending the mouse move request, wait until the mouse is actually moved. If no movement is necessary, we will not wait. This is useful for scripts that depend on actions being completed before moving on. Note: We wait until the mouse moves at all, not necessarily that it actually reaches your intended destination. Some applications lock the mouse cursor to certain regions of the screen, so waiting for any movement is better in the general case than waiting for a specific target.
 */
async function mouseMoveRelative(
    x: number,
    y: number,
    clearmodifiers = false,
    polar = false,
    sync = false
) {

    const options = [];
    if (polar)
        options.push("--polar")
    if (clearmodifiers)
        options.push("--clearmodifiers")
    if (sync)
        options.push("--sync")

    return await xdotoolRun(["mousemove_relative"].concat(options).concat(["--", x.toString(), y.toString()]))
}

/**
 * Send a click, that is, a mousedown followed by mouseup for the given button with a short delay between the two (currently 12ms).
 * 
 * @param button Buttons generally map this way: Left mouse is 1, middle is 2, right is 3, wheel up is 4, wheel down is 5. (Defaults to 1)
 * @param clearmodifiers See https://man.cx/xdotool#heading10
 * @param repeat Specify how many times to click. Default is 1. For a double-click, use `click(1, undefined, 2)`
 * @param delay Specify how long, in milliseconds, to delay between clicks. This option is not used if the repeat flag is set to 1 (default).
 * @param window Specify a window to send a click to. Uses the current mouse position when generating the event. The default, if no window is given, depends on the window stack. If the window stack is empty the current window is typed at using XTEST. Otherwise, the default is "%1" (see " WINDOW STACK" ).
 */
async function click(
    button = 1,
    clearmodifiers = false,
    repeat: number | undefined = undefined,
    delay: number | undefined = undefined,
    window = ""
) {

    const options = [];
    if (clearmodifiers)
        options.push("--clearmodifiers")
    if (delay)
        options.push("--delay", delay.toString())
    if (repeat)
        options.push("--repeat", repeat.toString())
    if (window)
        options.push("--window", window)

    return await xdotoolRun(["click"].concat(options).concat([button.toString()]))
}


/**
 * Same as `click()`, except only a mouse down is sent.
 * 
 * @param button Buttons generally map this way: Left mouse is 1, middle is 2, right is 3, wheel up is 4, wheel down is 5. (Defaults to 1)
 * @param clearmodifiers See https://man.cx/xdotool#heading10
 * @param repeat Specify how many times to click. Default is 1. For a double-click, use click(1, undefined, 2)
 * @param delay Specify how long, in milliseconds, to delay between clicks. This option is not used if the repeat flag is set to 1 (default).
 * @param window Specify a window to send a click to. Uses the current mouse position when generating the event. The default, if no window is given, depends on the window stack. If the window stack is empty the current window is typed at using XTEST. Otherwise, the default is "%1" (see " WINDOW STACK" ).
 */
async function mouseDown(
    button = 1,
    clearmodifiers = false,
    repeat: number | undefined = undefined,
    delay: number | undefined = undefined,
    window = ""
) {

    const options = [];
    if (clearmodifiers)
        options.push("--clearmodifiers")
    if (delay)
        options.push("--delay", delay.toString())
    if (repeat)
        options.push("--repeat", repeat.toString())
    if (window)
        options.push("--window", window)

    return await xdotoolRun(["mousedown"].concat(options).concat([button.toString()]))
}


/**
 * Same as `click()`, except only a mouse up is sent.
 * 
 * @param button Buttons generally map this way: Left mouse is 1, middle is 2, right is 3, wheel up is 4, wheel down is 5. (Defaults to 1)
 * @param clearmodifiers See https://man.cx/xdotool#heading10
 * @param repeat Specify how many times to click. Default is 1. For a double-click, use click(1, undefined, 2)
 * @param delay Specify how long, in milliseconds, to delay between clicks. This option is not used if the repeat flag is set to 1 (default).
 * @param window Specify a window to send a click to. Uses the current mouse position when generating the event. The default, if no window is given, depends on the window stack. If the window stack is empty the current window is typed at using XTEST. Otherwise, the default is "%1" (see " WINDOW STACK" ).
 */
async function mouseUp(
    button = 1,
    clearmodifiers = false,
    repeat: number | undefined = undefined,
    delay: number | undefined = undefined,
    window = ""
) {

    const options = [];
    if (clearmodifiers)
        options.push("--clearmodifiers")
    if (delay)
        options.push("--delay", delay.toString())
    if (repeat)
        options.push("--repeat", repeat.toString())
    if (window)
        options.push("--window", window)

    return await xdotoolRun(["mouseUp"].concat(options).concat([button.toString()]))
}

/**
 * Returns the x, y, screen, and window id of the mouse cursor. Screen numbers will be nonzero if you have multiple monitors and are not using Xinerama.
 * 
 * @param returnType The format of the output, use `normal` for the normal command output, `shell` for an output that can be evaluated by bash or `object` if you want the output as a JS Object
 */
async function getMouseLocation(returnType: undefined | "normal" | "shell" | "object") {
    const rawLocation = await xdotoolRun(["getmouselocation"].concat(returnType === "shell" ? ["--shell"] : []))
    if (returnType === "object") {
        const splitRawLocation = rawLocation.split(" ");
        return {
            x: splitRawLocation[0].split(":")[1],
            y: splitRawLocation[1].split(":")[1],
            screen: splitRawLocation[2].split(":")[1],
            window: splitRawLocation[3].split(":")[1]
        }
    }
    return rawLocation;
}

/**
 * # ⚠️
 * ## DANGEROUS FUNCTION, READ BEFORE USING 
 * ### This function can run arbitrary shell commands, ***don't pass unfiltered user input into it*** and be careful when using
 * 
 * Bind an action to events when the mouse hits the screen edge or corner.
 * 
 * Event timeline
 * 
 * - Mouse hits an edge or corner.
 * - If delay is nonzero, the mouse must stay in this edge or corner until delay time expires.
 * - If still in the edge/corner, trigger.
 * - If quiesce is nonzero, then there is a cool−down period where the next trigger cannot occur
 * 
 * @param delay Delay in milliseconds before running the command. This allows you to require a given edge or corner to be held for a short period before your command will run. If you leave the edge or corner before the delay expires then the time will reset.
 * @param quiesce Delay in milliseconds before the next command will run. This helps prevent accidentally running your command extra times; especially useful if you have a very short −−delay (like the default of 0).
 * @param where Edge/corner that the command will be triggered upon the mouse hitting it
 * @param command The command to run on trigger. Use `exec <command>` to run any shell command
 * 
 */
async function behaveScreenEdge(
    delay: number | undefined,
    quiesce: number | undefined,
    where: "left" | "top-left" | "top" | "top-right" | "right" | "bottom-left" | "bottom" | "bottom-right",
    command: string
) {

    const options = [];
    if (delay)
        options.push("--delay", delay.toString())
    if (quiesce)
        options.push("--quiesce", quiesce.toString())

    return await xdotoolRun(["behave_screen_edge"].concat(options).concat([where]).concat(command.split(" ")))
}

export { click, mouseDown, mouseUp, mouseMove, mouseMoveRelative, getMouseLocation, behaveScreenEdge }