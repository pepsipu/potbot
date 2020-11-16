import { goals } from 'mineflayer-pathfinder';
import { BotExtended } from './types';

const follow = (bot: BotExtended) => {
  bot.follow = {
    uuid: '',
    enabled: true,
    follow: (entity: any) => {
      bot.pathfinder.setMovements(bot.movement);
      bot.pathfinder.setGoal(new goals.GoalFollow(entity, 2), true);
      const doFollow = () => {
        // @ts-ignore
        bot.off('goal_reached', doFollow);
        bot.follow.follow(entity);
      };
      // @ts-ignore
      bot.on('goal_reached', doFollow);
    },
    pause: () => {
      bot.pathfinder.setGoal(null as any);
    },
  };
  bot.on('chat', (username, message) => {
    if (message === 'follow') {
      const { entity } = bot.players[username];
      if (!entity) {
        bot.chat('cant locate player');
        return;
      }
      bot.follow.follow(entity);
    }
    if (message === 'unfollow') {
      bot.follow.enabled = false;
    }
  });
};

// eslint-disable-next-line import/prefer-default-export
export { follow };
