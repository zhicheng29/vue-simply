// vite.config.js
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import viteImagemin from "vite-plugin-imagemin";
import externalGlobals from "rollup-plugin-external-globals";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		visualizer({ open: true }),
		// 将下面的添加到plugin下
		createHtmlPlugin({
			minify: true,
			inject: {
				data: {
					vuescript: '<script src="https://cdn.jsdelivr.net/npm/vue@3.2.25"></script>',
					demiScript: '<script src="//cdn.jsdelivr.net/npm/vue-demi@0.13.7"></script>',
					elementPlusScript: `
            <link href="https://cdn.jsdelivr.net/npm/element-plus@2.2.22/dist/index.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/element-plus@2.2.22/dist/index.full.min.js"></script>
          `,
					echartsSciprt: '<script src="https://cdn.jsdelivr.net/npm/echarts@5.0.2/dist/echarts.min.js"></script>'
				}
			}
		}),
		viteImagemin({
			gifsicle: {
				optimizationLevel: 7,
				interlaced: false
			},
			optipng: {
				optimizationLevel: 7
			},
			mozjpeg: {
				quality: 20
			},
			pngquant: {
				quality: [0.8, 0.9],
				speed: 4
			},
			svgo: {
				plugins: [
					{
						name: "removeViewBox"
					},
					{
						name: "removeEmptyAttrs",
						active: false
					}
				]
			}
		})
	],
	build: {
		target: "es2020",
		minify: "terser",
		// rollup 配置
		rollupOptions: {
			output: {
				chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
				entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
				assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return "vendor";
					}
				}
			},
			//  告诉打包工具 在external配置的 都是外部依赖项  不需要打包
			external: ["vue", "element-plus", "echarts"],
			plugins: [
				externalGlobals({
					vue: "Vue",
					"element-plus": "ElementPlus",
					echarts: "echarts",
					"vue-demi": "VueDemi"
				}),
				viteCompression({
					verbose: true, // 是否在控制台中输出压缩结果
					disable: false,
					threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
					algorithm: "gzip", // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
					ext: ".gz",
					deleteOriginFile: false // 源文件压缩后是否删除
				})
			]
		},
		terserOptions: {
			compress: {
				// 生产环境时移除console
				drop_console: true,
				drop_debugger: true
			}
		}
	}
});
