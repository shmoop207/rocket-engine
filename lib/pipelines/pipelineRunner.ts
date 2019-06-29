import {IPipelineContext, IPipelineFn, IPipelineMetadata} from "./IPipeline";

export function runPipes(pipes: IPipelineMetadata[]) {

    return function (context: IPipelineContext, next?) {

        let params = {index: -1, pipes, context, next};

        return run(0, params);

    }
}

function run(i: number, params: { index: number, pipes: IPipelineMetadata[], context: IPipelineContext, next: () => Promise<any> }) {

    if (i <= params.index) {
        return Promise.reject(new Error('next() already called'));
    }

    let pipe = params.pipes[i];

    if (!pipe || !pipe.pipeline) {
        return Promise.resolve();
    }

    params.index = i;

    let fn = pipe.pipeline;

    if (i === params.pipes.length) {
        fn = params.next;
    }

    if (!fn) {
        return Promise.resolve();
    }

    try {
        let next = run.bind(null, i + 1, params);

        let context = Object.assign({index: pipe.index, metaData: pipe.metaData || {}, options: pipe.options || {}},params.context)

        let result = (fn as IPipelineFn)(context, next);

        return Promise.resolve(result);

    } catch (err) {

        return Promise.reject(err)
    }
}
