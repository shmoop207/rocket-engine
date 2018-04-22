import {define, module, Module, singleton,inject} from '../../../../../../index';
import {IEnv} from "../../../../../../lib/interfaces/IEnv";

@define()
@singleton()
export class DelayManager {
   @inject() env:IEnv;

   get name():string{
      return this.env.type
   }
}