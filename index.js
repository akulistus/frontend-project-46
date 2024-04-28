#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from './bin/genDiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    const result = genDiff(filepath1, filepath2, options);
    console.log(result);
  });

program.parse();