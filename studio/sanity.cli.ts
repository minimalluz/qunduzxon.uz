import { defineCliConfig } from 'sanity/cli'
import { projectId, dataset } from './env'

export default defineCliConfig({
  api: { projectId, dataset },
  // `npm run deploy` дан кейин админ панел манзили: https://qunduzxon.sanity.studio
  studioHost: 'qunduzxon',
  deployment: { appId: 'k8qzii1ahazscuat6wpswss1', autoUpdates: false },
})
