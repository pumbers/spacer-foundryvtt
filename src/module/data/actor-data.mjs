import { SPACER } from "../system/config.mjs";

const {
  HTMLField,
  SchemaField,
  NumberField,
  StringField,
  ArrayField,
  EmbeddedDataField,
  ForeignDocumentField,
  BooleanField,
} = foundry.data.fields;

/* -------------------------------------------- */
/*  Spacer Character Model                  
/* -------------------------------------------- */

export class SpacerCharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      // Attributes
      attributes: new SchemaField({
        str: new SchemaField({
          value: new NumberField({ initial: 10 }),
        }),
        agi: new SchemaField({
          value: new NumberField({ initial: 10 }),
        }),
        phy: new SchemaField({
          value: new NumberField({ initial: 10 }),
        }),
        int: new SchemaField({
          value: new NumberField({ initial: 10 }),
        }),
        ins: new SchemaField({
          value: new NumberField({ initial: 10 }),
        }),
        pre: new SchemaField({
          value: new NumberField({ initial: 10 }),
        }),
      }),
      //
      hd: new StringField({ initial: "1D8", choices: { "1D8": "D8" } }),
      hp: new SchemaField({ max: new NumberField({ initial: 0 }), value: new NumberField({ initial: 0 }) }),
      //
      xp: new NumberField({ initial: 0 }),
      notes: new HTMLField(),
      //
      // derived: level
    };
  }

  prepareBaseData() {
    super.prepareBaseData();
    console.log("SpacerCharacterData.prepareBaseData()", this);

    this.level = Math.ceil(this.xp / 1000) + 1;

    this.hp.lost = Math.max(this.hp.max - this.hp.value, 0);

    Object.values(this.attributes).forEach((attribute) => {
      attribute.bonus = attribute.value - 10;
    });

    console.log("... actor data", this);
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    console.log("SpacerCharacterData.prepareDerivedData()", this);
  }
}

/* -------------------------------------------- */
/*  Spacer NPC Model                    
/* -------------------------------------------- */

export class SpaceNPCData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {};
  }

  prepareBaseData() {
    super.prepareBaseData();
    console.log("SpaceNPCData.prepareBaseData()", this);
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    console.log("SpaceNPCData.prepareDerivedData()", this);
  }
}

/* -------------------------------------------- */
/*  Spacer Vehicle Model                  
/* -------------------------------------------- */

export class SpaceVehicleData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {};
  }

  prepareBaseData() {
    super.prepareBaseData();
    console.log("SpaceVehicleData.prepareBaseData()", this);
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    console.log("SpaceVehicleData.prepareDerivedData()", this);
  }
}
