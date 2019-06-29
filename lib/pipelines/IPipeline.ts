export interface IMetadata {
    [index: string]: IPipelineMetadata[]
}

export interface IPipelineMetadata {

    pipeline: IPipelineFn | IPipelineCtr,
    metaData?: any
    index?: number
    options?: any

}

export type IPipelineFn = (context: IPipelineContext, next: () => Promise<any>) => void

export type IPipeLineRunner = IPipelineFn | IPipelineCtr
export type Next = () => Promise<void>

export interface IPipeline {
    run(context: IPipelineContext, next: () => Promise<any>)
}


export interface IPipelineCtr {
    new(...args: any[]): IPipeline
}

export interface IPipelineContext<T = any> {
    args: IArguments,
    instance: any,
    type: any,
    action: string
    argsTypes: any[],
    metaData?: T
    index?: number
    options?: any
}
