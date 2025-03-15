import Exoplanet from '../model/exoplanet.js';

export async function getPlanets(req, res) {
  try {
    const planets = await Exoplanet.find();
    res.json(planets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getPlanetById(req, res) {
  try {
    const planet = await Exoplanet.findById(req.params.id);
    if (!planet) {
      return res.status(404).json({ message: 'planet not found' });
    }
    res.json(planet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createPlanet(req, res) {
  const { name, distance, discoveryYear, description, imageUrl } = req.body;

  try {
    const planet = new Exoplanet({
      name,
      distance,
      discoveryYear,
      description,
      imageUrl
    });

    const savedplanet = await planet.save();
    res.status(201).json(savedplanet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updatePlanet(req, res) {
  try {
    const planet = await Exoplanet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!planet) {
      return res.status(404).json({ message: 'planet not found' });
    }
    
    res.json(planet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deletePlanet(req, res) {
  try {
    const planet = await Exoplanet.findByIdAndDelete(req.params.id);
    
    if (!planet) {
      return res.status(404).json({ message: 'planet not found' });
    }
    
    res.json({ message: 'planet deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}