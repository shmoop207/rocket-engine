import {App} from "../../../../../../../lib/app/app";
import {IEnv} from "../../../../../../../lib/interfaces/IEnv";
import {ValidateModule} from "../../../validate/validateModule";

export = async function (env: IEnv, app: App) {
    await app.module.use(ValidateModule);
}
