import { SPACER } from "../system/config.mjs";

export class SpacerItem extends Item {
  /* ------------------------------------------- */
  /*  Data Preparation                           */
  /* ------------------------------------------- */

  prepareDerivedData() {
    console.log("WHItem.prepareDerivedData()", this);
    super.prepareDerivedData();
  }

  /* ------------------------------------------- */
  /*  Action & Utility Functions                 */
  /* ------------------------------------------- */
}
