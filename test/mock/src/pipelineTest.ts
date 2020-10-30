import {
    exception,
    guard,
    IException,
    IGuard,
    IInterceptor,
    intercept,
    IPipe,
    pipe,
    pipelineDecorator
} from "../../../index";
import {IPipelineContext} from "../../../lib/pipelines/interfaces/IPipeline";
import {PipelineContext} from "../../../lib/pipelines/context/pipelineContext";
import {define, singleton, inject, init} from '@appolo/inject';
import {Promises} from '@appolo/utils';
import {guardPipeline} from "../../../lib/pipelines/guards/pipeline/guardPipeline";

@define()
export class PipelineTest {

    async run(context: PipelineContext, next) {
        context.getArgumentAt(0).push(2);
        return next()
    }
}

@define()
export class PipelineTest2 {

    async run(context: PipelineContext, next) {
        context.getArgumentAt(0).push(3);
        return next()
    }
}


@define()
export class PipelineTestOnCreate {

    async run(context: PipelineContext, next) {

        context.instance["onCreateTest"] = true;

        return next()
    }
}


@define()
export class GuardTest implements IGuard {

    isValid(context: PipelineContext): boolean | Promise<boolean> {
        let sum = 0;
        context.values.forEach(item => sum = sum + item.value);

        return sum < context.metaData.max
    }
}

export function guardSum(max: number) {

    return guard(GuardTest, {max});
}

@define()
export class InterceptorTimeout implements IInterceptor {

    public intercept(context: PipelineContext, next: () => Promise<any>) {
        return Promises.timeout(next(), context.metaData.timeout)
    }
}

export function interceptorTimeout(timeout: number) {

    return intercept(InterceptorTimeout, {timeout});
}

@define()
export class InterceptorMultiValue implements IInterceptor {

    public async intercept(context: PipelineContext, next: () => Promise<any>) {
        let result = await next();

        return result * context.metaData.multi;
    }
}

export function interceptorMultiValue(multi: number) {

    return intercept(InterceptorMultiValue, {multi});
}


@define()
export class PipeMultiValue implements IPipe {

    public async transform(value: any, context: PipelineContext<{ multi: number }>): Promise<any> {

        return value * context.metaData.multi;
    }
}

export function pipeMultiValue(multi: number) {

    return pipe(PipeMultiValue, {multi});
}

@define()
export class ExceptionPipeLine implements IException {

    public async catch(e: Error, context: PipelineContext): Promise<any> {

        return {
            statusCode: 500,
            timestamp: new Date().toISOString(),
            message: e.message
        }
    }
}

export function catchError() {

    return exception(ExceptionPipeLine, {});
}
