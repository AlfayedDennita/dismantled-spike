import { getAllAgents } from './agents';

const db = {};

db.agents = { getAll: getAllAgents };

export default db;
