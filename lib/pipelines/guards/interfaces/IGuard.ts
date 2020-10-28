import {PipelineContext} from "../../context/pipelineContext";

export interface IGuard {
    isValid(context: PipelineContext): boolean | Promise<boolean>
}

export interface IGuardCrt {
    new(): IGuard
}
