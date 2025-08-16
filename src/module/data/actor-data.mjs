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
          bonus: new NumberField({ initial: 0 }),
        }),
        agi: new SchemaField({
          bonus: new NumberField({ initial: 0 }),
        }),
        phy: new SchemaField({
          bonus: new NumberField({ initial: 0 }),
        }),
        int: new SchemaField({
          bonus: new NumberField({ initial: 0 }),
        }),
        ins: new SchemaField({
          bonus: new NumberField({ initial: 0 }),
        }),
        pre: new SchemaField({
          bonus: new NumberField({ initial: 0 }),
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

    this.level = Math.ceil(this.xp / 1000);

    Object.values(this.attributes).forEach((attribute) => {
      attribute.value = attribute.bonus + 10;
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
