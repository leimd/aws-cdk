import { Runtime } from '@aws-cdk/aws-lambda';
import { App, Construct, Stack, StackProps } from '@aws-cdk/core';
import * as path from 'path';
import * as lambda from '../lib';

class TestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new lambda.NodejsFunction(this, 'ts-handler', {
      projectRoot: path.join(__dirname, '..'),
      entry: path.join(__dirname, 'integ-handlers/ts-handler.ts'),
      runtime: Runtime.NODEJS_12_X,
      minify: true,
    });

    new lambda.NodejsFunction(this, 'js-handler', {
      projectRoot: path.join(__dirname, '..'),
      entry: path.join(__dirname, 'integ-handlers/js-handler.js'),
      runtime: Runtime.NODEJS_12_X,
    });
  }
}

const app = new App();
new TestStack(app, 'cdk-integ-lambda-nodejs');
app.synth();
