import { INodeProperties } from "n8n-workflow";
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
				resource: ['backupTask'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many backup tasks',
				description: 'Retrieve many backup tasks',
				routing: {
					send: {
						paginate: true,
					},
					request: {
						url: '=/accounts{{$if($parameter.accountId, "/" + $parameter.accountId, "")}}/backup-tasks',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a backup task',
				description: 'Retrieve a backup task',
				routing: {
					request: {
						url: '=/accounts/{{$parameter.accountId}}/backup-tasks/{{$parameter.taskId}}',
					},
				},
			}
		],
		default: 'getAll'
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
				resource: ['backupTask'],
				operation: ['getAll'],
			}
		},
		// routing: {
		// 	request: {
		// 		baseURL: "https://api.cloudally.com/v2/resellers/accounts",
		// 	}
		// }
	},
	getAccountsProperty({
		show: {
			resourceType: ['reseller'],
			resource: ['backupTask'],
			operation: ['getAll'],
		},
		hide: {
			allAccounts: [true],
		},
	}),
	getAccountsProperty({
		show: {
			resourceType: ['reseller'],
			resource: ['backupTask'],
			operation: ['get'],
		},
	}),
	{
		displayName: 'Task ID',
		description: 'Backup Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resourceType: ['reseller'],
				resource: ['backupTask'],
				operation: ['get'],
			},
		},
	},
];
