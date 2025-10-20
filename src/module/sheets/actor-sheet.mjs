import { SPACER } from "../system/config.mjs";
import * as Handlers from "../util/handlers.mjs";
import * as Effects from "../util/effects.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;

/**
 *
 */
class SpacerActorSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  /* -------------------------------------------- */
  /*  Sheet Setup                     
  /* -------------------------------------------- */

  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    window: {
      resizable: true,
      controls: [
        {
          icon: "fa-solid fa-dice",
          label: "Roll New Character",
          action: "rollCharacter",
        },
        {
          icon: "fa-solid fa-pen-to-square",
          label: "Edit Character",
          action: "toggleEdit",
        },
      ],
    },
    form: {
      submitOnChange: true,
    },
    actions: {
      rollCharacter: SpacerActorSheet.#rollCharacter,
      toggleEdit: SpacerActorSheet.#toggleEdit,
      //
      chatItem: SpacerActorSheet.#chatItem,
      createItem: SpacerActorSheet.#createItem,
      editItem: SpacerActorSheet.#editItem,
      deleteItem: SpacerActorSheet.#deleteItem,
      changeItemLocation: SpacerActorSheet.#changeItemLocation,
      //
      createEffect: SpacerActorSheet.#manageEffect,
      editEffect: SpacerActorSheet.#manageEffect,
      deleteEffect: SpacerActorSheet.#manageEffect,
      toggleEffect: SpacerActorSheet.#manageEffect,
      //
    },
  };

  get title() {
    return game.i18n.format("SPACER.actor.sheet.title", { name: this.actor.name });
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
      actor: foundry.utils.deepClone(this.actor),
      system: foundry.utils.deepClone(this.actor.system),
      flags: foundry.utils.mergeObject(foundry.utils.deepClone(this.actor.flags[SPACER.id] ?? {}), {}),
      settings: {
        showItemIcons: game.settings.get(SPACER.id, "showItemIcons"),
      },
      // Categorized items
      traits: this.actor.items.filter((item) => item.type === "trait").sort((a, b) => a.name.localeCompare(b.name)),
      gear: this.actor.items.filter((item) => item.type !== "trait").sort((a, b) => a.name.localeCompare(b.name)),
      weapons: this.actor.items.filter((item) => item.type === "weapon").sort((a, b) => a.name.localeCompare(b.name)),
      //
      effects: Array.from(this.actor.allApplicableEffects()),
    });

    console.log("... actor context", context);
    return context;
  }

  _onFirstRender(context, options) {
    // console.log("_onFirstRender()", context, options);
    super._onFirstRender(context, options);
    this._createContextMenu(this._getTraitContextOptions, ".trait", { fixed: true });
  }

  _getTraitContextOptions() {
    // console.log("_getTraitContextOptions()");
    return [
      {
        name: game.i18n.localize("SPACER.actor.sheet.action.item.chat"),
        icon: '<i class="fas fa-comment"></i>',
        callback: (html) => {
          SpacerActorSheet.#chatItem.call(this, null, html);
        },
      },
      {
        name: game.i18n.format("SPACER.actor.sheet.action.item.edit", {
          name: game.i18n.localize("SPACER.item.type.trait"),
        }),
        icon: '<i class="fas fa-edit"></i>',
        callback: (html) => {
          SpacerActorSheet.#editItem.call(this, null, html);
        },
      },
      {
        name: game.i18n.format("SPACER.actor.sheet.action.item.delete", {
          name: game.i18n.localize("SPACER.item.type.trait"),
        }),
        icon: '<i class="fas fa-trash"></i>',
        callback: (html) => {
          SpacerActorSheet.#deleteItem.call(this, null, html);
        },
      },
    ];
  }

  /* -------------------------------------------- */
  /*  Action Functions                       
  /* -------------------------------------------- */

  static async #rollCharacter(event, target) {
    console.log("#rollCharacter()", target.dataset);
    // RollAttributes
    const attributes = {};
    for (const attribute in this.actor.system.attributes) {
      if (!Object.hasOwn(this.actor.system.attributes, attribute)) continue;
      const result = await new Roll("3d6kl").evaluate();
      attributes[attribute] = { value: result.total + 10 };
    }
    this.actor.update({ system: { attributes } });

    // TODO Roll Traits
  }

  static #toggleEdit(event, target) {
    console.log("#toggleEdit()", target.dataset);
    const flag = !!this.actor.flags[SPACER.id]?.edit;
    console.log("... flag", flag);
    this.actor.setFlag(SPACER.id, "edit", !flag);
  }

  static #chatItem(event, target) {
    console.log("#chatItem()", target.dataset);
    return Handlers.onChatItem(this.actor, event, target);
  }

  static #createItem(event, target) {
    console.log("#createItem()", target.dataset);
    return Handlers.onCreateItem(this.actor, event, target).then((item) => item.sheet.render(true));
  }

  static #editItem(event, target) {
    console.log("#editItem()", target.dataset);
    return Handlers.onEditItem(this.actor, event, target);
  }

  static #deleteItem(event, target) {
    console.log("#deleteItem()", target.dataset);
    return Handlers.onDeleteItem(this.actor, event, target);
  }

  static #changeItemLocation(event, target) {
    console.log("#changeItemLocation()", target.dataset);
    return Handlers.onIemChangeLocation(this.actor, SPACER.item.gear.locations, event, target);
  }

  static #manageEffect(event, target) {
    console.log("#manageEffect", target.dataset);
    return Effects.onManageActiveEffect(this.actor, event, target);
  }

  /* -------------------------------------------- */
  /*  Drag/Drop Functions                       
  /* -------------------------------------------- */

  async _onDropFolder(event, data) {
    console.log("_onDropFolder()", "event", event, "data", data);
    const folder = await Folder.implementation.fromDropData(data);
    if (folder.type !== "Item") return [];
    const droppedItemData = await Promise.all(
      folder.contents.map(async (item) => {
        if (!(document instanceof Item)) item = await fromUuid(item.uuid);
        return item;
      })
    );
    return this._onDropItemCreate(droppedItemData, event);
  }

  async _onDropItem(event, data) {
    console.log("_onDropItem()", "event", event, "data", data);
    const item = await Item.implementation.fromDropData(data);
    return this._onDropItemCreate(item, event);
  }

  async _onDropItemCreate(data, event) {
    console.log("_onDropItemCreate()", event, data);
    data = data instanceof Array ? data : [data];
    return this.actor.createEmbeddedDocuments("Item", data);
  }
}

