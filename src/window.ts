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
    returnType: "normal" | "shell" | "object" = "normal"
) {
    const rawData = await xdotoolRun(["getwindowgeometry"]
        .concat(["shell", "object"].includes(returnType) ? ["--shell"] : []).concat(window))
    if (returnType === "object") {
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
    return rawData
}

async function getWindowFocus(
    f = false
) {
    const options = []
    if (f) options.push("-f")
    return await xdotoolRun(["getwindowfocus"].concat(options))
}


export { search, selectWindow, behave, getWindowPID, getWindowName, getWindowGeometry, getWindowFocus }
