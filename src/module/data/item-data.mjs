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
/*  Base Item & Embedded Types                   
/* -------------------------------------------- */

class SpacerItemData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      notes: new HTMLField(),
    };
  }

  static migrateData(source) {
    // console.log("SpacerItemData.migrateData()", source);
  }
}

/* -------------------------------------------- */
/*  Spacer Trait Items                   
/* -------------------------------------------- */

export class SpacerTraitData extends SpacerItemData {
  static defineSchema() {
    return Object.assign(super.defineSchema(), {
      type: new StringField({ choices: SPACER.item.trait.types }),
    });
  }
}

/* -------------------------------------------- */
/*  Spacer Gear Items                   
/* -------------------------------------------- */

export class SpacerGearData extends SpacerItemData {
  static defineSchema() {
    return Object.assign(super.defineSchema(), {
      credits: new NumberField({ initial: 0, min: 0 }),
      slots: new NumberField({ initial: 0, min: 0 }),
      quality: new NumberField({ initial: 1, min: 0 }),
    });
  }
}

export class SpacerArmourData extends SpacerGearData {
  static defineSchema() {
    return Object.assign(super.defineSchema(), {
      defence: new SchemaField({ bonus: new NumberField({ initial: 0 }) }),
    });
  }

  prepareBaseData() {
    super.prepareBaseData();
    console.log("SpacerArmourData.prepareBaseData()", this);

    this.defence.value = this.defence.bonus + 10;
  }
}

export class SpacerWeaponData extends SpacerGearData {
  static defineSchema() {
    return Object.assign(super.defineSchema(), {
      type: new StringField({
        initial: "melee",
        choices: SPACER.item.weapon.types,
      }),
      hand: new StringField({
        initial: "1H",
        choices: SPACER.item.weapon.hands,
      }),
      damage: new StringField({ initial: "0" }),
      traits: new ArrayField(new StringField(), { initial: [] }),
    });
  }
}

/* -------------------------------------------- */
/*  Spacer Vehicle Systems                   
/* -------------------------------------------- */

export class SpacerSystemData extends SpacerGearData {
  static defineSchema() {
    return Object.assign(super.defineSchema(), {});
  }
}
