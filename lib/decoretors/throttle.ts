import _ = require('lodash');
import { ThrottleSettings} from "lodash";

export function throttle(milliseconds: number = 0, options?: ThrottleSettings) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = _.throttle(originalMethod, milliseconds, options);
        return descriptor;
    }
}