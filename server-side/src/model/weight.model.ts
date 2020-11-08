export enum WEIGHT_UNIT {
    KILOGRAMS = "KILOGRAMS",
    STONES = "STONES",
    POUNDS = "POUNDS"
};

export class Weight {
    value: number;
    unit: WEIGHT_UNIT;

    constructor(
        value: number,
        unit: WEIGHT_UNIT
    ) {
        this.value = value;
        this.unit = unit;
    }
}