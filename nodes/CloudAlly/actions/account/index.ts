import { INodeProperties } from "n8n-workflow";

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		routing: {
			request: {
				url: '/resellers/accounts'
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many',
			},
		],
		default: 'getAll'
	},
];

export { description };
