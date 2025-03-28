import { ElementType } from "app/app/types";

type defaultSettings = 1;
type elementSettings = Partial<Record<ElementType, number>> &
  Record<"defaultImpact", defaultSettings>;

export const typeEffectivenessMultiplier: Record<ElementType, elementSettings> =
  {
    [ElementType.NORMAL]: {
      defaultImpact: 1,
    },
    [ElementType.FIRE]: {
      defaultImpact: 1,
      [ElementType.WATER]: 0.5,
      [ElementType.GRASS]: 2,
      [ElementType.ICE]: 2,
      [ElementType.BUG]: 2,
      [ElementType.ROCK]: 0.5,
      [ElementType.STEEL]: 2,
    },
    [ElementType.WATER]: {
      defaultImpact: 1,
      [ElementType.FIRE]: 2,
      [ElementType.GRASS]: 0.5,
      [ElementType.GROUND]: 2,
      [ElementType.ROCK]: 2,
    },
    [ElementType.ELECTRIC]: {
      defaultImpact: 1,
      [ElementType.GROUND]: 2,
    },
    [ElementType.GRASS]: {
      defaultImpact: 1,
      [ElementType.FIRE]: 0.5,
      [ElementType.WATER]: 2,
      [ElementType.GROUND]: 2,
      [ElementType.FLYING]: 0.5,
      [ElementType.BUG]: 0.5,
    },
    [ElementType.ICE]: {
      defaultImpact: 1,
      [ElementType.FIRE]: 0.5,
      [ElementType.GRASS]: 2,
      [ElementType.FLYING]: 2,
      [ElementType.GROUND]: 2,
      [ElementType.BUG]: 2,
    },
    [ElementType.FIGHTING]: {
      defaultImpact: 1,
      [ElementType.NORMAL]: 2,
      [ElementType.ICE]: 2,
      [ElementType.FLYING]: 0.5,
      [ElementType.PSYCHIC]: 0.5,
      [ElementType.BUG]: 0.5,
      [ElementType.ROCK]: 2,
      [ElementType.GHOST]: 0,
      [ElementType.DARK]: 2,
      [ElementType.STEEL]: 2,
    },
    [ElementType.POISON]: {
      defaultImpact: 1,
      [ElementType.GRASS]: 2,
      [ElementType.GROUND]: 0.5,
      [ElementType.PSYCHIC]: 2,
    },
    [ElementType.GROUND]: {
      defaultImpact: 1,
      [ElementType.FIRE]: 2,
      [ElementType.ELECTRIC]: 2,
      [ElementType.GRASS]: 0.5,
      [ElementType.ROCK]: 2,
      [ElementType.STEEL]: 2,
    },
    [ElementType.FLYING]: {
      defaultImpact: 1,
      [ElementType.GRASS]: 2,
      [ElementType.ROCK]: 0.5,
      [ElementType.BUG]: 2,
    },
    [ElementType.PSYCHIC]: {
      defaultImpact: 1,
      [ElementType.FIGHTING]: 2,
      [ElementType.POISON]: 2,
    },
    [ElementType.BUG]: {
      defaultImpact: 1,
      [ElementType.GRASS]: 2,
      [ElementType.PSYCHIC]: 2,
      [ElementType.ROCK]: 0.5,
      [ElementType.FLYING]: 0.5,
      [ElementType.FIRE]: 0.5,
    },
    [ElementType.ROCK]: {
      defaultImpact: 1,
      [ElementType.FIRE]: 2,
      [ElementType.ICE]: 2,
      [ElementType.FLYING]: 2,
      [ElementType.BUG]: 2,
    },
    [ElementType.GHOST]: {
      defaultImpact: 1,
      [ElementType.GHOST]: 2,
      [ElementType.PSYCHIC]: 2,
      [ElementType.FIGHTING]: 0,
    },
    [ElementType.DRAGON]: {
      defaultImpact: 1,
      [ElementType.DRAGON]: 2,
      [ElementType.FAIRY]: 0,
    },
    [ElementType.DARK]: {
      defaultImpact: 1,
      [ElementType.GHOST]: 2,
      [ElementType.DARK]: 1,
      [ElementType.FAIRY]: 0.5,
    },
    [ElementType.STEEL]: {
      defaultImpact: 1,
      [ElementType.FIRE]: 0.5,
      [ElementType.ICE]: 2,
      [ElementType.FIGHTING]: 0.5,
      [ElementType.POISON]: 0,
      [ElementType.BUG]: 2,
      [ElementType.ROCK]: 2,
      [ElementType.FAIRY]: 2,
    },
    [ElementType.FAIRY]: {
      defaultImpact: 1,
      [ElementType.DARK]: 2,
      [ElementType.DRAGON]: 2,
      [ElementType.FIGHTING]: 2,
      [ElementType.POISON]: 0.5,
      [ElementType.STEEL]: 0.5,
    },
  };
