class TestDescriptor {
  constructor(ID, name, procedureDescription, skuId) {
    this.ID = ID;
    this.name = name;
    this.procedureDescription = procedureDescription;
    this.skuId = skuId;
  }

  getID() {
    return this.ID;
  }

  getName() {
    return this.name;
  }

  getProcedureDescription() {
    return this.procedureDescription;
  }

  setID(ID) {
    this.ID = ID;
  }

  setName(name) {
    this.name = name;
  }

  setProcedureDescription(procedureDescription) {
    this.procedureDescription = procedureDescription;
  }

  getSku() {
    return this.skuId;
  }

  setSku(skuId) {
    this.skuId = skuId;
  }
}

module.exports = TestDescriptor;
