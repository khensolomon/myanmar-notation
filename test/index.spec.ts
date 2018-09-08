import notation from '../asset/';
import * as assert from 'assert';

import 'mocha';

describe('Notation', () => {
	it('Non-numeric should returned empty Object', () => {
		const job = notation.get('Non-numeric');
		assert.ok(Object.keys(job).length == 0);
	});
	it('1230 should returned {number} ၁၂၃၀', () => {
		const job = notation.get('1230');
		assert.equal('၁,၂၃၀',job.number);
	});
	it('၁၂၀၀,၀၀၀.၀ == 12,000,000 as removed decimals', () => {
		const job = notation.get('၁၂၀၀,၀၀၀.၀');
		assert.equal('12,000,000',job.number);
	});
	it('12345678 should have 3 senses', () => {
		const job = notation.get('12345678');
		assert.ok(job.notation.length == 3);
	});
	// it('Hello world', () => {
	// 	const query = '10000000';
	// 	const {hello} = notation;
	// 	console.log(hello);
	// 	assert.ok(hello);
	// });
});