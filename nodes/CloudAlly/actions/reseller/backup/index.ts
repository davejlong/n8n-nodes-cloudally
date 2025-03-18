import { INodeProperties } from "n8n-workflow";
import { pagination } from "../../../utilities/commonProperties";

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resourceType: ['reseller'],
				resource: ['backup'],
			},
		},
		options: [
			{
				name: 'Get Backup Tasks',
				value: 'getTasks',
				action: 'Get backup tasks',
				routing: {
					request: {
						url: '/resellers/accounts/backup-tasks',
					},
					send: {
						paginate: true,
					},
					operations: {
						...pagination,
					},
				}
			},
			{
				name: 'Get Backup Statuses',
				value: 'getStatuses',
				action: 'Get backup statuses',
				routing: {
					request: {
						url: '/resellers/accounts/backup-statuses',
					},
					send: {
						paginate: true,
					},
					operations: {
						...pagination,
					},
				},
			},
		],
		default: 'getTasks',
	},
];
