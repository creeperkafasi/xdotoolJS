import { xdotoolRun } from "./core.ts";


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

    return await xdotoolRun(["mousemove"].concat(options).concat([x.toString(), y.toString()]))
}

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

    return await xdotoolRun(["mousemove_relative"].concat(options).concat([x.toString(), y.toString()]))
}

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

async function getMouseLocation(returnType: undefined | "normal" | "shell" | "object") {
    const rawLocation = await xdotoolRun(["getmouselocation"].concat(returnType === "shell" ? ["--shell"] : []))
    if (returnType === "object") {
        const splitRawLocation = rawLocation.split(" ");
        console.log(splitRawLocation)
        return {
            x: splitRawLocation[0].split(":")[1],
            y: splitRawLocation[1].split(":")[1],
            screen: splitRawLocation[2].split(":")[1],
            window: splitRawLocation[3].split(":")[1]
        }
    }
    return rawLocation;
}

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