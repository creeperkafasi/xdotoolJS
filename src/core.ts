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

    return (new TextDecoder().decode(await xdotool.output())) || (new TextDecoder().decode(await xdotool.stderrOutput()))
}

export {xdotoolRun}