const axios = require('axios');
const { models } = require('./src/server/db/models/index');


const data = [
  {
    id: '59cfc000aeb2844d16000075',
    name: 'Alternate capitalization',
    slug: 'alternate-capitalization',
    completedLanguages: [Array],
    completedAt: '2020-03-11T16:54:52.076Z'
  },
  {
    id: '5af15a37de4c7f223e00012d',
    name: 'Sort Out The Men  From Boys ',
    slug: 'sort-out-the-men-from-boys-1',
    completedLanguages: [Array],
    completedAt: '2020-03-02T15:22:02.890Z'
  },
  {
    id: '515de9ae9dcfc28eb6000001',
    name: 'Split Strings',
    slug: 'split-strings',
    completedLanguages: [Array],
    completedAt: '2020-02-29T15:24:10.101Z'
  },
  {
    id: '55cbd4ba903825f7970000f5',
    name: 'Grasshopper - Grade book',
    slug: 'grasshopper-grade-book',
    completedLanguages: [Array],
    completedAt: '2020-02-28T20:28:42.044Z'
  },
  {
    id: '563b662a59afc2b5120000c6',
    name: 'Growth of a Population',
    slug: 'growth-of-a-population',
    completedLanguages: [Array],
    completedAt: '2020-02-28T16:44:13.490Z'
  },
  {
    id: '511f11d355fe575d2c000001',
    name: 'Two Oldest Ages',
    slug: 'two-oldest-ages-1',
    completedLanguages: [Array],
    completedAt: '2020-02-28T16:32:35.794Z'
  },
  {
    id: '5d5ee4c35162d9001af7d699',
    name: 'Sum of Minimums!',
    slug: 'sum-of-minimums',
    completedLanguages: [Array],
    completedAt: '2020-02-28T15:30:24.696Z'
  },
  {
    id: '58f8a3a27a5c28d92e000144',
    name: 'Find the first non-consecutive number',
    slug: 'find-the-first-non-consecutive-number',
    completedLanguages: [Array],
    completedAt: '2020-02-28T01:31:17.913Z'
  },
  {
    id: '530e15517bc88ac656000716',
    name: 'Rot13',
    slug: 'rot13-1',
    completedLanguages: [Array],
    completedAt: '2020-02-17T20:30:23.694Z'
  },
  {
    id: '5208f99aee097e6552000148',
    name: 'Break camelCase',
    slug: 'break-camelcase',
    completedLanguages: [Array],
    completedAt: '2020-02-17T17:50:18.804Z'
  },
  {
    id: '5264d2b162488dc400000001',
    name: 'Stop gninnipS My sdroW!',
    slug: 'stop-gninnips-my-sdrow',
    completedLanguages: [Array],
    completedAt: '2020-02-17T17:38:49.532Z'
  },
  {
    id: '5b39e3772ae7545f650000fc',
    name: 'Remove duplicate words',
    slug: 'remove-duplicate-words',
    completedLanguages: [Array],
    completedAt: '2020-02-17T17:23:47.114Z'
  },
  {
    id: '523f5d21c841566fde000009',
    name: 'Array.diff',
    slug: 'array-dot-diff',
    completedLanguages: [Array],
    completedAt: '2020-02-17T17:13:38.787Z'
  },
  {
    id: '585d7d5adb20cf33cb000235',
    name: 'Find the unique number',
    slug: 'find-the-unique-number-1',
    completedLanguages: [Array],
    completedAt: '2020-02-10T02:41:29.482Z'
  },
  {
    id: '57eb8fcdf670e99d9b000272',
    name: 'Highest Scoring Word',
    slug: 'highest-scoring-word',
    completedLanguages: [Array],
    completedAt: '2020-02-09T16:22:18.846Z'
  },
  {
    id: '554e4a2f232cdd87d9000038',
    name: 'Complementary DNA',
    slug: 'complementary-dna',
    completedLanguages: [Array],
    completedAt: '2020-02-08T23:45:27.900Z'
  },
  {
    id: '5949481f86420f59480000e7',
    name: 'Odd or Even?',
    slug: 'odd-or-even',
    completedLanguages: [Array],
    completedAt: '2020-02-08T16:33:07.876Z'
  },
  {
    id: '582cb0224e56e068d800003c',
    name: 'Keep Hydrated!',
    slug: 'keep-hydrated-1',
    completedLanguages: [Array],
    completedAt: '2020-02-08T16:28:54.724Z'
  },
  {
    id: '55f73be6e12baaa5900000d4',
    name: 'Grasshopper - Messi goals function',
    slug: 'grasshopper-messi-goals-function',
    completedLanguages: [Array],
    completedAt: '2020-02-08T16:22:48.150Z'
  },
  {
    id: '50654ddff44f800200000004',
    name: 'Multiply',
    slug: 'multiply',
    completedLanguages: [Array],
    completedAt: '2020-01-27T22:38:24.787Z'
  }
]


// eslint-disable-next-line array-callback-return
data.map((prompt) => {
  axios.get(`https://www.codewars.com/api/v1/code-challenges/${prompt.slug}/?access_key=QsVQKDG8_jqTJVwrWFWo`)
  // eslint-disable-next-line no-shadow
  .then(({data})=> {
    let difficulty=null;
    data.rank.id=Math.abs(data.rank.id);

    if(data.rank.id>6){
      difficulty='easy'
    } else if(data.rank.id >4 && data.rank.id<7){
      difficulty='medium'
    } else {
      difficulty='hard'
    }

    try{
      const newPropmt= {
        id: data.id,
        name: data.name, 
        prompt: data.description, 
        difficulty,
        slug: data.slug
      }
      return models.Prompt.create(newPropmt)
    }
    catch(e){
      console.log(e);
    }
    return null
  })
  console.log('Prompts Seeded')
})