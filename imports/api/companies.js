import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Companies = new Mongo.Collection('companies');

const CompanySchema = new SimpleSchema({
  name: {
    type: String,
  },
  earning: {
    type: Number,
  },
  owner: {
    type: Meteor.ObjectID,
    optional: true,
  },
  companies: {
    type: [Meteor.ObjectID],
    optional: true,
  },
});

Companies.attachSchema(CompanySchema);

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('companies', function companiesPublication() {
    return Companies.find({});
  });
}

Meteor.methods({
  'companies.insert'(company) {
    if (_.isEmpty(company)) throw new Meteor.Error('company must be present');
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Companies.insert({
      company
    });
  },
  'companies.remove'(companyId) {
    if (_.isEmpty(companyId)) throw new Meteor.Error('companyId must be present');
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Companies.remove(companyId);
  },
  'companies.update'(companyId, model) {
    if (_.isEmpty(companyId)) throw new Meteor.Error('companyId must be present');
    if (_.isEmpty(model)) throw new Meteor.Error('companyId must be present');
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Companies.update(companyId, { $set: { model } });
  },
});

export default Companies;
