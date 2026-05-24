import { Poi } from './poi.js';

export const poiStore = {
  async getAllPois() {
    return Poi.find().lean();
  },
  async getPoiById(id) {
    if (!id) return null;
    return Poi.findOne({ _id: id }).lean();
  },
  async getUserPois(userid) {
    return Poi.find({ userid }).lean();
  },
  async addPoi(poi) {
    const saved = await new Poi(poi).save();
    return this.getPoiById(saved._id);
  },
  async updatePoi(id, fields) {
    await Poi.updateOne({ _id: id }, { $set: fields });
    return this.getPoiById(id);
  },
  async deletePoiById(id) {
    await Poi.deleteOne({ _id: id });
  },
  async deleteAll() {
    await Poi.deleteMany({});
  }
};
