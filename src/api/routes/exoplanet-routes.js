import { Router } from 'express';
const router = Router();
import { getPlanets, getPlanetById, createPlanet, updatePlanet, deletePlanet } from '../controller/planet-controller.js';
import auth from '../middleware/auth.js';

router.get('/', getPlanets);
router.get('/:id', getPlanetById);
router.post('/', auth, createPlanet); 
router.put('/:id', auth, updatePlanet); 
router.delete('/:id', auth, deletePlanet); 

export default router;