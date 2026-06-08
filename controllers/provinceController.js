import express from "express";
import { StatusCodes } from "http-status-codes";
import provinceService from "../services/provinceService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const provinces = await provinceService.getAll();
    res.status(StatusCodes.OK).json(provinces);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const provincia = await provinceService.getById(id);

    if (!provincia) {
      return res.status(StatusCodes.NOT_FOUND).send("Provincia no encontrada");
    }

    res.status(StatusCodes.OK).json(provincia);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevaProvincia = req.body;
    const created = await provinceService.create(nuevaProvincia);
    return res.status(StatusCodes.CREATED).json(created);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const nuevaProvincia = req.body;
    const created = await provinceService.createWithId(id, nuevaProvincia);
    return res.status(StatusCodes.CREATED).json(created);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const nuevaProvincia = req.body;
    const updated = await provinceService.update(id, nuevaProvincia);

    if (!updated) {
      return res.status(StatusCodes.NOT_FOUND).send("Provincia no encontrada");
    }

    return res.status(StatusCodes.CREATED).json(updated);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const removed = await provinceService.remove(id);

    if (!removed) {
      return res.status(StatusCodes.NOT_FOUND).send("Provincia no encontrada");
    }

    return res.status(StatusCodes.OK).send("Provincia eliminada correctamente");
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

export default router;
