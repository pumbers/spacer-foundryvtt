import { SPACER } from "../system/config.mjs";
import * as Effects from "../util/effects.mjs";
import * as Editor from "../util/editor.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;

/* -------------------------------------------- */
/*  Spacer Base Item Sheet                      
/* -------------------------------------------- */

class SpacerItemSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ItemSheetV2) {
  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    classes: [SPACER.id, "item", "sheet"],
    position: {
      width: 380,
      height: 520,
    },
    form: {
      submitOnChange: true,
    },
    actions: {
      //
      createEffect: SpacerItemSheet.#manageEffect,
      editEffect: SpacerItemSheet.#manageEffect,
      deleteEffect: SpacerItemSheet.#manageEffect,
      toggleEffect: SpacerItemSheet.#manageEffect,
    },
  };

  get title() {
    return game.i18n.format("SPACER.item.sheet.title", { name: this.item.name });
  }

  /* ------------------------------------------- */
  /*  Sheet Data Preparation                     */
  /* ------------------------------------------- */

  /** @inheritdoc */
  async _prepareContext(options) {
    console.log("_prepareContext()", this, options);
    const context = Object.assign(await super._prepareContext(options), {
      // General Documents, Settings & Config
      SPACER,
      item: foundry.utils.deepClone(this.item),
      system: foundry.utils.deepClone(this.item.system),
      isOwned: this.item.isOwned,
      //
      effects: this.item.effects,
    });

    console.log("... item context", context);
    return context;
  }

  /* ------------------------------------------- */
  /*  Sheet Listeners & Handlers                 */
  /* ------------------------------------------- */

  static #manageEffect(event, target) {
    console.log("#manageEffect", target.dataset);
    Effects.onManageActiveEffect(this.item, event, target);
  }
}

/* -------------------------------------------- */
/*  Spacer Gear Sheet                       
/* -------------------------------------------- */

export class SpacerTraitSheet extends SpacerItemSheet {
  /** @inheritdoc */
  static TABS = {
    primary: {
      tabs: [{ id: "notes" }, { id: "effects" }],
      initial: "notes",
      labelPrefix: "SPACER.item.sheet.tab",
    },
  };

  /** @inheritdoc */
  static PARTS = {
    header: {
      template: `${SPACER.path}/templates/sheet/item/header.hbs`,
    },
    tabs: {
      // Foundry-provided generic template
      template: "templates/generic/tab-navigation.hbs",
    },
    notes: {
      template: `${SPACER.path}/templates/sheet/tab-notes.hbs`,
    },
    effects: {
      template: `${SPACER.path}/templates/sheet/tab-effects.hbs`,
    },
  };
}

/* -------------------------------------------- */
/*  Spacer Gear Sheet                       
/* -------------------------------------------- */

export class SpacerGearSheet extends SpacerItemSheet {
  /** @inheritdoc */
  static TABS = {
    primary: {
      tabs: [{ id: "item" }, { id: "effects" }],
      initial: "item",
      labelPrefix: "SPACER.item.sheet.tab",
    },
  };

  /** @inheritdoc */
  static PARTS = {
    header: {
      template: `${SPACER.path}/templates/sheet/item/header.hbs`,
    },
    tabs: {
      // Foundry-provided generic template
      template: "templates/generic/tab-navigation.hbs",
    },
    item: {
      template: `${SPACER.path}/templates/sheet/item/tab-item.hbs`,
      templates: [`${SPACER.path}/templates/sheet/item/_armour.hbs`, `${SPACER.path}/templates/sheet/item/_weapon.hbs`],
    },
    effects: {
      template: `${SPACER.path}/templates/sheet/tab-effects.hbs`,
    },
  };
}
