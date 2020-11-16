import mineflayer, { createBot } from 'mineflayer';
import { config as envConfig } from 'dotenv';
import { pathfinder, Movements } from 'mineflayer-pathfinder';
import mcData from 'minecraft-data';
import armorManager from 'mineflayer-armor-manager';
import {
  follow, sprint, defend, BotExtended,
} from './modules';
import _config from './config.json';

const config = _config as BotConfig;
const { mineflayer: viewer } = require('prismarine-viewer');
const bloodhoundPlugin = require('mineflayer-bloodhound')(mineflayer);

const env = envConfig();
if (env.error) {
  throw env.error;
}

const { EMAIL, PASSWORD } = process.env;

const bot: BotExtended = createBot({
  username: EMAIL as string,
  password: PASSWORD as string,
  host: '192.168.1.184',
}) as any;

bloodhoundPlugin(bot);
bot.bloodhound.yaw_correlation_enabled = true;
bot.loadPlugins([
  armorManager,
  pathfinder,
  follow as any,
  sprint as any,
  defend as any,
]);

bot.once('spawn', () => {
  if (config.viewer.enabled) {
    viewer(bot, { port: config.viewer.port, firstPerson: true });
  }
  bot.movement = new Movements(bot, mcData(bot.version));
  bot.movement.allowFreeMotion = true;
  // bot.on('chat', (username, message) => {
  // });
});

bot.on('kicked', console.log);
bot.on('error', console.log);

interface BotConfig {
  viewer: {
    enabled: boolean,
    port: number,
  }
}
