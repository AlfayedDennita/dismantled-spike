import { getAgentById, getAllAgents } from './agents';

const db = {};

db.agents = { getAll: getAllAgents, getOneById: getAgentById };

export default db;
