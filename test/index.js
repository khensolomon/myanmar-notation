// import 'mocha';
import notation from '../lib/index.js';
import assert from 'assert';

describe('Notation', () => {
	it('Checking query', () => {
		const job = notation();
		assert.ok(job);
	});
	it('Non-numeric should returned empty Object', () => {
		const job = notation('Non-numeric');
		assert.ok(job instanceof Object);
	});
	it('1230 should returned ၁၂၃၀', () => {
		const job = notation('1230');
		assert.strictEqual('၁၂၃၀',job.number);
	});
	it('၁၂၀၀,၀၀၀.၀ == 12000000 as removed decimals', () => {
		const job = notation('၁၂၀၀,၀၀၀.၀');
		assert.strictEqual('12000000',job.number);
	});
	it('1.23e+5 == ၁၂၃၀၀၀', () => {
		const job = notation('1.23e+5');
		assert.strictEqual('၁၂၃၀၀၀',job.number);
	});
	describe("var job = notation.get('12345678')", () => {
		const job = notation('12345678');
		it('job.number:String should be ၁၂၃၄၅၆၇၈', () => {
			assert.strictEqual('၁၂၃၄၅၆၇၈',job.number);
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