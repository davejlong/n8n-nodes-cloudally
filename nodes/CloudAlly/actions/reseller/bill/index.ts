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
				resource: ['bill'],
			},
		},
		routing: {
			request: {
				url: '/resellers/bills',

			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many bills',
			},
		],
		default: 'getAll'
	},
];

export { description };
