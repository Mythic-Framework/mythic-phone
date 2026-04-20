export interface DataState {
	data: Record<string, any>;
}

export const initialState: DataState = {
	data: {
		installed: [],
		home: [],
		dock: [],
		externalJobs: ['police', 'ems'],
		onDuty: null,
		player: {
			Source: 1,
			_id: '6088b90c93a7b379e0c83ef2',
			ID: '6088b90c93a7b379e0c83ef2',
			User: '606c22a749c1c980e8289b35',
			SID: 1,
			Phone: '121-195-9016',
			Gender: 0,
			Callsign: 404,
			Job: {
				Workplace: {
					Id: 'dyn8',
					Name: 'Dynasty 8',
				},
				Name: 'Real Estate',
				Grade: {
					Id: 'owner',
					Name: 'Owner',
				},
				Id: 'realestate',
			},
			Origin: 'United States',
			First: 'Testy',
			Last: 'McTest',
			DOB: '1991-01-01T07:59:59.000Z',
			LastPlayed: 1619819253000,
			Keys: {
				'60af7d605716b35d64c6c4a1': true,
			},
			Alias: {
				twitter: {
					avatar: '',
					name: 'sdfsdf',
				},
				irc: 'anon6088b',
				redline: 'Test',
			},
			Crypto: {
				ZRM: 100,
				VRM: 10000,
				MEME: 100,
			},
			Animations: {
				expression: 'default',
				walk: 'default',
				emoteBinds: [],
			},
			Apps: {
				home: [
					...(import.meta.env.DEV ? ['lsunderground'] : []),
					'redline',
					'blueline',
					'twitter',
					'leoassist',
					'bank',
					'irc',
					'adverts',
					'store',
					'settings',
					'labor',
					'comanager',
					'crypto',
					'dyn8',
					'homemanage',
					'govt',
					'garage',
					'pingem',
					'calculator',
					'documents',
					'loans',
				],
				dock: ['contacts', 'phone', 'messages', 'email'],
				installed: [
					...(import.meta.env.DEV ? ['lsunderground'] : []),
					'redline',
					'blueline',
					'twitter',
					'leoassist',
					'bank',
					'calculator',
					'email',
					'irc',
					'adverts',
					'contacts',
					'phone',
					'store',
					'settings',
					'messages',
					'labor',
					'comanager',
					'crypto',
					'dyn8',
					'homemanage',
					'govt',
					'garage',
					'pingem',
					'documents',
					'loans',
				],
			},
			Armor: 100,
			HP: 200,
			PhonePermissions: {
				redline: {
					create: true,
				},
			},
			PhoneSettings: {
				texttone: 'text1.ogg',
				ringtone: 'ringtone1.ogg',
				wallpaper: 'wallpaper',
				colors: {},
				notifications: true,
				zoom: 75,
				volume: 100,
				appNotifications: [],
			},
			Status: {
				PLAYER_HUNGER: 71,
				PLAYER_THIRST: 72,
			},
			States: ['PHONE_VPN', 'RACE_DONGLE', 'ACCESS_LSUNDERGROUND'],
			Reputations: {
				Racing: 5000,
			},
			Jobs: [
				{
					Id: 'testy_co',
					Name: 'Testy Co.',
					Owner: 1,
					Workplace: { Id: 'hq', Name: 'Headquarters' },
					Grade: { Id: 'owner', Name: 'Owner', Level: 9 },
				},
				{
					Id: 'acme_corp',
					Name: 'Acme Corp',
					Owner: 99,
					Workplace: { Id: 'warehouse', Name: 'Warehouse' },
					Grade: { Id: 'manager', Name: 'Manager', Level: 6 },
				},
			],
		},
		playerJobPerms: {
			JOB_FIRE: true,
			JOB_HIRE: true,
			JOB_FLEET_ACCESS: true,
			JOB_MANAGE_EMPLOYEES: true,
			JOB_MANAGEMENT: true,
			JOB_SUPERVISOR: true,
			JOB_PAY_EMPLOYEES: true,
			JOB_PAY_CUSTOMERS: true,
			JOB_SELL: true,
		},
		JobData: [
			{
				Id: 'testy_co',
				Name: 'Testy Co.',
				Owner: 1,
				Upgrades: {},
				Workplaces: [
					{
						Id: 'hq',
						Name: 'Headquarters',
						Grades: [
							{
								Id: 'employee',
								Name: 'Employee',
								Level: 2,
								Permissions: {},
							},
							{
								Id: 'senior',
								Name: 'Senior Employee',
								Level: 4,
								Permissions: { JOB_FLEET_ACCESS: true },
							},
							{
								Id: 'manager',
								Name: 'Manager',
								Level: 6,
								Permissions: {
									JOB_HIRE: true,
									JOB_FIRE: true,
									JOB_FLEET_ACCESS: true,
									JOB_MANAGE_EMPLOYEES: true,
								},
							},
							{
								Id: 'owner',
								Name: 'Owner',
								Level: 9,
								Permissions: {
									JOB_HIRE: true,
									JOB_FIRE: true,
									JOB_FLEET_ACCESS: true,
									JOB_MANAGE_EMPLOYEES: true,
									JOB_MANAGEMENT: true,
									JOB_PAY_EMPLOYEES: true,
									JOB_PAY_CUSTOMERS: true,
								},
							},
						],
					},
				],
			},
			{
				Id: 'acme_corp',
				Name: 'Acme Corp',
				Owner: 99,
				Upgrades: {},
				Workplaces: [
					{
						Id: 'warehouse',
						Name: 'Warehouse',
						Grades: [
							{
								Id: 'worker',
								Name: 'Worker',
								Level: 1,
								Permissions: {},
							},
							{
								Id: 'supervisor',
								Name: 'Supervisor',
								Level: 4,
								Permissions: { JOB_FLEET_ACCESS: true },
							},
							{
								Id: 'manager',
								Name: 'Manager',
								Level: 6,
								Permissions: {
									JOB_HIRE: true,
									JOB_FIRE: true,
									JOB_MANAGE_EMPLOYEES: true,
								},
							},
							{
								Id: 'owner',
								Name: 'Owner',
								Level: 9,
								Permissions: {
									JOB_HIRE: true,
									JOB_FIRE: true,
									JOB_FLEET_ACCESS: true,
									JOB_MANAGE_EMPLOYEES: true,
									JOB_MANAGEMENT: true,
									JOB_PAY_EMPLOYEES: true,
								},
							},
						],
					},
				],
			},
		],
		policeJobData: {
			Id: 'police',
			Name: 'Police',
			Owner: '6088b90c93a7b379e0c83ef2',
			Upgrades: {
				COMPANY_FLEET: true,
			},
			Workplaces: [
				{
					Name: 'Los Santos Police Department',
					Id: 'lspd',
					Grades: [
						{
							Name: 'Cadet',
							Id: 'cadet',
							Level: 1,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
							},
						},
						{
							Name: 'Probationary Officer',
							Id: 'pofficer',
							Level: 2,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
							},
						},
						{
							Name: 'Officer I',
							Id: 'officer1',
							Level: 3,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
							},
						},
						{
							Name: 'Officer II',
							Id: 'officer2',
							Level: 4,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_1: true,
								police_cars_0: true,
								police_cars_2: true,
							},
						},
						{
							Name: 'Sergeant',
							Id: 'sergeant',
							Level: 5,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_investigation: true,
								lspd_supervisor: true,
							},
						},
						{
							Name: 'Lieutenant',
							Id: 'lieutenant',
							Level: 6,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								lspd_supervisor: true,
							},
						},
						{
							Name: 'Captain',
							Id: 'captain',
							Level: 7,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_investigation: true,
								police_cars_4: true,
								lspd_supervisor: true,
								lspd_hc: true,
							},
						},
						{
							Name: 'Deputy Chief',
							Id: 'dchief',
							Level: 8,
							Permissions: {
								generic_doors: true,
								police_doors: true,
								ems_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_supervisor: true,
								police_investigation: true,
								lspd_hc: true,
								leo_hc: true,
							},
						},
						{
							Name: 'Chief',
							Id: 'chief',
							Level: 9,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								lspd_supervisor: true,
								lspd_hc: true,
								leo_hc: true,
								JOB_MANAGEMENT: true,
							},
						},
					],
				},
				{
					Name: "Blaine County Sheriff's Office",
					Id: 'bcso',
					Grades: [
						{
							Name: 'Cadet',
							Id: 'cadet',
							Level: 1,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
							},
						},
						{
							Name: 'Probationary Deputy',
							Id: 'pdeputy',
							Level: 2,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
							},
						},
						{
							Name: 'Deputy',
							Id: 'deputy',
							Level: 3,
							Permissions: {
								police_doors: true,
								generic_doors: true,
								ems_doors: true,
								police_cars_0: true,
								police_cars_1: true,
							},
						},
						{
							Name: 'Senior Deputy',
							Id: 'sdeputy',
							Level: 4,
							Permissions: {
								police_cars_1: true,
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_2: true,
							},
						},
						{
							Name: 'Sergeant',
							Id: 'sergeant',
							Level: 5,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_investigation: true,
								bcso_supervisor: true,
							},
						},
						{
							Name: 'Lieutenant',
							Id: 'lieutenant',
							Level: 6,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								bcso_supervisor: true,
							},
						},
						{
							Name: 'Captain',
							Id: 'captain',
							Level: 7,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								bcso_supervisor: true,
								bcso_hc: true,
							},
						},
						{
							Name: 'Assistant Sheriff',
							Id: 'asheriff',
							Level: 8,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								bcso_supervisor: true,
								bcso_hc: true,
								leo_hc: true,
							},
						},
						{
							Name: 'Sheriff',
							Id: 'sheriff',
							Level: 9,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								bcso_supervisor: true,
								bcso_hc: true,
								leo_hc: true,
							},
						},
					],
				},
				{
					Name: "Las Santos County Sheriff's Department",
					Id: 'lssd',
					Grades: [
						{
							Name: 'Cadet',
							Id: 'cadet',
							Level: 1,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
							},
						},
						{
							Name: 'Probationary Deputy',
							Id: 'pdeputy',
							Level: 2,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
							},
						},
						{
							Name: 'Senior Deputy',
							Id: 'sdeputy',
							Level: 3,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
							},
						},
						{
							Name: 'Deputy',
							Id: 'deputy',
							Level: 4,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
							},
						},
						{
							Name: 'Sergeant',
							Id: 'sergeant',
							Level: 5,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_investigation: true,
								lssd_supervisor: true,
							},
						},
						{
							Name: 'Lieutenant',
							Id: 'lieutenant',
							Level: 6,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								lssd_supervisor: true,
							},
						},
						{
							Name: 'Captain',
							Id: 'captain',
							Level: 7,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_3: true,
								police_cars_2: true,
								police_cars_4: true,
								police_investigation: true,
								lssd_supervisor: true,
								lssd_hc: true,
							},
						},
						{
							Name: 'Assistant Sheriff',
							Id: 'asheriff',
							Level: 8,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								lssd_supervisor: true,
								lssd_hc: true,
								leo_hc: true,
							},
						},
						{
							Name: 'Sheriff',
							Id: 'sheriff',
							Level: 9,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								lssd_supervisor: true,
								lssd_hc: true,
								leo_hc: true,
							},
						},
					],
				},
				{
					Name: 'San Andreas State Police',
					Id: 'sasp',
					Grades: [
						{
							Name: 'State Trooper',
							Id: 'trooper',
							Level: 4,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
							},
						},
						{
							Name: 'Sergeant',
							Id: 'sergeant',
							Level: 5,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_investigation: true,
								sasp_supervisor: true,
							},
						},
						{
							Name: 'Lieutenant',
							Id: 'lieutenant',
							Level: 6,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								police_cars_0: true,
								police_cars_2: true,
								generic_doors: true,
								police_cars_1: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								sasp_supervisor: true,
							},
						},
						{
							Name: 'Major',
							Id: 'major',
							Level: 7,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								sasp_supervisor: true,
								sasp_hc: true,
							},
						},
						{
							Name: 'Deputy Superintendent',
							Id: 'dsuperint',
							Level: 8,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								sasp_supervisor: true,
								sasp_hc: true,
								leo_hc: true,
							},
						},
						{
							Name: 'Superintendent',
							Id: 'superint',
							Level: 9,
							Permissions: {
								police_doors: true,
								ems_doors: true,
								generic_doors: true,
								police_cars_0: true,
								police_cars_1: true,
								police_cars_2: true,
								police_cars_3: true,
								police_cars_4: true,
								police_investigation: true,
								sasp_supervisor: true,
								sasp_hc: true,
							},
						},
					],
				},
			],
		},
		jobPermissions: {
			JOB_FIRE: 'Fire Employees',
			JOB_HIRE: 'Hire Employees',
			JOB_FLEET_ACCESS: 'Access Company Fleet',
			JOB_MANAGE_EMPLOYEES: 'Manage Employees',
			JOB_MANAGEMENT: 'Company Management',
			JOB_PAY_EMPLOYEES: 'Pay Internal',
			JOB_PAY_CUSTOMERS: 'Pay External',
		},
		NamedJobPermissions: {
			JOB_FIRE: { name: 'Fire Employees' },
			JOB_HIRE: { name: 'Hire Employees' },
			JOB_FLEET_ACCESS: { name: 'Access Company Fleet' },
			JOB_MANAGE_EMPLOYEES: { name: 'Manage Employees' },
			JOB_MANAGEMENT: { name: 'Company Management' },
			JOB_PAY_EMPLOYEES: { name: 'Pay Internal' },
			JOB_PAY_CUSTOMERS: { name: 'Pay External' },
		},
		rosterData: {
			testy_co: [
				{
					SID: 1,
					First: 'Testy',
					Last: 'McTest',
					JobData: {
						Id: 'testy_co',
						Workplace: { Id: 'hq', Name: 'Headquarters' },
						Grade: { Id: 'owner', Name: 'Owner', Level: 9 },
					},
				},
				{
					SID: 2,
					First: 'Jane',
					Last: 'Doe',
					JobData: {
						Id: 'testy_co',
						Workplace: { Id: 'hq', Name: 'Headquarters' },
						Grade: { Id: 'manager', Name: 'Manager', Level: 6 },
					},
				},
				{
					SID: 3,
					First: 'John',
					Last: 'Smith',
					JobData: {
						Id: 'testy_co',
						Workplace: { Id: 'hq', Name: 'Headquarters' },
						Grade: { Id: 'employee', Name: 'Employee', Level: 2 },
					},
				},
			],
			acme_corp: [
				{
					SID: 99,
					First: 'Big',
					Last: 'Boss',
					JobData: {
						Id: 'acme_corp',
						Workplace: { Id: 'warehouse', Name: 'Warehouse' },
						Grade: { Id: 'owner', Name: 'Owner', Level: 9 },
					},
				},
				{
					SID: 1,
					First: 'Testy',
					Last: 'McTest',
					JobData: {
						Id: 'acme_corp',
						Workplace: { Id: 'warehouse', Name: 'Warehouse' },
						Grade: { Id: 'manager', Name: 'Manager', Level: 6 },
					},
				},
			],
		},
		JobPermissions: {
			realestate: {
				JOB_SELL: true,
			},
		},
		settings: {
			wallpaper: 'wallpaper',
			ringtone: 'ringtone1.ogg',
			texttone: 'text1.ogg',
			colors: {
				accent: '#9a0c1e',
			},
			zoom: 80,
			volume: 100,
			notifications: true,
			appNotifications: {
				messages: true,
			},
		},
		contacts: [
			{
				_id: 'abc123',
				name: 'Test',
				number: '555-555-5555',
				favorite: true,
				color: '#1a7cc1',
				avatar: 'https://i.pinimg.com/736x/4a/8b/b1/4a8bb1a316a7179eda8ccbea3ab027b2--oregon-ducks-football-football-s.jpg',
			},
			{
				_id: 'abc124',
				name: 'Test 2',
				number: '555-555-5552',
				favorite: false,
				color: '#1a7cc1',
				avatar: 'https://i.pinimg.com/236x/df/19/14/df19146777544b82d08e06d3dd102df4.jpg',
			},
		],
		myDocuments: [],
		messages: [
			{
				owner: '555-555-5555',
				number: '333-333-3333',
				method: 1,
				time: 1583397349801,
				message:
					'This is a test message that is quite long and I really hope it works',
				unread: true,
			},
			{
				owner: '555-555-5555',
				number: '333-333-3333',
				method: 0,
				time: 1583397349801,
				message: 'This is a test message',
				unread: true,
			},
			{
				owner: '555-555-5555',
				number: '333-333-3333',
				method: 1,
				time: 1583397349801,
				message: 'This is a test message',
				unread: true,
			},
			{
				owner: '555-555-5555',
				number: '111-111-1111',
				method: 1,
				time: 1583397349801,
				message: 'This is a test message',
				unread: true,
			},
			{
				owner: '555-555-5555',
				number: '111-111-1111',
				method: 0,
				time: 1583397349801,
				message: 'This is a test message',
				unread: true,
			},
			{
				owner: '555-555-5555',
				number: '111-111-1111',
				method: 1,
				time: 1583397349801,
				message: 'ircinvite=1',
				unread: true,
			},
		],
		calls: [
			{
				owner: '555-555-5555',
				number: '555-555-5555',
				method: 1,
				anonymous: 1,
				time: 1583397349801,
				duration: 122,
				limited: true,
			},
		],
		emails: [
			{
				_id: '1',
				sender: 'chop@mechanics.onion',
				subject: 'Offer Expires Soon',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
					expires: Date.now() + 100000,
					hyperlink: {},
				},
			},
			{
				_id: '2',
				sender: 'admin@mechaincs.art',
				subject:
					'I Like Potato Trains I Like Potato Trains I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '3',
				sender: 'support@mechanics.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: Date.now(),
			},
			{
				_id: '4',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '5',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '6',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '7',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '8',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '9',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '10',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '11',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '12',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '13',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '14',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '15',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '16',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '17',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
			{
				_id: '18',
				sender: 'admin@mechaincs.art',
				subject: 'I Like Potato Trains',
				body: 'Why are we doing this to ourselves? all tis nonsense just to make memes on the internet?',
				time: 1583397349801,
				unread: true,
				flags: {
					location: { x: 0, y: 0, z: 0 },
				},
			},
		],
		adverts: {},
		ircChannels: [],
		tweets: [
			{
				_id: 1,
				author: {
					name: 'TestTesterson001',
					avatar: 'https://avatarfiles.alphacoders.com/453/45341.jpg',
				},
				image: { using: false, link: null },
				time: 1618740407000,
				content:
					'@Arch #potatoes Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				likes: [],
			},
			{
				_id: 2,
				author: {
					name: 'TestTesterson001',
					avatar: 'https://avatarfiles.alphacoders.com/453/45341.jpg',
				},
				image: { using: false, link: null },
				time: 1618740407000,
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				likes: [],
			},
			{
				_id: 3,
				author: {
					name: 'TestTesterson001',
					avatar: 'https://avatarfiles.alphacoders.com/453/45341.jpg',
				},
				image: { using: false, link: null },
				time: 1618740407000,
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				likes: [],
			},
			{
				_id: 4,
				author: {
					name: 'TestTesterson001',
					avatar: 'https://avatarfiles.alphacoders.com/453/45341.jpg',
				},
				image: { using: false, link: null },
				time: 1618740407000,
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				likes: [],
			},
			{
				_id: 5,
				author: {
					name: 'TestTesterson001',
					avatar: 'https://avatarfiles.alphacoders.com/453/45341.jpg',
				},
				image: { using: false, link: null },
				time: 1618740407000,
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				likes: [],
			},
			{
				_id: 6,
				author: {
					name: 'TestTesterson001',
					avatar: 'https://avatarfiles.alphacoders.com/453/45341.jpg',
				},
				image: { using: false, link: null },
				time: 1618740407000,
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				likes: [],
			},
			{
				_id: 7,
				author: {
					name: 'TestTesterson001',
					avatar: 'https://avatarfiles.alphacoders.com/453/45341.jpg',
				},
				image: { using: false, link: null },
				time: 1618740407000,
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
				likes: [],
			},
		],
		bankAccounts: null,
		bankLoans: null,
		loans: [
			{
				_id: '606e8b5c8144f19ec0aeeed6',
				Char: '606e8a3c8144f19ec0aeeece',
				LoanNumber: '440208115493799632',
				LoanType: 'Vehicle',
				LoanEntity: {
					Make: 'Nissan Gizmo 2020',
					RegPlate: 'HGJ456JGH',
				},
				Interest: 0.5,
				RemainingAmount: 100000,
				Penalty: 0,
				Due: 57583,
				RemainingPeriods: 5,
				DueDateTime: 1618462172,
				PayedOff: false,
				Payments: [],
				Original: {
					Amount: 100000,
					Term: 5,
					Interest: 0.5,
				},
			},
			{
				_id: '606e8b5c8144f19ec0aeeed7',
				Char: '606e8a3c8144f19ec0aeeece',
				LoanNumber: '440208115493799632',
				LoanType: 'Vehicle',
				LoanEntity: {
					Make: 'Nissan Gizmo 2020',
					RegPlate: 'HGJ456JGH',
				},
				Interest: 0.5,
				RemainingAmount: 100000,
				Penalty: 0,
				Due: 57583,
				RemainingPeriods: 5,
				DueDateTime: 1618462172,
				PayedOff: true,
				Payments: [],
				Original: {
					Amount: 100000,
					Term: 5,
					Interest: 0.5,
				},
			},
			{
				_id: '606e8b5c8144f19ec0aeeed8',
				Char: '606e8a3c8144f19ec0aeeece',
				LoanNumber: '440208115493799632',
				LoanType: 'Vehicle',
				LoanEntity: {
					Make: 'Nissan Gizmo 2020',
					RegPlate: 'HGJ456JGH',
				},
				Interest: 0.5,
				RemainingAmount: 100000,
				Penalty: 0,
				Due: 57583,
				RemainingPeriods: 5,
				DueDateTime: 1618462172,
				PayedOff: false,
				Payments: [],
				Original: {
					Amount: 100000,
					Term: 5,
					Interest: 0.5,
				},
			},
		],
		leoAlerts: [
			{
				title: 'Breaking & Entering',
				code: '10-31A',
				time: Date.now(),
				location: {
					street1: 'Buccaneer Way',
					street2: null,
					area: 'Terminal',
					x: 0,
					y: 0,
					z: 0,
				},
			},
		],
		tracks: [
			{
				_id: 1,
				Name: 'Track Name',
				Distance: '10.1 Miles',
				Type: 'p2p',
				Checkpoints: [],
			},
		],
		tracks_pd: [
			{
				_id: 1,
				Name: 'Track Name',
				Distance: '10.1 Miles',
				Type: 'p2p',
				Checkpoints: [],
			},
		],
		jobs: {
			Illegal: {
				Name: 'Illegal',
				Limit: 3,
				Salary: 0,
				OnDuty: [],
				Restricted: {
					state: 'PHONE_VPN',
				},
			},
			Miner: {
				Name: 'Miner',
				Limit: 3,
				Salary: 0,
				OnDuty: [],
			},
			Farmer: {
				Name: 'Farmer',
				Limit: 3,
				Salary: 0,
				OnDuty: [],
			},
			Salvager: {
				Name: 'Salvager',
				Limit: 3,
				Salary: 0,
				OnDuty: [],
			},
		},
		workGroups: [
			{
				_id: 1,
				Creator: {
					ID: 6,
					First: 'Test',
					Last: 'McTest',
				},
				Members: [
					{ ID: 1, First: 'Kek', Last: 'W' },
					{ ID: 5, First: 'Big', Last: 'Oof' },
					{ ID: 6, First: 'Small', Last: 'Oof' },
				],
			},
			{
				_id: 2,
				Creator: { ID: 2, First: 'Test', Last: 'McTest' },
				Members: [],
			},
			{
				_id: 3,
				Creator: { ID: 3, First: 'Test', Last: 'McTest' },
				Members: [],
			},
		],
		cryptoCoins: [
			{
				Name: 'Vroom',
				Short: 'VRM',
				Price: 1,
				Sellable: false,
			},
			{
				Name: 'Memes',
				Short: 'MEME',
				Price: 150,
				Sellable: true,
				Buyable: true,
			},
			{
				Name: 'Small Weiner Club',
				Short: 'SWC',
				Price: 5000,
				Sellable: false,
				Buyable: true,
			},
		],
		govtServices: [
			{
				_id: 1,
				Label: 'Business Registration',
				Price: 25000,
				Event: 'CreateBusiness',
				Disclaimer:
					'Registering a company will immediately remove you from your current employment. You may not purchase this if you already own a company. You will be able to name your company via the Company Management app after purchasing this service.',
			},
		],
		myProperties: [],
		propertyUpgrades: {
			house: {
				storage: {
					name: 'Storage',
					levels: [
						{ name: 'Storage Level 1' },
						{ name: 'Storage Level 2' },
					],
				},
				garage: {
					name: 'Garage',
					levels: [
						{ name: 'Garage Level 1' },
						{ name: 'Garage Level 2' },
					],
				},
				interior: {
					name: 'interior',
					levels: [
						{ id: 'house_apartment1', name: 'Interior Bla Bla' },
						{ id: 'house_apartment2', name: 'Interior Bla 2' },
					],
				},
			},
		},
		myVehicles: [],
		garages: {
			sa_ave_downtown: {
				label: 'Garage 1',
				coords: { x: 0, y: 0, z: 0 },
			},
			impound: {
				label: 'Impound Yard',
				coords: { x: 0, y: 0, z: 0 },
			},
		},
	},
};

