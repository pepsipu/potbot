import { Bot } from 'mineflayer';
import { Pathfinder } from 'mineflayer-pathfinder';
import { Vec3 } from 'vec3';
import { Entity } from 'prismarine-entity';

interface Follow {
  entity: {
    uuid: string,
    position: Vec3,
  }
  goToEntity: (entity: Entity) => void
}

interface BotExtended extends Bot {
  pathfinder: Pathfinder
  follow: Follow
  movement: any
}

// eslint-disable-next-line import/prefer-default-export
export { BotExtended };
