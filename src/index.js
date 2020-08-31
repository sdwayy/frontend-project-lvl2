/* eslint-disable no-underscore-dangle */
import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getFormatter from './formatters/index.js';
import createTree from './tree.js';

function getFileData(filePath) {
  const type = path.extname(filePath).replace('.', '');
  const content = fs.readFileSync(filePath, 'utf-8');

  return parse(content, type);
}

export default function genDiff(firstFilePath, secondFilePath, format) {
  const firstFileData = getFileData(firstFilePath);
  const secondFileData = getFileData(secondFilePath);

  const tree = createTree(firstFileData, secondFileData);
  const formatter = getFormatter(format);

  return formatter(tree);
}
