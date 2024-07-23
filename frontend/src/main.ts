import { createApp } from "vue";

import App from "@/App.vue";
import { registerPlugins } from "@core/utils/plugins";

// Styles
import "@core/scss/template/index.scss";
import ganttastic from "@infectoone/vue-ganttastic";
import "@styles/index.css";
import "@styles/styles.scss";

// Create vue app
const app = createApp(App);

// Register plugins
registerPlugins(app);

// Mount vue app
app.use(ganttastic);
app.mount("#app");
