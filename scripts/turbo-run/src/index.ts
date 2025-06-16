import process from 'node:process';

import boxen from 'boxen';
import { cac } from 'cac';
import chalk from 'chalk';
import { consola } from 'consola';

import { run } from './run';

console.log(
  boxen(`${chalk.magenta.bold('NovaUI CLI')}\n${chalk.gray('Modern Monorepo Toolchain')}`, {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
    borderColor: 'cyan'
  })
);

try {
  const turboRun = cac('turbo-run');

  turboRun
    .command('[script]')
    .usage(chalk.cyan('Run turbo scripts interactively'))
    .example(chalk.gray('turbo-run dev'))
    .example(chalk.gray('turbo-run build'))
    .action(async (command: string) => {
      run({ command });
    });

  // Invalid command
  turboRun.on('command:*', () => {
    consola.error(chalk.red('❌ Invalid command!'));
    process.exit(1);
  });

  turboRun.usage('turbo-run [script]');
  turboRun.help();
  turboRun.parse();
} catch (error) {
  consola.error(chalk.red('❌ Error:'), error);
  process.exit(1);
}
