// debounce 防抖
export class Debounce {
	/**
	 * @description debounce 防抖函数
	 * @param fn 需要节流的函数
	 * @param delay 延迟时间
	 * @param immediate 是否立即执行
	 * @param timer 计时器
	 * @returns 节流过的函数
	 */
	private timer: any;
	constructor(timer: any = null) {
		this.timer = timer;
	}
	public use = (fn: Function, delay: number = 500, immediate: boolean = true): Function => {
		return (...args: any[]) => {
			if (immediate) {
				fn.apply(this, args);
				immediate = false;
				return;
			}
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				fn.apply(this, args);
			}, delay);
		};
	};
	// 取消 当前防抖函数执行
	public cancel() {
		clearTimeout(this.timer);
		this.timer = null;
	}
}

// 节流
