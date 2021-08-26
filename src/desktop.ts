import { xdotoolRun } from "./core.ts";

async function windowActivate(
    window: string,
    sync = false
) {
    const options = []
    if (sync) options.push("--sync")

    return await xdotoolRun(["windowactivate"].concat(options).concat([window]))
}

async function getActiveWindow() {
    return await xdotoolRun(["getactivewindow"])
}

async function setNumDesktops(num: number) {
    return await xdotoolRun(["set_num_desktops"].concat([num.toString()]))
}

async function getNumDesktops() {
    return Number.parseInt(await xdotoolRun(["get_num_desktops"]), 10)
}

async function getDesktopViewport(
    shell = false
) {
    const options = []
    if (shell) options.push("--shell")
    return await xdotoolRun(["get_desktop_viewport"].concat(options))
}

async function setDesktopViewport(x: number, y: number) {
    return await xdotoolRun(["set_desktop_viewport"].concat([x.toString(), y.toString()]))
}

async function setDesktop(desktopNumber: number, relative = false) {
    const options = []
    if (relative) options.push("--relative")
    return await xdotoolRun(["set_desktop"].concat(options).concat(["--",desktopNumber.toString()]))
}

async function getDesktop() {
    return Number.parseInt(await xdotoolRun(["get_desktop"]), 10)
}

async function setDesktopForWindow(
    desktopNumber: number,
    window: string | undefined = undefined
) {
    const options = []
    if (window) options.push(window)
    return await xdotoolRun(["set_desktop_for_window"].concat(options).concat([desktopNumber.toString()]))
}

async function getDesktopForWindow(window: string | undefined = undefined) {
    const options = []
    if (window) options.push(window)
    return Number.parseInt(await xdotoolRun(["get_desktop_for_window"].concat(options)), 10)
}


export {
    windowActivate,
    getActiveWindow,
    setNumDesktops,
    getNumDesktops,
    getDesktopViewport,
    setDesktopViewport,
    setDesktop,
    getDesktop,
    getDesktopForWindow,
    setDesktopForWindow
}