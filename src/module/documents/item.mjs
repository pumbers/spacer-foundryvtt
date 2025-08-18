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

  async chat() {
    const content = await foundry.applications.handlebars.renderTemplate(
      `${SPACER.path}/templates/chat/item.hbs`,
      this
    );
    ChatMessage.create({
      content: content,
      flavor: this.name,
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    });
  }
}
