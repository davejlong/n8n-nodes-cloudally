import { INodeProperties } from "n8n-workflow";
import { getAccountsProperty } from "../../../utilities/GenericFunctions";

export const tasks: INodeProperties[] = [
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
			allAccounts: [true],
		},
	}),
	getAccountsProperty({
		show: {
			resourceType: ['reseller'],
			resource: ['backup'],
			operation: ['getTask'],
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
				resource: ['backup'],
				operation: ['getTask'],
			},
		},
		routing: {
			request: {
				url: "=/backup-tasks{{$if($value, '/' + $value, '')}}",
			},
		},
	},
];
