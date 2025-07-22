import { INodeProperties } from "n8n-workflow";

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resourceType: ['reseller'],
				resource: ['backupStatus'],
			},
		},
		routing: {
			request: {
				url: '/accounts/backup-statuses',
			},
			send: {
				paginate: true,
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many backup statuses',
				description: 'Retrieve status of many backup tasks',
			}
		],
		default: 'getAll'
	}
];
