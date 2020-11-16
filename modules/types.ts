import { Bot } from 'mineflayer';
import { Pathfinder } from 'mineflayer-pathfinder';

interface Follow {
  uuid: string,
  enabled: boolean,
  follow: (entity: any) => void,
  pause: () => void,
}

interface BotExtended extends Bot {
  data: any,
  bloodhound: any,
  pathfinder: Pathfinder
  follow: Follow
  movement: any
}

// eslint-disable-next-line import/prefer-default-export
export { BotExtended };
