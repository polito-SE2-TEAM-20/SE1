const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

const {
  deleteDb,
  randomInt,
  randomString,
} = require("../unit_test/test-utils");
const DatabaseHandler = require("../dbms");
const Position = require("../models/position");
const SKU = require("../models/sku");

let agent;
const insertedSKUCount = 5;
const insertedSKUPayloads = [];
const insertedPositionIds = [];

describe("Test SKU APIs", async () => {
  for (let i = 1; i <= insertedSKUCount; i++) {
    positionId = String(randomInt(10000000000));
    insertedPositionIds.push(positionId);
    insertedSKUPayloads.push({
      id: i,
      description: randomString(),
      weight: randomInt(),
      volume: randomInt(),
      notes: randomString(),
      price: 10.99,
      availableQuantity: randomInt(),
      position: positionId,
      availableQuantity: randomInt(),
      testDescriptors: [],
    });
  }

  const description = "a new sku";
  const weight = 100;
  const volume = 50;
  const notes = "first SKU";
  const price = 10.99;
  const availableQuantity = 50;
  const position = "800234523412";
  const newDescription = "a new new";
  const newWeight = 17;
  const newVolume = 13;
  const newNotes = "first SKU updated";
  const newPrice = 11.99;
  const newAvailableQuantity = 5;

  beforeEach(async () => {
    deleteDb();

    const db = new DatabaseHandler();
    await db.init();
    await db.storePosition(
      new Position(
        position,
        String(randomInt()),
        String(randomInt()),
        String(randomInt()),
        randomInt(),
        randomInt(),
        randomInt(),
        randomInt()
      )
    );
    for (let i = 0; i < insertedSKUCount; i++) {
      const skuPayload = insertedSKUPayloads[i];
      await db.storePosition(
        new Position(
          insertedPositionIds[i],
          String(randomInt()),
          String(randomInt()),
          String(randomInt()),
          randomInt(),
          randomInt(),
          randomInt(),
          randomInt()
        )
      );
      await db.storeSKU(
        new SKU(
          skuPayload["id"],
          skuPayload["description"],
          skuPayload["weight"],
          skuPayload["volume"],
          skuPayload["notes"],
          skuPayload["price"],
          [], // SKUItems are read-only, so useless for the test
          skuPayload["position"],
          skuPayload["testDescriptors"],
          skuPayload["availableQuantity"]
        )
      );
    }

    const generateApp = require("../server");
    const app = await generateApp();
    agent = chai.request.agent(app);
  });

  getAllSKUTest(200, insertedSKUPayloads);

  getSingleSKUTest(200, 1, insertedSKUPayloads[0]);
  getSingleSKUTest(404, insertedSKUCount + 5);
  getSingleSKUTest(422, "testid");

  insertSKUTest(
    201,
    true,
    description,
    weight,
    volume,
    notes,
    price,
    availableQuantity
  );
  insertSKUTest(
    422,
    false,
    description,
    weight,
    "aaa",
    notes,
    price,
    availableQuantity
  );

  updateSKUTest(
    200,
    true,
    1,
    newDescription,
    newWeight,
    newVolume,
    newNotes,
    newPrice,
    newAvailableQuantity
  );
  updateSKUTest(
    404,
    false,
    insertedSKUCount + 5,
    newDescription,
    newWeight,
    newVolume,
    newNotes,
    newPrice,
    newAvailableQuantity
  );
  updateSKUTest(
    422,
    false,
    1,
    newDescription,
    newWeight,
    newVolume,
    newNotes,
    "adsa",
    newAvailableQuantity
  );

  setSKUPositionTest(200, 1, position, insertedSKUPayloads[0]);
  setSKUPositionTest(404, insertedSKUCount + 5, position);
  setSKUPositionTest(404, 1, "100000000001");
  // TODO: 422

  deleteSKUTest(204, 404, 1);
  deleteSKUTest(422, null, insertedSKUCount + 5);
  deleteSKUTest(422, null, "notanid");
});

