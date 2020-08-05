/* @flow */
import { describe, it, beforeEach, afterEach } from 'mocha'; // eslint-disable-line object-curly-newline
import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import bunyan from 'bunyan';

chai.use(chaiAsPromised);

global.logger = bunyan.createLogger({ name: 'TestLogger', level: 'fatal' });

describe('TerraformToElk', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should merge relationships which come in and out of a iam_role resource', () => {
    });
});
