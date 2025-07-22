import { INodeProperties } from 'n8n-workflow';
import * as account from './account';
import * as bill from './bill';
import * as backupTask from './backup-task';
import * as backupStatus from './backup-status';

export const description: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resourceType: ['reseller'],
			},
		},
		options: [
			{ name: 'Account', value: 'account' },
			{ name: 'Backup Status', value: 'backupStatus' },
			{ name: 'Backup Task', value: 'backupTask' },
			{ name: 'Bill', value: 'bill'},
		],
		default: 'account',
	},
	...account.description,
	...bill.description,
	...backupStatus.description,
	...backupTask.description,
]
