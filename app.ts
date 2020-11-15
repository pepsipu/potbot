import { createBot } from 'mineflayer';
import { config as envConfig } from 'dotenv';
import {
  pathfinder, Pathfinder, goals, Movements,
} from 'mineflayer-pathfinder';
import mcData from 'minecraft-data';
import { follow, BotExtended } from './modules';
import _config from './config.json';

const config = _config as BotConfig;
const { mineflayer: viewer } = require('prismarine-viewer');

const env = envConfig();
if (env.error) {
  throw env.error;
}

const { EMAIL, PASSWORD } = process.env;

const bot: BotExtended = createBot({
  username: EMAIL as string,
  password: PASSWORD as string,
}) as any;

bot.loadPlugins([pathfinder, follow as any]);

bot.once('spawn', () => {
  if (config.viewer.enabled) {
    viewer(bot, { port: config.viewer.port, firstPerson: true });
  }
  bot.movement = new Movements(bot, mcData(bot.version));
  bot.on('chat', (username, message) => {
    if (message === 'betterFollow') {
      bot.pathfinder.setMovements(bot.movement);
      bot.pathfinder.setGoal(new goals.GoalFollow(bot.players[username].entity, 1));
    }
  });
});

bot.on('kicked', console.log);
bot.on('error', console.log);

interface BotConfig {
  viewer: {
    enabled: boolean,
    port: number,
  }
}
