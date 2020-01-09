# Fuzzical
Fuzzy string matching based on physical distance between keys

## Usage
`new Fuzzical('yrdy', ['rest', 'best', 'test', 'Lorem ipsum dolor sit amet']);` will return an ordered array of objects like so:
```
[
  {"Phrase":"test","Score":0.4375},
  {"Phrase":"tester","Score":0.2916666666666667},
  {"Phrase":"Lorem ipsum dolor sit amet","Score":0.028846153846153848}
]
```
You can also pass a single string as the second argument (`new Fuzzical('yrdy', 'test');`), though this will still return an array as above (with a single entry).

## Limitations
- Only works for QWERTY, so it's a heavily anglo-centric and unsuited to an international audience
- Ignores punctuation but doesn't strip punctuation, which is really rather silly now that I think of it

### Cowardly Disclaimer
I built this for fun so can't guarantee any updates/improvements going forward