interface Action {
	type: string;
	payload?: any;
}

export default (state: DataState = initialState, action: Action): DataState => {
	switch (action.type) {
		case 'SET_DATA':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.type]: action.payload.data,
				},
			};
		case 'RESET_DATA':
			return initialState;
		case 'ADD_DATA':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.type]:
						state.data[action.payload.type] != null
							? Object.prototype.toString.call(
									state.data[action.payload.type],
								) == '[object Array]'
								? action.payload.first
									? [
											action.payload.data,
											...state.data[action.payload.type],
										]
									: [
											...state.data[action.payload.type],
											action.payload.data,
										]
								: action.payload.key
									? {
											...state.data[action.payload.type],
											[action.payload.key]:
												action.payload.data,
										}
									: {
											...state.data[action.payload.type],
											...action.payload.data,
										}
							: [action.payload.data],
				},
			};
		case 'UPDATE_DATA':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.type]: Array.isArray(
						state.data[action.payload.type],
					)
						? state.data[action.payload.type].map((data: any) =>
								data._id == action.payload.id
									? { ...action.payload.data }
									: data,
							)
						: action.payload.key
							? {
									...state.data[action.payload.type],
									[action.payload.id]: {
										...state.data[action.payload.type]?.[
											action.payload.id
										],
										[action.payload.key]:
											action.payload.data,
									},
								}
							: {
									...state.data[action.payload.type],
									[action.payload.id]: action.payload.data,
								},
				},
			};
		case 'REMOVE_DATA':
			return {
				...state,
				data: {
					...state.data,
					[action.payload.type]:
						Object.prototype.toString.call(
							state.data[action.payload.type],
						) == '[object Array]'
							? state.data[action.payload.type].filter(
									(data: any) => {
										return Object.prototype.toString.call(
											data,
										) == '[object Object]'
											? action.payload.key
												? data[action.payload.key] !=
													action.payload.id
												: data._id != action.payload.id
											: data != action.payload.id;
									},
								)
							: Object.keys(
									state.data[action.payload.type],
								).reduce((result: any, key: string) => {
									if (key != action.payload.id) {
										result[key] =
											state.data[action.payload.type][
												key
											];
									}
									return result;
								}, {}),
				},
			};
		default:
			return state;
	}
};
