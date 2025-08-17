// Import Modules
import { SPACER } from "./system/config.mjs";
import { SpacerCharacterData, SpaceNPCData, SpaceVehicleData } from "./data/actor-data.mjs";
import { SpacerActor } from "./documents/actor.mjs";
import { SpacerCharacterSheet, SpacerNPCSheet, SpacerVehicleSheet } from "./sheets/actor-sheet.mjs";

import { SpacerTraitData, SpacerGearData, SpacerArmourData, SpacerWeaponData } from "./data/item-data.mjs";
import { SpacerItem } from "./documents/item.mjs";
import { SpacerTraitSheet, SpacerGearSheet } from "./sheets/item-sheet.mjs";

import * as Helpers from "./util/helpers.mjs";

const { StringField, NumberField, BooleanField, ArrayField } = foundry.data.fields;

/* -------------------------------------------- */
/*  Define Module Structure                         
/* -------------------------------------------- */

Hooks.once("init", async function () {
  console.info(SPACER.prefix, "Initializing the Spacer v3 Game System");

  /* -------------------------------------------- */
  /*  Config                            
  /* -------------------------------------------- */

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // Time settings
  CONFIG.time.roundTime = 1;
  CONFIG.time.turnTime = 1;

  // Combat
  CONFIG.Combat.initiative.formula = "1d6";
  CONFIG.Actor.trackableAttributes = { character: { bar: ["hp"], value: [] }, npc: { bar: ["hp"], value: [] } };

  /* -------------------------------------------- */
  /*  Game Settings                            
  /* -------------------------------------------- */

  game.settings.register(SPACER.id, "showItemIcons", {
    name: game.i18n.localize("SPACER.game.settings.showItemIcons.name"),
    hint: game.i18n.localize("SPACER.game.settings.showItemIcons.hint"),
    scope: "world",
    type: new BooleanField({ initial: true }),
    config: true,
  });

  game.settings.register(SPACER.id, "pdfPagerEnabled", {
    scope: "world",
    type: new BooleanField({ initial: false }),
  });

  /* -------------------------------------------- */
  /*  Define Documents & Sheets                           
  /* -------------------------------------------- */

  // Actor document configuration
  CONFIG.Actor.dataModels = { character: SpacerCharacterData, npc: SpaceNPCData, vehicle: SpaceVehicleData };
  CONFIG.Actor.documentClass = SpacerActor;
  foundry.documents.collections.Actors.unregisterSheet("core", foundry.applications.sheets.ActorSheetV2);
  foundry.documents.collections.Actors.registerSheet(SPACER.id, SpacerCharacterSheet, {
    types: ["character"],
    makeDefault: true,
  });
  foundry.documents.collections.Actors.registerSheet(SPACER.id, SpacerNPCSheet, {
    types: ["npc"],
    makeDefault: true,
  });
  foundry.documents.collections.Actors.registerSheet(SPACER.id, SpacerVehicleSheet, {
    types: ["vehicle"],
    makeDefault: true,
  });

  // Item document configuration
  CONFIG.Item.dataModels = {
    trait: SpacerTraitData,
    gear: SpacerGearData,
    weapon: SpacerWeaponData,
    armour: SpacerArmourData,
  };
  CONFIG.Item.documentClass = SpacerItem;
  foundry.documents.collections.Items.unregisterSheet("core", foundry.applications.sheets.ItemSheetV2);
  foundry.documents.collections.Items.registerSheet(SPACER.id, SpacerTraitSheet, {
    types: ["trait"],
    makeDefault: true,
  });
  foundry.documents.collections.Items.registerSheet(SPACER.id, SpacerGearSheet, {
    types: ["gear", "weapon", "armour"],
    makeDefault: true,
  });

  /* -------------------------------------------- */
  /*  Handlebars Helpers & Partials                      
  /* -------------------------------------------- */

  Handlebars.registerHelper("log", Helpers.log);
  Handlebars.registerHelper("stringify", Helpers.stringify);
  Handlebars.registerHelper("property", Helpers.property);
  Handlebars.registerHelper("offset", Helpers.offset);
  Handlebars.registerHelper("object", Helpers.object);
  Handlebars.registerHelper("array", Helpers.array);
  Handlebars.registerHelper("range", Helpers.range);
  Handlebars.registerHelper("abbrev", Helpers.abbrev);
  Handlebars.registerHelper("abs", Helpers.abs);
  Handlebars.registerHelper("sort", Helpers.sort);
  Handlebars.registerHelper("includes", Helpers.includes);
  Handlebars.registerHelper("between", Helpers.between);
  Handlebars.registerHelper("startsWith", Helpers.startsWith);
  Handlebars.registerHelper("statusEffect", Helpers.statusEffect);
  Handlebars.registerHelper("inc", Helpers.inc);

  foundry.applications.handlebars.loadTemplates([]);
});

/* -------------------------------------------- */
/*  Startup Messages                           
/* -------------------------------------------- */

Hooks.on("ready", async () => {
  // ui.notifications.info(game.i18n.localize("SPACER.messages.notice"));
  console.info(SPACER.prefix, "System ready");

  // Check for PDF Pager module and enable integration if active
  if (game.modules.has("pdf-pager")) {
    game.settings.set(SPACER.id, "pdfPagerEnabled", game.modules.get("pdf-pager")?.active);
    console.info(
      SPACER.prefix,
      "PDF Pager module found, setting PDF references",
      game.modules.get("pdf-pager")?.active
    );
  }
});
