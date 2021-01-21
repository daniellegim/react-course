import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin } from '@microsoft/applicationinsights-react-js'
import { createBrowserHistory } from 'history'

const browserHistory = createBrowserHistory({ basename: '' })
const reactPlugin = new ReactPlugin()
const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: '5552550f-0904-4b8c-a1fc-8792d3cd44f7',
        extensions: [reactPlugin],
        extensionConfig: {
          [reactPlugin.identifier]: { history: browserHistory }
        }
    }
})

appInsights.loadAppInsights()
export { reactPlugin, appInsights }