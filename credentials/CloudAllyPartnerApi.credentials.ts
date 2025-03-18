import { IAuthenticateGeneric, ICredentialDataDecryptedObject, ICredentialTestRequest, ICredentialType, IHttpRequestHelper, INodeProperties } from "n8n-workflow";

export class cloudAllyPartnerApi implements ICredentialType {
	name = 'cloudAllyPartnerApi';
	displayName = 'CloudAlly Partner API';
	documentationUrl = 'https://github.com/davejlong/n8n-nodes-cloudally';
	properties: INodeProperties[] = [
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Email Address',
			name: 'email',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'hidden',
			typeOptions: {
				expirable: true,
				password: true,
			},
			default: '',
		},
	];
	async preAuthentication(
		this: IHttpRequestHelper,
		credentials: ICredentialDataDecryptedObject
	) {
		const { accessToken } = (await this.helpers.httpRequest({
			method: 'POST',
			url: 'https://api.cloudally.com/v2/auth/partner',
			headers: {
				'client-id': credentials.clientId,
				'client-secret': credentials.clientSecret,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: {
				email: credentials.email,
				password: credentials.password,
			},
		})) as { accessToken: string };

		console.log(`[CLOUDALLY] Access Token: ${accessToken}`);

		return { accessToken };
	};

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': "={{$credentials.accessToken}}",
				'client-id': "={{$credentials.clientId}}",
				'client-secret': "={{$credentials.clientSecret}}",
			}
		}
	}
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.cloudally.com/v2',
			url: '/user'
		}
	}
}
