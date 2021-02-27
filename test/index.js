import 'mocha';
import notation from '../lib/index.js';
import assert from 'assert';

describe('Notation', () => {
	it('Checking query', () => {
		const job = notation.get();
		assert.ok(job);
	});

	it('Non-numeric should returned empty Object', () => {
		const job = notation.get('Non-numeric');
		assert.ok(job instanceof Object);
	});

	it('1230 should returned ၁၂၃၀', () => {
		const job = notation.get('1230');
		assert.strictEqual('၁၂၃၀',job.number);
	});

	it('၁၂၀၀,၀၀၀.၀ == 1200000 as removed decimals', () => {
		const job = notation.get('၁၂၀၀,၀၀၀.၀');
		assert.strictEqual('1200000',job.digit);
    assert.strictEqual('၁၂၀၀၀၀၀',job.number);
	});

	it('1.23e+5 == ၁၂၃၀၀၀', () => {
		const job = notation.get('1.23e+5');
		assert.strictEqual('123000',job.digit);
		assert.strictEqual('၁၂၃၀၀၀',job.number);
	});

  describe("zero", () => {
    it('၀၀၀', () => {
      const job = notation.get('၀၀၀');
      assert.strictEqual('0',job.digit);
      assert.strictEqual('၀',job.number);
    });

    it('empty', () => {
      const job = notation.get('');
      assert.strictEqual('0',job.digit);
      assert.strictEqual('၀',job.number);
    });

    it('00000', () => {
      const job = notation.get('00000');
      assert.strictEqual('0',job.digit);
      assert.strictEqual('၀',job.number);
    });

  });

	describe("var job = notation.get('12345678')", () => {

		const job = notation.get('12345678');
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

  describe("multiplication", () => {
    it('one hundred thousand 10x5 သိန်း', () => {
      const job = notation.multiplication(5,'10');
      assert.strictEqual('100000',job);
    });
    it('one million 10x6 သန်း', () => {
      const job = notation.multiplication(6,'10');
      assert.strictEqual('1000000',job);
    });
    it('ten million 10x7 ကုဋေ', () => {
      const job = notation.multiplication(7,'10');
      assert.strictEqual('10000000',job);
    });
  });

  describe("keepBurmese", () => {
    it('regular', () => {
      const job = notation.keepBurmese('12345');
      assert.strictEqual('၁၂၃၄၅',job);
    });

    it('mix', () => {
      const job = notation.keepBurmese('e12345abc');
      assert.strictEqual('e၁၂၃၄၅abc',job);
    });
  });

  describe("turnBurmese", () => {
    it('regular', () => {
      const job = notation.turnBurmese('၉၈၇၆၅');
      assert.strictEqual('98765',job);
    });

    it('mix', () => {
      const job = notation.turnBurmese('u၉၈၇s၆၅fe');
      assert.strictEqual('u987s65fe',job);
    });
  });

});