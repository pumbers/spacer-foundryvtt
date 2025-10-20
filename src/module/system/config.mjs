export const SPACER = {};

/* ------------------------------------------- */
/*  Game System Config & Options               */
/* ------------------------------------------- */

SPACER.id = "spacer";
SPACER.path = "systems/spacer";
SPACER.prefix = "Spacer |";

/* ------------------------------------------- */
/*  Actor Config & Options                     */
/* ------------------------------------------- */

SPACER.actor = {
  attributes: {
    str: "SPACER.actor.attributes.str",
    agi: "SPACER.actor.attributes.agi",
    phy: "SPACER.actor.attributes.phy",
    int: "SPACER.actor.attributes.int",
    ins: "SPACER.actor.attributes.ins",
    pre: "SPACER.actor.attributes.pre",
  },
};

/* ------------------------------------------- */
/*  Item Config & Options                      */
/* ------------------------------------------- */

SPACER.item = {
  trait: {
    types: {
      species: "SPACER.item.trait.species",
      ability: "SPACER.item.trait.ability",
      talent: "SPACER.item.trait.talent",
      homeworld: "SPACER.item.trait.homeworld",
      clothing: "SPACER.item.trait.clothing",
      virtue: "SPACER.item.trait.virtue",
      vice: "SPACER.item.trait.vice",
      cybernetics: "SPACER.item.trait.cybernetics",
      background: "SPACER.item.trait.background",
      misfortune: "SPACER.item.trait.misfortune",
      alignment: "SPACER.item.trait.alignment",
    },
  },
  gear: {
    traits: { hidden: "SPACER.item.weapon.trait.hidden" },
    locations: ["readied", "dropped", "packed", "stowed", "stored"],
    icons: {
      readied: "icon-battle-gear",
      packed: "icon-knapsack",
      dropped: "icon-drop-weapon",
      stowed: "icon-chest",
      stored: "icon-white-tower",
    },
  },
  armour: {
    types: {
      light: "SPACER.item.armour.type.light",
      medium: "SPACER.item.armour.type.medium",
      heavy: "SPACER.item.armour.type.heavy",
    },
    traits: {
      bulky: "SPACER.item.armour.trait.bulky",
    },
  },
  weapon: {
    types: {
      melee: "SPACER.item.weapon.melee",
      missile: "SPACER.item.weapon.missile",
    },
    hands: { "1H": "SPACER.item.weapon.1H", "2H": "SPACER.item.weapon.2H" },
    traits: {
      hidden: "SPACER.item.weapon.trait.hidden",
      stun: "SPACER.item.weapon.trait.stun",
    },
  },
};
