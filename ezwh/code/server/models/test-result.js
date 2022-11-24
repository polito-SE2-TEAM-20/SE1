class TestResult {
  constructor(ID, date, result, testDescriptorId, skuItemId) {
    this.ID = ID;
    this.date = date;
    this.result = result;
    this.testDescriptorId = testDescriptorId;
    this.skuItemId = skuItemId;
  }

  getID() {
    return this.ID;
  }

  setID(ID) {
    this.ID = ID;
  }

  getDate() {
    return this.date;
  }

  setDate(date) {
    this.date = date;
  }

  getResult() {
    return this.result;
  }

  setResult(result) {
    this.result = result;
  }

  getTestDescriptor() {
    return this.testDescriptorId;
  }

  setTestDescriptorID(testDescriptorId) {
    this.testDescriptorId = testDescriptorId;
  }

  getSKUItem() {
    return this.skuItemId;
  }

  setSKUItem(skuItemId) {
    this.skuItemId = skuItemId;
  }
}

module.exports = TestResult;
