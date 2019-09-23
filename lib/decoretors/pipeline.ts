import {IMetadata, IPipelineCtr, IPipelineFn} from "../pipelines/IPipeline";
import {Reflector} from "../util/reflector";

export const PipeSymbol = "__PipeSymbol__";
export const PipeSetSymbol = "__PipeSetSymbol__";


export function pipeline(pipeline: IPipelineFn | IPipelineCtr, metaData?: any, options?: any) {

    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor | number) {
        let result: IMetadata = Reflector.getMetadata(PipeSymbol, target.constructor, undefined, {});

        if (!result[propertyKey]) {
            result[propertyKey] = [];
        }

        let index: number = NaN;

        let isParam = typeof descriptor == "number";

        if (isParam) {
            index = descriptor as number;
        }

        result[propertyKey][isParam ? "unshift" : "push"]({pipeline, metaData, options, index})
    }
}
