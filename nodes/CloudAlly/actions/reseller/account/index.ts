import { INodeProperties } from "n8n-workflow";

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resourceType: ['reseller'],
				resource: ['account'],
			},
		},
		routing: {
			request: {
				url: '/resellers/accounts',
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many accounts',
			},
		],
		default: 'getAll'
	},
];

export { description };
