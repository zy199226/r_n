export const windowH = window.innerHeight;
export const windowW = window.innerWidth;

export const time = (date) => {
	let d = new Date() - new Date(date);
	let createTime = '';
	let year = Math.floor(d/365/24/60/60/1000);
	let mouth = Math.floor(d/30/24/60/60/1000);
	let day = Math.floor(d/24/60/60/1000);
	let hours = Math.floor(d/60/60/1000);
	let min = Math.floor(d/60/1000);
	let sec = Math.floor(d/1000);
	if (year >= 1) {
		createTime = `${year}年前`;
	} else if (mouth >= 1) {
		createTime = `${mouth}月前`;
	} else if (day >= 1) {
		createTime = `${day}天前`;
	} else if (hours >= 1) {
		createTime = `${hours}小时前`;
	} else if (min >= 1) {
		createTime = `${min}分钟前`;
	} else if (sec >= 1) {
		createTime = `${sec}秒前`;
	}
	return createTime;
};
