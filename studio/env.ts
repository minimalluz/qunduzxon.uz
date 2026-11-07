// Sanity лойиҳаси. projectId ни sanity.io/manage саҳифасидан олинг ва шу ерга ёзинг
// (ёки SANITY_STUDIO_PROJECT_ID муҳит ўзгарувчисига). Бу махфий эмас.
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'todo-project-id'
export const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
