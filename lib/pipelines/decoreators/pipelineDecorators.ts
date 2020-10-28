import {IMetadata, IPipelineCtr, IPipelineFn, IPipelineMetadata} from "../interfaces/IPipeline";
import {Reflector} from "@appolo/utils";
import {Classes} from "@appolo/utils";
import {ValidatePipeLine} from "../../../test/mock/config/modules/validate/src/validate";
import {IGuardCrt} from "../guards/interfaces/IGuard";
import {guardPipeline} from "../guards/pipeline/guardPipeline";

export const PipeSymbol = "__PipeSymbol__";
export const PipeSetSymbol = "__PipeSetSymbol__";

export const PipeKlassRegisterSymbol = "__PipeKlassRegisterSymbol__";
export const PipeInstanceCreateSymbol = "__PipeInstanceCreateSymbol__";


export function pipeline(pipelineFn: IPipelineFn | IPipelineCtr, metaData?: any, options?: any) {

    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor | number) {
        let result: IMetadata = Reflector.getMetadata(PipeSymbol, target.constructor, undefined, {});

        if (!propertyKey) {
            let fnNames = Classes.getClassMethodsName(target);

            fnNames.forEach(fnName => !fnName.startsWith("_") && pipeline(pipelineFn, metaData, options)(target.prototype, fnName));

            return;
        }

        if (!result[propertyKey]) {
            result[propertyKey] = [];
        }

        let index: number = NaN;

        let isParam = typeof descriptor == "number";

        if (isParam) {
            index = descriptor as number;
        }

        result[propertyKey][isParam ? "unshift" : "push"]({pipeline: pipelineFn, metaData, options, index})
    }
}

export function pipelineType(pipeline: IPipelineFn | IPipelineCtr, metaData?: any, options?: any) {

    return function (target: any) {
        let result: IPipelineMetadata[] = Reflector.getFnMetadata(PipeKlassRegisterSymbol, target, []);
        result.push({
            pipeline,
            metaData,
            options,
        })
    }
}

export function pipelineInstance(pipeline: IPipelineFn | IPipelineCtr, metaData?: any, options?: any) {

    return function (target: any) {
        let result: IPipelineMetadata[] = Reflector.getFnMetadata(PipeInstanceCreateSymbol, target, []);
        result.push({
            pipeline,
            metaData,
            options,
        })
    }
}

export function pipelineDecorator(pipelineFn: IPipelineFn | IPipelineCtr, metaData?: any, options?: any) {
    return function (fn: any, propertyName?: string, index?: number | PropertyDescriptor) {
        pipeline(pipelineFn, metaData, options)(fn, propertyName, index)
    }
}


