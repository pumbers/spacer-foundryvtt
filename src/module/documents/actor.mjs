import { SPACER } from "../system/config.mjs";

export class SpacerActor extends Actor {
  /* ------------------------------------------- */
  /*  Data Preparation                           */
  /* ------------------------------------------- */

  // Call sequence is:
  // ActorDataModel.prepareBaseData()
  // Actor.prepareBaseData()
  // Actor.prepareEmbeddedDocuments()
  // ... ItemData.prepareBaseData()
  // ... Item.prepareBaseData()
  // ... ItemData.prepareDerivedData()
  // ... Item.prepareDerivedData()
  // ... Actor.applyActiveEffects()
  // ActorDataModel.prepareDerivedData()
  // Actor.prepareDerivedData()

  prepareBaseData() {
    console.log("WHActor.prepareBaseData()", this);
    super.prepareBaseData();
    const system = this.system;

    // Find or calculate defence values
    system.defence = {};
    system.defence.value =
      this.items.filter((item) => item.type === "armour").filter((item) => item.system.location === "readied")[0]
        ?.system.defence.value ?? 10;
    system.defence.bonus = system.defence.value - 10;

    system.dodge = {};
    system.dodge.value = system.defence.value + system.attributes.agi.bonus;
    system.dodge.bonus = system.dodge.value - 10;

    system.parry = {};
    system.parry.value = system.defence.value + system.attributes.ins.bonus;
    system.parry.bonus = system.parry.value - 10;

    system.block = {};
    system.block.value = system.defence.value + system.attributes.str.bonus;
    system.block.bonus = system.block.value - 10;

    // Calculate item slots
    system.slotsAvailable = system.attributes.phy.value;
    system.slotsUsed = this.items
      .filter((item) => item.type !== "trait")
      .reduce((slotsUsed, item) => slotsUsed + item.system.slots, 0);
  }

  prepareDerivedData() {
    console.log("WHActor.prepareDerivedData()", this);
    super.prepareDerivedData();
    const system = this.system;
  }

  /* ------------------------------------------- */
  /*  Action & Utility Functions                 */
  /* ------------------------------------------- */
}
