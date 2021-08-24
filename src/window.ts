import { xdotoolRun } from "./core.ts";

async function search(
    pattern: string,
    _class = false,
    className = false,
    maxDepth: number | undefined = undefined,
    name = false,
    onlyVisible = false,
    pid: number | undefined = undefined,
    screen: number | undefined = undefined,
    desktop: number | undefined = undefined,
    limit: number | undefined = undefined,
    all = false,
    any: boolean | undefined = undefined,
    sync = false
) {
    // This is really unoptimized 🐌

    const options = [];
    if (_class) options.push("--class")
    if (className) options.push("--classname")
    if (maxDepth) options.push("--maxdepth", maxDepth.toString())
    if (name) options.push("--name")
    if (onlyVisible) options.push("--onlyvisible")
    if (pid) options.push("--pid", pid.toString())
    if (screen) options.push("--screen", screen.toString())
    if (desktop) options.push("--desktop", desktop.toString())
    if (limit) options.push("--limit", limit.toString())
    if (all) options.push("--all")
    if (any) options.push("--any")
    if (sync) options.push("--sync")

    return await xdotoolRun(["search"].concat(options).concat([pattern]))
}

async function selectWindow() {
    return await xdotoolRun(["selectwindow"])
}

async function behave(
    window: string,
    action: "mouse-enter" | "mouse-leave" | "mouse-click" | "focus" | "blur",
    command: string
) {
    return await xdotoolRun(["behave"].concat([window, action]).concat(command.split(" ")))
}

async function getWindowPID(
    window: string
) {
    return await xdotoolRun(["getwindowpid", window])
}

async function getWindowName(
    window: string
) {
    return await xdotoolRun(["getwindowname", window])
}

async function getWindowGeometry(
    window: string,
    returnType: "normal" | "shell" = "normal"
) {
    return (await xdotoolRun(["getwindowgeometry"]
        .concat(["shell", "object"].includes(returnType) ? ["--shell"] : []).concat(window)))
}



async function getWindowGeometryObject(window: string) {
    const rawData = await xdotoolRun(["getwindowgeometry"].concat(["--shell"]).concat(window))
    const splitRawData = rawData.split("\n")
    return {
        window: splitRawData[0].split("=")[1],
        x: splitRawData[1].split("=")[1],
        y: splitRawData[2].split("=")[1],
        width: splitRawData[3].split("=")[1],
        height: splitRawData[4].split("=")[1],
        screen: splitRawData[5].split("=")[1]
    }
}

async function getWindowFocus(
    f = false
) {
    const options = []
    if (f) options.push("-f")
    return await xdotoolRun(["getwindowfocus"].concat(options))
}

async function windowSize(
    window: string,
    width: number,
    height: number,
    useHints = false,
    sync = false
) {
    const options = []
    if (useHints) options.push("--usehints")
    if (sync) options.push("--sync")

    return await xdotoolRun(["windowsize"].concat(options).concat([window, width.toString(), height.toString()]))
}

async function windowMove(
    window: string,
    x: number,
    y: number,
    sync = false,
    relative = false
) {
    const options = []
    if (relative) options.push("--relative")
    if (sync) options.push("--sync")

    return await xdotoolRun(["windowmove"].concat(options).concat([window, x.toString(), y.toString()]))
}

async function windowFocus(
    window: string,
    sync = false
) {
    const options = []
    if (sync) options.push("--sync")

    return await xdotoolRun(["windowfocus"].concat(options).concat([window]))
}

async function windowMap(
    window: string,
    sync = false
) {
    const options = []
    if (sync) options.push("--sync")

    return await xdotoolRun(["windowmap"].concat(options).concat([window]))
}

async function windowMinimize(
    window: string,
    sync = false
) {
    const options = []
    if (sync) options.push("--sync")

    return await xdotoolRun(["windowminimize"].concat(options).concat([window]))
}

async function windowRaise(windowId: string) {
    return await xdotoolRun(["windowraise"].concat([windowId]))
}

async function windowReparent(destinationWindow: string, sourceWindow: string | undefined = undefined) {
    const options = []
    if (sourceWindow) options.push(sourceWindow)
    return await xdotoolRun(["windowreparent"].concat(options).concat([destinationWindow]))
}

async function windowClose(windowId: string) {
    return await xdotoolRun(["windowclose"].concat([windowId]))
}

async function windowKill(windowId: string) {
    return await xdotoolRun(["windowkill"].concat([windowId]))
}

async function windowUnmap(
    window: string,
    sync = false
) {
    const options = []
    if (sync) options.push("--sync")

    return await xdotoolRun(["windowunmap"].concat(options).concat([window]))
}

async function setWindow(
    window: string,
    options: {
        name?: string;
        iconName?: string;
        role?: string;
        classname?: string;
        class?: string;
        urgency?: "0" | "1";
        overrideRedirect?: "0" | "1";
    }
) {
    const optionList = []
    if (options.name) optionList.push("--name", options.name)
    if (options.iconName) optionList.push("--icon-name", options.iconName)
    if (options.role) optionList.push("--role", options.role)
    if (options.classname) optionList.push("--classnname", options.classname)
    if (options.class) optionList.push("--class", options.class)
    if (options.urgency) optionList.push("--urgency", options.urgency)
    if (options.overrideRedirect) optionList.push("--overrideredirect", options.overrideRedirect)

    return await xdotoolRun(["set_window"].concat(optionList).concat([window]))
}


export {
    search,
    selectWindow,
    behave,
    getWindowPID,
    getWindowName,
    getWindowGeometry,
    getWindowGeometryObject,
    getWindowFocus,
    windowSize,
    windowMove,
    windowFocus,
    windowMap,
    windowMinimize,
    windowClose,
    windowKill,
    windowRaise,
    windowReparent,
    setWindow,
    windowUnmap
}
