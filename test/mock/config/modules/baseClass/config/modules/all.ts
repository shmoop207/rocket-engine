import {App} from "../../../../../../../lib/app";
import {IEnv} from "../../../../../../../lib/interfaces/IEnv";
import {ValidateModule} from "../../../validate/validateModule";

export = async function (env: IEnv, app: App) {
    await app.module(ValidateModule);
}
