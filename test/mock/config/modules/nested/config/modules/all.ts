import {IEnv} from "../../../../../../../lib/interfaces/IEnv";
import {App} from "../../../../../../../lib/app/app";
import {DbModule} from "../../../db/dbModule";

export = async function (env: IEnv, app: App) {
     app.module.use( DbModule.for({id: "dbMock2"}));

}
