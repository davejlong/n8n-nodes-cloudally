import {
	DeclarativeRestApiSettings,
	IDataObject,
	IDisplayOptions,
	IExecuteFunctions,
	IExecutePaginationFunctions,
	IExecuteSingleFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeProperties,
	INodePropertyOptions,
	IPollFunctions,
	IWebhookFunctions,
} from 'n8n-workflow';

export async function cloudAllyApiRequest(
	this:
		| IExecuteFunctions
		| IExecuteSingleFunctions
		| IWebhookFunctions
		| IPollFunctions
		| IHookFunctions
		| ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	url?: string,
	option: IDataObject = {},
) {
	let options: IHttpRequestOptions = {
		headers: { 'Content-Type': 'application/json' },
		method,
		body,
		qs,
		url: url ?? `https://api.cloudally.com/v2/${resource}`,
		json: true,
	};

	if (!Object.keys(body).length) {
		delete options.body;
	}
	if (!Object.keys(qs).length) {
		delete options.qs;
	}

	this.logger.debug(`CLOUDALLY: API Request`, options);

	options = Object.assign({}, options, option);

	return await this.helpers.httpRequestWithAuthentication.call(
		this,
		'cloudAllyPartnerApi',
		options,
	);
}

export async function cloudAllyApiPagination(
	this: IExecutePaginationFunctions,
	requestData: DeclarativeRestApiSettings.ResultOptions,
): Promise<INodeExecutionData[]> {
	const responseData: INodeExecutionData[] = [];
	const rootProperty = 'data';

	requestData.options.qs = requestData.options.qs ?? {};
	let responseTotal = 0;

	do {
		const pageResponseData: INodeExecutionData[] = await this.makeRoutingRequest(requestData);

		this.logger.debug('CLOUDALLY: Paginated request', pageResponseData);

		const items = pageResponseData[0].json[rootProperty] as [];
		items.forEach((item) => responseData.push({ json: item }));

		const page = (pageResponseData[0].json.page as number) || 0;
		requestData.options.qs.page = page + 1;
		responseTotal = (pageResponseData[0].json.total as number) || 0;
	} while (responseTotal > responseData.length);

	return responseData;
}

export async function getAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
	const responseData: INodePropertyOptions[] = [];

	const qs = {
		page: 1,
	};
	let responseTotal = 0;
	do {
		const pageResponseData = await cloudAllyApiRequest.call(this, 'GET', 'resellers/accounts', {}, qs);
		const items = pageResponseData.data as [{name: string, id: string}];
		items.forEach(item => responseData.push({
			name: item.name,
			value: item.id,
		}));

		qs.page++;

		responseTotal = pageResponseData.total as number || 0;
	} while (responseTotal > responseData.length)

	return responseData;
}

export function getAccountsProperty(displayOptions:IDisplayOptions): INodeProperties {
	return {
		displayName: 'Account Name or ID',
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
		name: 'accountId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getAccounts',
		},
		default: '',
		displayOptions,
		routing: {
			request: {
				baseURL: "=https://api.cloudally.com/v2/resellers/accounts/{{$value}}"
			},
		},
	};
}
