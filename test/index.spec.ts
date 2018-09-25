import notation from '../asset/';
import * as assert from 'assert';

import 'mocha';

describe('Notation', () => {
	it('Check no query', () => {
		const job = notation.get();
		assert.ok(job);
	});
	it('Non-numeric should returned empty Object', () => {
		const job = notation.get('Non-numeric');
		assert.ok(Object.keys(job).length == 0);
	});
	it('1230 should returned {number} ၁၂၃၀', () => {
		const job = notation.get('1230');
		assert.equal('၁၂၃၀',job.number);
	});
	it('၁၂၀၀၀၀၀၀ == 12000000 as removed decimals', () => {
		const job = notation.get('၁၂၀၀,၀၀၀.၀');
		assert.equal('12000000',job.number);
	});
	it('1.23e+5 == ၁၂၃၀၀၀', () => {
		const job = notation.get('1.23e+5');
		assert.equal('၁၂၃၀၀၀',job.number);
	});
	describe("var job = notation.get('12345678')", () => {
		const job = notation.get('12345678');
		it('job.number:String should be ၁၂၃၄၅၆၇၈', () => {
			assert.equal('၁၂၃၄၅၆၇၈',job.number);
		});
		it('job.notation:Object should have 3 senses', () => {
			assert.ok(job.notation.length == 3);
		});
		describe('each Sense', () => {
			it(job.notation[0].sense, () => {
				assert.ok(job.notation[0].sense);
			});
			it(job.notation[1].sense, () => {
				assert.ok(job.notation[1].sense);
			});
			it(job.notation[2].sense, () => {
				assert.ok(job.notation[2].sense);
			});
		});
	});
});