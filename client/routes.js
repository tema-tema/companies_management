// Meteor Dependencies and collections
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Tracker } from 'meteor/tracker';
import { Roles } from 'meteor/alanning:roles';

// React Dependencies
import React from 'react';
import { mount } from 'react-mounter';

// Layouts
import App from '/imports/ui/App.jsx';

// Public Routes
const publicRoutes = FlowRouter.group({
    name: 'public',
});

// Helpers
function _dashboardPath() {
    if (FlowRouter.current().path === '/admin') return;
    FlowRouter.go('public.landing');
}

publicRoutes.route('/', {
    name: 'public.landing',
    action() {
        mount(App, { });
    },
});

Accounts.onLogin(() => _dashboardPath());

// Logout
Tracker.autorun(() => {
    FlowRouter.watchPathChange();
    const current = FlowRouter.current().route;

    if (current && current.group.name === 'authenticated' && !Meteor.userId()) {
        FlowRouter.go('public.landing');
    }
});