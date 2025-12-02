import { getAgentById, getAllAgents } from './agents';
import { getAllMaps, getMapById } from './maps';

const db = {};

db.agents = { getAll: getAllAgents, getOneById: getAgentById };
db.maps = { getAll: getAllMaps, getOneById: getMapById };

export default db;
