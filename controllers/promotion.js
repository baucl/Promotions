const CosmosClient = require("@azure/cosmos").CosmosClient;
const { endpoint, key, databaseId, containerId, query } = require("../config").configAzureCosmosDb;
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

const getAllPromotion = async (req, res) => {
  try {
    const queryString = {
      query,
    };
    const { resources: items } = await container.items
      .query(queryString)
      .fetchAll();

    res.json({
      value: items.sort((a, b) => a.id - b.id),
      success: true,
      error: null,
    });
  } catch (error) {
    res.send({ value: null, success: false, error: error.message });
  }
};

const createPromotion = async (req, res) => {
  try {
    const { resource: createdItem } = await container.items.create(req.body);
    res.send({ value: createdItem, success: true, error: null });
  } catch (error) {
    res.send({ value: null, success: false, error: error.message });
  }
};

const editPromotion = async (req, res) => {
  try {
    delete req.body["_rid"];
    delete req.body["_self"];
    delete req.body["_etag"];
    delete req.body["_attachments"];
    delete req.body["_ts"];
    delete req.body["key"];
    delete req.body["partition"];

    const { resource: updatedItem } = await container
      .item(req.body.id)
      .replace(req.body);
    res.send({ value: updatedItem, success: true, error: null });
  } catch (error) {
    res.send({ value: null, success: false, error: error.message });
  }
};

const deletePromotion = async (req, res) => {
  try {
    const { resource: result } = await container.item(req.params.id).delete();
    res.send({ value: result, success: true, error: null });
  } catch (error) {
    res.send({ value: null, success: false, error: error.message });
  }
};

module.exports = {
  getAllPromotion,
  createPromotion,
  editPromotion,
  deletePromotion,
};