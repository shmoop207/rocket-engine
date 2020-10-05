import {IEnv} from "../../../../../../../lib/interfaces/IEnv";
import {App} from "../../../../../../../lib/app";
import {DbModule} from "../../../db/dbModule";

export = async function (env: IEnv, app: App) {
     app.modules.use( DbModule.for({id: "dbMock2"}));

}
