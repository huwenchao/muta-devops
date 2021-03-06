import home from 'home';
import fs from 'fs';
import path from 'path';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";
const config = require(`../env/${env}`);
console.log("bot config:", config);

export const WEEKLY_REPO = config.weekly_repo;
export const CODE_REPO = config.code_repo;
export const CODE_BRANCH = config.code_branch;
export const DEV_MODE = config.dev_mode;
export const TELEGRAM_BOT_KEY = config.telegram_bot_key
export const TELEGRAM_CHAT_ID = DEV_MODE ? config.telegram_channel_id : config.telegram_nervos_group;
export const WEEKLY_MEETING_URL = config.weekly_meeting_url
export const WEEKLY_MEETING_URL_FRIDAY = config.weekly_meeting_url_friday
export const RED_POCKET_ADDRESS = config.red_pocket_address
export const MEMBERS = config.members

export const ROOT_PATH = home.resolve('~/.muta-bot');
export const ROOT_K8SYAML_PATH = path.join(ROOT_PATH, 'k8s');

export const KUBE_CONFIG = '/root/.kube/config';
export const KUBE_NETWORK_REQ: number = 2; // 0-Proxy 1-ClusterIP 2-NodePort
export const KUBE_HOST = config.kube_host;
export const KUBE_PROXY = `http://${KUBE_HOST}:8001`;
export const KUBE_NAMESPACE = 'mutadev';
export const KUBE_WATCH_ISSUE_NUMBER = 456; // https://github.com/nervosnetwork/muta-internal/issues/456

function init() {
  if (!fs.existsSync(ROOT_PATH)) {
    fs.mkdirSync(ROOT_PATH)
  }
  if (!fs.existsSync(ROOT_K8SYAML_PATH)) {
    fs.mkdirSync(ROOT_K8SYAML_PATH)
  }
}

init()
