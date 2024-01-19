export function throttle<Args extends unknown[]>(fn: (...args: Args) => void, cooldown: number) {
    let lastArgs: Args | undefined;
    const run = () => {
        if (lastArgs) {
            fn(...lastArgs);
            lastArgs = undefined;
        }
    };
    return (...args: Args) => {
        const isOnCooldown = !!lastArgs;

        lastArgs = args;

        if (isOnCooldown) {
            return;
        }

        setTimeout(run, cooldown);
    };
}
