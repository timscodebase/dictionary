/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/

// Like the `config` function we use in keystone.ts, we use functions
// for putting in our config so we get useful errors. With typescript,
// we get these even before code runs.
import { list } from '@keystone-6/core';

// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';

import { document } from '@keystone-6/fields-document';

import { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
      words: relationship({ ref: 'Word.author', many: true }),
    },
    // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
    ui: {
      listView: {
        initialColumns: ['name', 'words'],
      },
    },
  }),
  

  Word: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      translation: text({ validation: { isRequired: true } }),
      author: relationship({ ref: 'User.words', many: false }),
    },
    
    ui: {
      listView: {
        initialColumns: ['name', 'translation'],
      },
    },
  }),
};
