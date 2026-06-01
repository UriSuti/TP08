import express from "express";
import cors from "cors";
// import ProvinceRouter from "./src/controllers/province-controller.js"
import { StatusCodes } from "http-status-codes";

const provincias = [
  { id: 1, name: "Buenos Aires", full_name: "Provincia de Buenos Aires", latitude: -36.6769, longitude: -60.5588 },
  { id: 2, name: "Catamarca", full_name: "Provincia de Catamarca", latitude: -28.4696, longitude: -65.7852 },
  { id: 3, name: "Chaco", full_name: "Provincia del Chaco", latitude: -26.3864, longitude: -60.7653 },
  { id: 4, name: "Chubut", full_name: "Provincia del Chubut", latitude: -43.3002, longitude: -65.1023 },
  { id: 5, name: "Córdoba", full_name: "Provincia de Córdoba", latitude: -31.3993, longitude: -64.2644 },
  { id: 6, name: "Corrientes", full_name: "Provincia de Corrientes", latitude: -27.4692, longitude: -58.8306 },
  { id: 7, name: "Entre Ríos", full_name: "Provincia de Entre Ríos", latitude: -32.0589, longitude: -59.2013 },
  { id: 8, name: "Formosa", full_name: "Provincia de Formosa", latitude: -24.8949, longitude: -60.1146 },
  { id: 9, name: "Jujuy", full_name: "Provincia de Jujuy", latitude: -23.3193, longitude: -65.7643 },
  { id: 10, name: "La Pampa", full_name: "Provincia de La Pampa", latitude: -36.6167, longitude: -64.2833 },
  { id: 11, name: "La Rioja", full_name: "Provincia de La Rioja", latitude: -29.4131, longitude: -66.8558 },
  { id: 12, name: "Mendoza", full_name: "Provincia de Mendoza", latitude: -34.7876, longitude: -68.4382 },
  { id: 13, name: "Misiones", full_name: "Provincia de Misiones", latitude: -27.4269, longitude: -55.9467 },
  { id: 14, name: "Neuquén", full_name: "Provincia del Neuquén", latitude: -38.9487, longitude: -68.0591 },
  { id: 15, name: "Río Negro", full_name: "Provincia de Río Negro", latitude: -40.8261, longitude: -63.0029 },
  { id: 16, name: "Salta", full_name: "Provincia de Salta", latitude: -24.7996, longitude: -65.4150 },
  { id: 17, name: "San Juan", full_name: "Provincia de San Juan", latitude: -30.8654, longitude: -68.8895 },
  { id: 18, name: "San Luis", full_name: "Provincia de San Luis", latitude: -33.7577, longitude: -66.0281 },
  { id: 19, name: "Santa Cruz", full_name: "Provincia de Santa Cruz", latitude: -48.8155, longitude: -69.9558 },
  { id: 20, name: "Santa Fe", full_name: "Provincia de Santa Fe", latitude: -30.7069, longitude: -60.9498 },
  { id: 21, name: "Santiago del Estero", full_name: "Provincia de Santiago del Estero", latitude: -27.7834, longitude: -64.2642 },
  { id: 22, name: "Tierra del Fuego", full_name: "Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur", latitude: -54.4296, longitude: -67.1955 },
  { id: 23, name: "Tucumán", full_name: "Provincia de Tucumán", latitude: -26.8221, longitude: -65.2226 },
  { id: 24, name: "CABA", full_name: "Ciudad Autónoma de Buenos Aires", latitude: -34.6037, longitude: -58.3816 }
];


const app = express();
const port = 3000;

app.use(cors());

app.use (express.json());


app.get("/api/province", (req, res) => {
  res.status(StatusCodes.OK).json(provincias);
});

app.get("/api/province/:id", (req, res) => {
  const id = Number(req.params.id);

  const provincia = provincias.find(p => p.id === id);

  if (!provincia) {
    return res.status(StatusCodes.NOT_FOUND).send("Provincia no encontrada");
  }

  res.status(StatusCodes.OK).json(provincia);
});

app.post("/api/province/", (req, res) => {

    const nuevaProvincia = req.body;
    const ultimaProvincia = provincias.length + 1
    
    const provinciaCreada = {
        id: provincias[ultimaProvincia].id,
        name: nuevaProvincia.name,
        full_name: nuevaProvincia.full_name,
        latitude: nuevaProvincia.latitude,
        longitude: nuevaProvincia.longitude,
        display_order: nuevaProvincia.display_order
    };

    provincias.push(provinciaCreada);
  
    return res.status(StatusCodes.CREATED).json(provinciaCreada);

})


app.post("/api/province/:id", (req, res) => {

    const nuevaProvincia = req.body;
    const id = Number(req.params.id);

    const provincia = provincias.find(p => p.id === id)


    const provinciaCreada = {
        id: provincia.id?provincia.id:id,
        name: nuevaProvincia.name,
        full_name: nuevaProvincia.full_name,
        latitude: nuevaProvincia.latitude,
        longitude: nuevaProvincia.longitude,
        display_order: nuevaProvincia.display_order
    };

    provincias.push(provinciaCreada);
  
    return res.status(StatusCodes.CREATED).json(provinciaCreada);

})

app.put("/api/province/:id", (req, res) => {

    const nuevaProvincia = req.body;
    const id = Number(req.params.id);
    const provincia = provincias.find(p => p.id === id);


    const provinciaCreada = {
        id: id,
        name: nuevaProvincia.name?nuevaProvincia.name: provincia.name,
        full_name: nuevaProvincia.full_name?nuevaProvincia.full_name: provincia.full_name,
        latitude: nuevaProvincia.latitude?nuevaProvincia.latitude: provincia.latitude,
        longitude: nuevaProvincia.longitude?nuevaProvincia.longitude: provincia.longitude,
        display_order: nuevaProvincia.display_order?nuevaProvincia.display_order: provincia.display_order
    };
    
    provincias.slice(id, 1); 
    provincias.push(provinciaCreada);
  
    return res.status(StatusCodes.CREATED).json(provinciaCreada);



})


app.delete("/api/province/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = provincias.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(StatusCodes.NOT_FOUND).send("Provincia no encontrada");
    }

    provincias.splice(index, 1);

    return res.status(StatusCodes.OK).send("Provincia eliminada correctamente");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

