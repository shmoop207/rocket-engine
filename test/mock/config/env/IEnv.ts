import {AppoloEnv} from "../../../../index"

export interface IEnv extends AppoloEnv {
    testLoadModule:string| boolean
    testModule:string
    test:string
    test2:string
    deep:any

}

