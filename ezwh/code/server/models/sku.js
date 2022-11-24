class SKU {
  constructor(
    ID,
    Description,
    weight,
    volume,
    notes,
    price,
    SKUItems,
    positionId,
    testDescriptorIds,
    availableQuantity
  ) {
    this.ID = ID;
    this.Description = Description;
    this.weight = weight;
    this.volume = volume;
    this.notes = notes;
    this.price = price;
    this.SKUItems = SKUItems || [];
    this.positionId = positionId;
    this.testDescriptorIds = testDescriptorIds || [];
    this.availableQuantity = availableQuantity;
  }

  get_SKU_ID() {
    return this.ID;
  }

  set_SKU_ID(ID) {
    this.ID = ID;
  }

  get_Description() {
    return this.Description;
  }

  set_Description(Description) {
    this.Description = Description;
  }

  get_weight() {
    return this.weight;
  }

  set_weight(weight) {
    this.weight = weight;
  }

  get_volume() {
    return this.volume;
  }

  set_volume(volume) {
    this.volume = volume;
  }

  get_notes() {
    return this.notes;
  }

  set_notes(notes) {
    this.notes = notes;
  }

  get_price() {
    return this.price;
  }

  set_price(price) {
    this.price = price;
  }

  getSKUItems() {
    return this.SKUItems;
  }

  setSKUItems(SKUItems) {
    this.SKUItems = SKUItems;
  }

  get_position() {
    return this.positionId;
  }

  set_position(positionId) {
    this.positionId = positionId;
  }

  get_TestDescriptors() {
    return this.testDescriptorIds;
  }

  set_TestDescriptors(testDescriptorIds) {
    this.testDescriptorIds = testDescriptorIds;
  }

  getAvailableQuantity() {
    return this.availableQuantity;
  }

  setAvailableQuantity(availableQuantity) {
    this.availableQuantity = availableQuantity;
  }
}

module.exports = SKU;
