import provinceRepository from "../repositories/provinceRepository.js";

const getAll = async () => await provinceRepository.getAll();

const getById = async (id) => await provinceRepository.getById(id);

const create = async (data) => await provinceRepository.add(data);

const createWithId = async (id, data) => await provinceRepository.addWithId(id, data);

const update = async (id, data) => await provinceRepository.update(id, data);

const remove = async (id) => await provinceRepository.remove(id);

export default {
  getAll,
  getById,
  create,
  createWithId,
  update,
  remove,
};
