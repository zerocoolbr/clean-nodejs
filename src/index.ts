/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import 'reflect-metadata';
import 'module-alias/register';
import moduleAlias from 'module-alias';
moduleAlias.addAliases({
  '@': `${__dirname}`,
});
import { Application } from './main/app';
import './shared/container';

const application = new Application();

setImmediate(async () => {
  await application.start();
  console.log('Application started');
});
