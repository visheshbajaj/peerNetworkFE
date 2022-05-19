export class ApplianceState{
    appliance: string
    state: boolean
    value: number

    constructor(appliance = '', state = false, value = 0){
        this.appliance = appliance;
        this.state = state;
        this.value  = value;
    }
}

export function applianceStateMapper(input: any){
  // @ts-ignore
  let as = input[0]
  // @ts-ignore
  return new ApplianceState(as['name'], as['status'], as['value'])
}
