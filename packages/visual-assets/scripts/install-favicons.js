#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(__dirname, '../dist/favicons');
const target = path.resolve(process.env.INIT_CWD || '', 'public/favicons');

if (!fs.existsSync(source)) {
    console.error('Favicons source not found:', source);
    process.exit(1);
}

console.log(`Copying favicons to ${target}`);
fs.mkdirSync(target, { recursive: true });
execSync(`cp -r ${source}/. ${target}`);
