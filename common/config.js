const BASE_URL = 'http://119.3.241.168:9103/api/v1' // 开发环境
// /nenergy/api/v1

// const BASE_URL = 'https://wushui.cloudoptek.com' // 生产环境


let staticDomainURL = BASE_URL+ '/sys/common/static';

const config = {
	apiUrl: BASE_URL,
	staticDomainURL: staticDomainURL
};

export default config