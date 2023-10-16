import dotenv from 'dotenv';
import path from 'path';
import { fileDirName } from './utils/index.js';

const { __dirname } = fileDirName();
dotenv.config({ path: path.resolve(__dirname, '../.env') });
