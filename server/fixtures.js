if (!Meteor.users.findOne({ 'roles.__global_roles__': 'admin' })) {
    const adminId = Accounts.createUser({
        email: 'admin@test.com',
        password: '123456',
    });
    Roles.addUsersToRoles(adminId, 'admin', Roles.GLOBAL_GROUP);
}