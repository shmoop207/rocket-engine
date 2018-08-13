import _ = require('lodash');
import {DebounceSettings, ThrottleSettings} from "lodash";

export function debounce(milliseconds: number = 0, options?: DebounceSettings) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = _.debounce(originalMethod, milliseconds, options);
        return descriptor;
    }
}