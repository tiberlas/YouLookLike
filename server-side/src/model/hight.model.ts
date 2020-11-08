export enum HIGHT_UNIT {
    METERS = "METER",
    CENTIMETERS = "CENTIMETERS",
    INCHES = "INCHES",
    FEATS = "FEATS"
};

export class Hight {
    value: number;
    unit: HIGHT_UNIT;

    constructor(
        value: number,
        unit: HIGHT_UNIT
    ) {
        this.value = value;
        this.unit = unit;
    }
}