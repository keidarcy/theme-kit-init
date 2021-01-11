#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = require("fs");
const path_1 = require("path");
const generateFile = (name, content) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path_1.join(process.cwd(), name);
    yield fs_1.promises.writeFile(filePath, content);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = yield inquirer_1.default.prompt([
        {
            type: 'list',
            message: 'Generate a file for themekit',
            name: 'name',
            choices: ['config.yml', '.gitignore']
        }
    ]);
    let content = '';
    if (/gitignore/.test(name)) {
        content = yield fs_1.promises.readFile(path_1.resolve(__dirname + '/config/' + name), 'utf-8');
    }
    else if (/config.yml/.test(name)) {
        const { env, store, themeId, password, ignore } = yield inquirer_1.default.prompt([
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
    console.log('visit https://shopify.github.io/themekit/configuration/ for more information.');
    console.log(`${name} successfully created 🛒`);
}))();
//# sourceMappingURL=index.js.map