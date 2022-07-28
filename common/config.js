const BASE_URL = 'http://localhost:9999/nenergy/api/v1' // 开发环境

// const BASE_URL = 'https://wushui.cloudoptek.com' // 生产环境


let staticDomainURL = BASE_URL+ '/sys/common/static';

const config = {
	apiUrl: BASE_URL,
	staticDomainURL: staticDomainURL
};

export default config