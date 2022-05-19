import { plainToClass } from "class-transformer";

export class ApplianceState{
    appliance: string
    state: boolean
    value: number
    ip: string
    port: number

    constructor(appliance = '', state = false, value = 0, ip = '', port = 0){
        this.appliance = appliance;
        this.state = state;
        this.value  = value;
        this.ip = ip;
        this.port = port;
    }
}

export function applianceStateMapper(input: []){
    return plainToClass(ApplianceState, input)
}