import { Entity } from 'prismarine-entity';
import mcData from 'minecraft-data';
import { BotExtended } from '../modules/types';

let potionId: number = 0;

const usePotion = (bot: BotExtended, enemy: Entity) => {
  if (!potionId) {
    potionId = ((mcData(bot.version).itemsArray.find(
      ({ displayName }) => displayName === 'Potion',
    )) as any).id;
  }
  const items = bot.inventory.items();
  const potion = items.find(({ type }) => type === potionId);
  if (potion) {
    bot.follow.pause();
    bot.look(enemy.yaw, 0, false, () => {
      const currentlyHolding = bot.quickBarSlot;
      bot.equip(potion, 'hand');
      let potionReceived = false;
      const potionEvent = (entity: any, effect: any) => {
        if (entity.name === bot.entity.name && effect.id === 10) {
          bot.off('entityEffect', potionEvent);
          potionReceived = true;
          bot.follow.follow(enemy);
        }
      };
      let { health } = bot;
      const instantHealEvent = () => {
        if (bot.health > health) {
          // instant potion received
          bot.off('health', instantHealEvent);
          potionReceived = true;
          bot.follow.follow(enemy);
        } else {
          health = bot.health;
        }
      };
      bot.on('health', instantHealEvent);
      bot.on('entityEffect', potionEvent);
      setTimeout(bot.activateItem, 100);
      setTimeout(() => {
        bot.off('entityEffect', potionEvent);
        bot.off('health', instantHealEvent);
        if (!potionReceived) {
          usePotion(bot, enemy);
        } else {
          bot.setQuickBarSlot(currentlyHolding);
        }
      }, 1000);
      bot.setControlState('forward', true);
      bot.setControlState('sprint', true);
    });
    bot.setControlState('forward', true);
    bot.setControlState('sprint', true);
  } else {
    bot.chat('no potions!');
  }
};

export default usePotion;
