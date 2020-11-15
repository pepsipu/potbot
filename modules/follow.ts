import { Entity } from 'prismarine-entity';
import { goals } from 'mineflayer-pathfinder';
import { Vec3 } from 'vec3';
import { BotExtended } from './types';

const distanceToUpdate = 5;

const follow = (bot: BotExtended) => {
  bot.follow = {
    entity: {
      uuid: '',
      position: new Vec3(0, 0, 0),
    },
  };

  bot.on('entityMoved', (entity: any) => {
    if (entity.uuid === bot.follow.entity.uuid
      && entity.position.distanceTo(bot.follow.entity.position) > distanceToUpdate) {
      bot.follow.entity.position = entity.position.clone();
      bot.pathfinder.setMovements(bot.movement);
      bot.setControlState('sprint', true);
      bot.pathfinder.setGoal(new goals.GoalFollow(entity, 1));
    }
  });
  bot.on('chat', (username, message) => {
    if (message === 'follow') {
      const { entity } = bot.players[username];
      if (!entity) {
        bot.chat('cant locate player');
        return;
      }
      bot.follow.entity.uuid = (entity as any).uuid;
      bot.follow.entity.position = entity.position.clone();
      bot.pathfinder.setMovements(bot.movement);
      bot.pathfinder.setGoal(new goals.GoalFollow(bot.players[username].entity, 1));
    }
  });
};

// eslint-disable-next-line import/prefer-default-export
export { follow };
