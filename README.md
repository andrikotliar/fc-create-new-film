## The simple admin panel for [Film Collection](https://films-collection.netlify.app/)

Open tool: [FC-CREATE-NEW-FILM](https://andrikotliar.github.io/fc-create-new-film/)

The tool forms JSON-data with properties:

- id: *(Number)*
- title: *(String)*
- poster: *(String)*
- trailer: *(String)*
- genres: *(Array)*
- production: *(Array)*
- director: *(String)*
- producers: *(String)*
- writtens: *(String)*
- music: *(String)*
- cinema: *(String)*
- year: *(Number)*
- time: *(Number)*
- country: *(String)*
- budget: *(String)*
- boxoffice: *(String)*
- actors: *(Array of Objects)*
- synopsis: *(String)*
- awards: *(Array of Objects)*
- parts: *(String)*
- type: *(Object)*

**Example**

```json
{
    "id": 1,
    "title": "Avatar",
    "poster": "avatar",
    "trailer": "5PSNL1qE6VY",
    "genres": ["Sci-Fi", "Action"],
    "production": ["20th-Century-FOX"],
    "director": "James Cameron",
    "producers": "James Cameron, Jon Landau",
    "writtens": "James Cameron",
    "music": "James Horner",
    "cinema": "Mauro Fiore",
    "year": 2009,
    "time": 162,
    "country": "USA, UK",
    "budget": "237 million",
    "boxoffice": "2,8 billion",
    "actors": [{"image": "sam_worthington", "name": "Sam Worthington", "role": "Jake Sully"}, {"image": "zoe_saldana", "name": "Zoe Saldana", "role": "Neytiri"}, {"image": "sigourney_weaver", "name": "Sigourney Weaver", "role": "Grace Augustine"}, {"image": "stephen_lang", "name": "Stephen Lang", "role": "Miles Quaritch"}, {"image": "michelle_rodriguez", "name": "Michelle Rodriguez", "role": "Trudy Chacon"}, {"image": "giovanni_ribisi", "name": "Giovanni Ribisi", "role": "Parker Selfridge"}, {"image": "joel_david_moore", "name": "Joel David Moore", "role": "Norm Spellman"}, {"image": "wes_studi", "name": "Wes Studi", "role": "Eytukan"}, {"image": "laz_alonso", "name": "Laz Alonso", "role": "Tsu'tey"}],
    "synopsis": "A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    "categories": ["special-favorite", "most-watched"],
    "awards": [{"title": "Oscar", "nominations": ["The Best Cinematography", "The Best Decorations", "The Best Visual Effects"] }, {"title": "The Gold Globe", "nominations": ["The Best Picture (Drama)", "The Best Diretor"] }, {"title": "The British", "nominations": ["The Best Visual Effects"]}],
    "parts": null,
    "type": {"value": "film", "data": null}
}
```