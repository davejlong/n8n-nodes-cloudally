import { INodeProperties } from "n8n-workflow";
import { pagination } from "../../../utilities/GenericProperties";
import { getAccountsProperty } from "../../../utilities/GenericFunctions";

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
				name: 'Get Backup Statuses',
				value: 'getStatuses',
				action: 'Get backup statuses',
				routing: {
					request: {
						url: '/backup-statuses',
					},
					send: {
						paginate: true,
					},
					operations: {
						...pagination,
					},
				},
			},
			{
				name: 'Get Backup Tasks',
				value: 'getTasks',
				action: 'Get backup tasks',
				routing: {
					request: {
						url: '/backup-tasks',
					},
					send: {
						paginate: true,
					},
					operations: {
						...pagination,
					},
				}
			},
		],
		default: 'getTasks',
	},
	{
		displayName: 'Get All Accounts',
		description: 'Whether to get items for all accounts or filter by account',
		name: 'allAccounts',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resourceType: ['reseller'],
				resource: ['backup'],
				operation: ['getTasks'],
			}
		},
		routing: {
			request: {
				baseURL: "https://api.cloudally.com/v2/resellers/accounts",
			}
		}
	},
	getAccountsProperty({
		show: {
			resourceType: ['reseller'],
			resource: ['backup'],
			operation: ['getTasks'],
		},
		hide: {
			allAccounts: [true]
		}
	}),
	{
		displayName: 'Task ID',
		description: 'Backup Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resourceType: ['reseller'],
				resource: ['backup'],
				operation: ['getTasks'],
			},
		},
		routing: {
			request: {
				url: "=/backup-tasks{{$value}}",
			},
		},
	},
];
