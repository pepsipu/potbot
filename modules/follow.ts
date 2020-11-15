import { Entity } from 'prismarine-entity';
import { goals } from 'mineflayer-pathfinder';
import { Vec3 } from 'vec3';
import { BotExtended } from './types';

const distanceToUpdate = 5;

const follow = (bot: BotExtended) => {
  const goToEntity = (entity: Entity) => {
    const { x, y, z } = entity.position;
    bot.pathfinder.setMovements(bot.movement);
    bot.pathfinder.setGoal(new goals.GoalNear(x, y, z, 1));
  };

  bot.follow = {
    entity: {
      uuid: '',
      position: new Vec3(0, 0, 0),
    },
    goToEntity,
  };

  bot.on('entityMoved', (entity: any) => {
    if (entity.uuid === bot.follow.entity.uuid
      && entity.position.distanceTo(bot.follow.entity.position) > distanceToUpdate) {
      bot.follow.entity.position = entity.position.clone();
      bot.follow.goToEntity(entity);
    }
  });
  bot.on('chat', (username, message) => {
    console.log(bot.follow.entity);
    if (message === 'follow') {
      const { entity } = bot.players[username];
      if (!entity) {
        bot.chat('cant locate player');
        return;
      }
      bot.follow.entity.uuid = (entity as any).uuid;
      bot.follow.entity.position = entity.position.clone();
      bot.follow.goToEntity(entity);
    }
  });
};

// eslint-disable-next-line import/prefer-default-export
export { follow };
