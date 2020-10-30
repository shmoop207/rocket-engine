import {PipelineContext} from "../../context/pipelineContext";

export interface IException {
    catch<T extends Error>(exception:T,context: PipelineContext)
}

export interface IExceptionCrt {
    new(): IException
}
