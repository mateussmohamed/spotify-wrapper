import { searchAlbums } from '../src/search';

global.fetch = require('node-fetch');

const albums = searchAlbums('Post Malone');

albums.then(data => data.albums.items.map(item => console.log(item.name)));