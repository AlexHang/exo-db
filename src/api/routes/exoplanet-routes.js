import { Router } from 'express';
const router = Router();
import { getPlanets, getPlanetById, createPlanet, updatePlanet, deletePlanet } from '../controller/planet-controller.js';

router.get('/', getPlanets);
router.get('/:id', getPlanetById);
router.post('/', createPlanet);
router.put('/:id', updatePlanet);
router.delete('/:id', deletePlanet);

export default router;