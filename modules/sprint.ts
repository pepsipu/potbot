import { ControlState } from 'mineflayer';
import { BotExtended } from './types';

const sprint = (bot: BotExtended) => {
  // we need to hook setting forward and make it so that it sprints
  const monitorMovement = bot.listeners('physicTick')[0];
  const patchedMonitorMovement = () => {
    const { setControlState } = bot;
    bot.setControlState = (control: ControlState, state: boolean) => {
      if (control === 'forward') {
        setControlState('sprint', state);
      }
      setControlState(control, state);
    };
    monitorMovement();
    bot.setControlState = setControlState;
  };
  bot.removeAllListeners('physicTick');
  bot.on('physicTick', patchedMonitorMovement);
};

// eslint-disable-next-line import/prefer-default-export
export { sprint };
