const BASE_URL = 'http://8.142.149.12' // 开发环境

// const BASE_URL = 'https://wushui.cloudoptek.com' // 生产环境


let staticDomainURL = BASE_URL+ '/sys/common/static';

const config = {
	apiUrl: BASE_URL,
	staticDomainURL: staticDomainURL
};

export default config