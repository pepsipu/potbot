import { BotExtended } from './types';
import potion from '../api/potion';

const defend = (bot: BotExtended) => {
  // bloodhound has no error detection
  ['entityHurt', 'entitySwingArm'].forEach((eventName: any) => {
    const listener = bot.listeners(eventName)[0];
    bot.removeAllListeners(eventName);
    bot.on(eventName, (entity: any) => {
      try {
        listener(entity);
      } catch (e) {
        console.log(e);
      }
    });
  });
  // @ts-ignore
  bot.on('onCorrelateAttack', (attacker, victim, weapon) => {
    if (victim.username !== bot.username) return;
    potion(bot, attacker);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { defend };
