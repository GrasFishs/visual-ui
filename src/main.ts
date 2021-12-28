import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'uno.css'
import 'element-plus/dist/index.css'
import 'normalize.css'
import draggable from './components/widget/common/draggable'

const app = createApp(App).use(router)

app.directive('drag', draggable)

app.mount('#app')