function getAllSKUTest(expectedHTTPStatus, expectedPayloads) {
  it("Getting all SKUs", async function () {
    let res = await agent.get("/api/skus");
    res.should.have.status(expectedHTTPStatus);
    res.body.length.should.be.equal(expectedPayloads.length);
    for (let payload of expectedPayloads) {
      const foundPayload = res.body.find((row) => row.id === payload.id);
      foundPayload.should.exist;
      for (let key of [
        "id",
        "description",
        "weight",
        "volume",
        "notes",
        "position",
        "availableQuantity",
        "price",
        "testDescriptors",
      ]) {
        foundPayload.should.have.property(key);
        if (typeof foundPayload[key] == "object")
          expect(foundPayload[key]).eql(payload[key]);
        else expect(foundPayload[key]).equal(payload[key]);
      }
    }
  });
}

function getSingleSKUTest(expectedHTTPStatus, id, expectedPayload) {
  it("Getting a single SKU", async function () {
    let res = await agent.get("/api/skus/" + id);
    res.should.have.status(expectedHTTPStatus);
    if (expectedPayload) {
      for (let key of [
        "description",
        "weight",
        "volume",
        "notes",
        "position",
        "availableQuantity",
        "price",
        "testDescriptors",
      ]) {
        res.body.should.have.property(key);
        if (typeof res.body[key] == "object")
          expect(res.body[key]).eql(expectedPayload[key]);
        else expect(res.body[key]).equal(expectedPayload[key]);
      }
    }
  });
}

function insertSKUTest(
  expectedHTTPStatus,
  checkResponse,
  description,
  weight,
  volume,
  notes,
  price,
  availableQuantity
) {
  const payload = {
    description: description,
    weight: weight,
    volume: volume,
    notes: notes,
    price: price,
    availableQuantity: availableQuantity,
  };

  it("Creating a new SKU", async function () {
    let res = await agent.post("/api/sku").send(payload);
    res.should.have.status(expectedHTTPStatus);

    if (checkResponse) {
      const id = insertedSKUCount + 1;
      res = await agent.get("/api/skus/" + id);
      for (let key of Object.keys(payload)) {
        res.body.should.have.property(key);
        if (typeof res.body[key] == "object")
          expect(res.body[key]).eql(payload[key]);
        else expect(res.body[key]).equal(payload[key]);
      }
    }
  });
}

function updateSKUTest(
  expectedHTTPStatus,
  checkResponse,
  id,
  newDescription,
  newWeight,
  newVolume,
  newNotes,
  newPrice,
  newAvailableQuantity
) {
  const payload = {
    newDescription: newDescription,
    newWeight: newWeight,
    newVolume: newVolume,
    newNotes: newNotes,
    newPrice: newPrice,
    newAvailableQuantity: newAvailableQuantity,
  };

  const checkpayload = {
    description: newDescription,
    weight: newWeight,
    volume: newVolume,
    notes: newNotes,
    price: newPrice,
    availableQuantity: newAvailableQuantity,
  };

  it("Updating a SKU", async function () {
    let res = await agent.put("/api/sku/" + id).send(payload);
    res.should.have.status(expectedHTTPStatus);

    if (checkResponse) {
      res = await agent.get("/api/skus/" + id);
      for (let key of Object.keys(checkpayload)) {
        res.body.should.have.property(key);
        if (typeof res.body[key] == "object")
          expect(res.body[key]).eql(checkpayload[key]);
        else expect(res.body[key]).equal(checkpayload[key]);
      }
    }
  });
}

function setSKUPositionTest(expectedHTTPStatus, id, position, originalPayload) {
  const payload = {
    position: position,
  };

  it("Setting SKU Position", async function () {
    let res = await agent.put("/api/sku/" + id + "/position").send(payload);
    res.should.have.status(expectedHTTPStatus);

    if (originalPayload) {
      res = await agent.get("/api/skus/" + id);
      for (let key of [
        "description",
        "weight",
        "volume",
        "notes",
        "position",
        "availableQuantity",
        "price",
        "testDescriptors",
      ]) {
        res.body.should.have.property(key);
        if (key == "position") expect(res.body[key]).equal(position);
        else if (typeof res.body[key] == "object")
          expect(res.body[key]).eql(originalPayload[key]);
        else expect(res.body[key]).equal(originalPayload[key]);
      }
    }
  });
}

function deleteSKUTest(expectedHTTPStatus, expectedGetSKUHTTPStatus, id) {
  it("Deleting SKU", async function () {
    let res = await agent.delete("/api/skus/" + id);
    res.should.have.status(expectedHTTPStatus);

    if (expectedGetSKUHTTPStatus) {
      res = await agent.get("/api/skus/" + id);
      res.should.have.status(expectedGetSKUHTTPStatus);
    }
  });
}
