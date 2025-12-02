import { getAgentById, getAllAgents } from './agents';
import { getAllMaps } from './maps';

const db = {};

db.agents = { getAll: getAllAgents, getOneById: getAgentById };
db.maps = { getAll: getAllMaps };

export default db;
