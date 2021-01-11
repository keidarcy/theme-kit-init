#! /usr/bin/env node

import inquirer from 'inquirer';
import { promises } from 'fs';
import { resolve, join } from 'path';

const generateFile = async (name: string, content: string): Promise<void> => {
  const filePath = join(process.cwd(), name);
  await promises.writeFile(filePath, content);
};

(async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Generate a file for themekit',
      name: 'name',
      choices: ['config.yml', '.gitignore']
    }
  ]);
  let content = '';
  if (/gitignore/.test(name)) {
    content = await promises.readFile(resolve(__dirname + '/config/' + name), 'utf-8');
  } else if (/config.yml/.test(name)) {
    const { env, store, themeId, password, ignore } = await inquirer.prompt([
      {
        type: 'list',
        message: 'Environment',
        name: 'env',
        choices: ['development', 'production', 'test'],
        default: 'development'
      },
      {
        type: 'input',
        message: "Store url without 'myshopify.com'",
        name: 'store',
        default: 'cool-shop'
      },
      {
        type: 'input',
        message: "Theme id that you're going to modify",
        name: 'themeId',
        default: '45216989xxxx'
      },
      {
        type: 'password',
        message: 'Private app api password',
        name: 'password',
        default: 'Your Password'
      },
      { type: 'confirm', message: 'Need ignore config/settings_data', name: 'ignore' }
    ]);
    const ignorePart = ignore
      ? `
  ignore_files:
    - config/settings_data.json
    `
      : '';

    content = `${env}:
  store: https://${store}.myshopify.com
  password: ${password}
  theme_id: "${themeId}"${ignorePart}
    `;
  }
  generateFile(name, content);
  console.log(
    'visit https://shopify.github.io/themekit/configuration/ for more information.'
  );
  console.log(`${name} successfully created 🛒`);
})();
