var assert = require('assert');
var inviteList = require('../routes/inviteList');

const TEST_PAYMENTS = [
{ 
	_id: '100',
	event_id: '200',
	amount: 0,
	user_id: '1',
	type: 'tickets',
	paidAt: '2018-03-26T12:14:10.763Z',
	__v: 0 
},
{ 
	_id: '101',
	event_id: '200',
	amount: 200,
	user_id: '1',
	type: 'tickets',
	paidAt: '2018-03-26T12:19:48.877Z',
	__v: 0 
}
];

const TEST_USERS = [
{ 
	eventsAttended: [],
	subscriptions: [],
	_id: '1',
	name: 'a@a',
	email: 'a@a',
	password: 'password',
	type: 'user',
	salt: 'salt',
	__v: 0 
},
{ 
	eventsAttended: [],
	subscriptions: [],
	_id: '2',
	name: 'b@b',
	email: 'b@b',
	password: 'password',
	type: 'user',
	salt: 'salt',
	__v: 0 
}
];


const TEST_EVENTS = [
{ 
	date: '2018-03-23T00:00:00.000Z',
	invitees:[ { 
		email: 'a@a',
		state: 'Attending'
	},
	{ 
		email: 'b@b',
		state: 'Attending'
	}],
	_id: '200',
	title: 'Event',
	location: 'location',
	description: 'description',
	event_id: 0,
	__v: 1 
},
{ 
	date: '2018-03-23T00:00:00.000Z',
	invitees:[ { 
		email: 'a@a',
		state: 'Attending'
	},
	{ 
		email: 'b@b',
		state: 'Attending'
	}],
	_id: '201',
	title: 'Event',
	location: 'location',
	description: 'description',
	event_id: 1,
	__v: 1 
},
{ 
	date: '2018-03-23T00:00:00.000Z',
	invitees:[ { 
		email: 'a@a',
		state: 'Attending'
	},
	{ 
		email: 'b@b',
		state: 'Attending'
	},
	{
		email: 'c@c',
		state: 'Attending'
	}],
	_id: '201',
	title: 'Event',
	location: 'location',
	description: 'description',
	event_id: 1,
	__v: 1 
}
];


describe('payment confirmation testing suite', function() {

	it('should return array indicating first user has paid, second user hasn\'t', function(done) {
		let userHasPaid = inviteList.usersThatHavePaid(TEST_PAYMENTS, TEST_EVENTS[0], TEST_USERS);
		assert.equal(userHasPaid[0],'Has Paid');
		assert.equal(userHasPaid[1],'Has Not Paid');
		done();
	});

	it('should return array where neither user has paid', function(done) {
		let userHasPaid = inviteList.usersThatHavePaid(TEST_PAYMENTS, TEST_EVENTS[1], TEST_USERS);
		assert.equal(userHasPaid[0],'Has Not Paid');
		assert.equal(userHasPaid[1],'Has Not Paid');
		done();
	});

	it('should return Not Paid if user doesn\'t have an account', function(done) {
		let userHasPaid = inviteList.usersThatHavePaid(TEST_PAYMENTS, TEST_EVENTS[2], TEST_USERS);
		assert.equal(userHasPaid[0],'Has Not Paid');
		assert.equal(userHasPaid[1],'Has Not Paid');
		assert.equal(userHasPaid[2],'Has Not Paid');
		done();
	});


});