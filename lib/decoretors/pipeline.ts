import {IMetadata, IPipelineCtr, IPipelineFn} from "../pipelines/IPipeline";
import {Util} from "../util/util";

export const PipeSymbol = Symbol("__PipeSymbol__");
export const PipeSetSymbol = Symbol("__PipeSetSymbol__");


export function pipeline(pipeline: IPipelineFn | IPipelineCtr, metaData?: any, options?: any) {

        return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor | number) {
        let result = Util.getReflectData<IMetadata>(PipeSymbol, target.constructor, {});

        if (!result[propertyKey]) {
            result[propertyKey] = [];
        }

        let index = -1;

        if (typeof descriptor == "number") {
            index = descriptor;
        }

        result[propertyKey].push({pipeline, metaData, options, index})
    }
}
