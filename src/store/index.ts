import { createPinia, defineStore } from "pinia";
import { GlobalState, systemConfigOptions } from "./interface";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"; // 持久化

export const GlobalStore = defineStore("GlobalState", {
	state: (): GlobalState => ({
		token: "",
		language: "",
		systemConfig: {
			isCollapse: false
		}
	}),
	getters: {},
	actions: {
		setToken(token: string) {
			this.token = token;
		},
		setCollapse(systemConfig: systemConfigOptions) {
			this.systemConfig = systemConfig;
		},
		setLanguage(language: string) {
			this.language = language;
		}
	},
	persist: {
		key: "GlobalState", // 持久化存入的key
		storage: localStorage // 持久化方式
	}
});
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;