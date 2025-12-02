import { getAgentById, getAllAgents } from './agents';
import { getAllMaps, getMapById } from './maps';
import { getAllWeapons } from './weapons';

const db = {};

db.agents = { getAll: getAllAgents, getOneById: getAgentById };
db.maps = { getAll: getAllMaps, getOneById: getMapById };
db.weapons = { getAll: getAllWeapons };

export default db;