/**
 *
 */
export class SpacerCharacterSheet extends SpacerActorSheet {
  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    classes: [SPACER.id, "character", "sheet"],
    position: {
      width: 450,
      height: 680,
    },
    controls: [
      {
        icon: "fa fa-random",
        label: "Roll Character",
        action: "rollCharacter",
      },
    ],
    actions: {
      rollAttributes: SpacerCharacterSheet.#rollCharacter,
    },
  };

  /** @inheritdoc */
  static TABS = {
    primary: {
      tabs: [{ id: "character" }, { id: "gear" }, { id: "notes" }, { id: "effects" }],
      initial: "character",
      labelPrefix: "SPACER.actor.sheet.tab",
    },
  };

  /** @inheritdoc */
  static PARTS = {
    header: {
      template: `${SPACER.path}/templates/sheet/character/header.hbs`,
    },
    tabs: {
      // Foundry-provided generic template
      template: "templates/generic/tab-navigation.hbs",
    },
    character: {
      template: `${SPACER.path}/templates/sheet/character/tab-character.hbs`,
    },
    gear: {
      template: `${SPACER.path}/templates/sheet/character/tab-gear.hbs`,
    },
    notes: {
      template: `${SPACER.path}/templates/sheet/tab-notes.hbs`,
    },
    effects: {
      template: `${SPACER.path}/templates/sheet/tab-effects.hbs`,
    },
  };

  /* -------------------------------------------- */
  /*  Action Functions                       
  /* -------------------------------------------- */

  static #rollCharacter(event, target) {
    console.log("#rollCharacter()", target.dataset);
  }
}

/**
 *
 */
export class SpacerNPCSheet extends SpacerActorSheet {
  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    classes: [SPACER.id, "npc", "sheet"],
    position: {
      width: 460,
      height: 440,
    },
  };

  /** @inheritdoc */
  static TABS = {
    primary: {
      tabs: [{ id: "main" }, { id: "notes" }, { id: "effects" }],
      initial: "main",
      labelPrefix: "SPACER.actor.sheet.tab",
    },
  };

  /** @inheritdoc */
  static PARTS = {
    header: {
      template: `${SPACER.path}/templates/sheet/actor/npc/header.hbs`,
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

/**
 *
 */
export class SpacerVehicleSheet extends SpacerActorSheet {
  /** @inheritdoc */
  static DEFAULT_OPTIONS = {
    classes: [SPACER.id, "vehicle", "sheet"],
    position: {
      width: 460,
      height: 440,
    },
  };

  /** @inheritdoc */
  static TABS = {
    primary: {
      tabs: [{ id: "main" }, { id: "notes" }, { id: "effects" }],
      initial: "main",
      labelPrefix: "SPACER.actor.sheet.tab",
    },
  };

  /** @inheritdoc */
  static PARTS = {
    header: {
      template: `${SPACER.path}/templates/sheet/actor/npc/header.hbs`,
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
