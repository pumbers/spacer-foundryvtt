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
