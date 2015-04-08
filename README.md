## Search Blocks

The FX plus library webpages have multiple search options, eg search (or link to):

- the site
- the library catalog
- the Falmouth discovery tool
- the Exeter Electronic library
- the resource library

In order to allow for this the search block, used for example on the home page, should at the very least provide one search option and links to the alternatives. More complex UX decisions are involved in presenting multiple search options, but ideally this should be catered to. An extended experience (tested in dev) uses cookies set when user arrives from an institutional VLE to set an institutional context, which can limit or tailor the options presented to the user.

Plus Simple Search (PSS) is currently the simplest and least contentious solution in this box of modules, but PSS2 has the simple addition of using a custom drupal menu (entitled 'search menu') to display a list of alternative search options. PSS and PSS2 will be merged once the alternatives menu (and search urls etc) is made configurable.

A more complex setup to provide site indexing and aggregated search results is provided by the [Search Apex](https://github.com/fxplus/search_apex) modules. The two approaches are meant to be complementary, as the search block does not perform search, just directs the queries (eg get/url parameters).