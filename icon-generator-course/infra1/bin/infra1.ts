#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra1-stack';

const app = new cdk.App();
new InfraStack(app, 'InfraStack');
