export class GuardError extends Error {

    private __GuardError__ = true

    constructor(message?: string) {
        super(message || "Forbidden resource");

        Object.setPrototypeOf(this, GuardError.prototype);

    }
}
