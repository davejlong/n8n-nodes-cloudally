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
				url: '/accounts',
			},
			send: {
				paginate: true,
			}
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many accounts',
				description: '/Retrieve many bills'
			},
		],
		default: 'getAll'
	},
];

export { description };
