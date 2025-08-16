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
      species: "",
      ability: "",
      talent: "",
      homeworld: "",
      clothing: "",
      virtue: "",
      vice: "",
      cybernetics: "",
      background: "",
      misfortune: "",
      alignment: "",
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
