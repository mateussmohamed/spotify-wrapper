import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import SpotifoodWrapper from '../src/index';

import { parseURL } from '../src/utils';

chai.use(sinonChai);

global.fetch = require('node-fetch');
global.URL = require('url').URL;

describe('Browse method', () => {
  let fetchedStub;
  let spotifood;

  let filters;

  beforeEach(() => {
    spotifood = new SpotifoodWrapper({
      clientID: '3LK21JLK321J3',
      clientSecret: '3LK21JLK321J3',
    });

    filters = {
      locale: 'pt_BR',
      country: 'BR',
      timestamp: '2014-10-23T09:00:00',
      limit: 5,
      offset: 5,
    };

    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => {} });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke Tests', () => {
    it('should exist the browse method', () => {
      expect(spotifood.browse).to.exist;
    });

    it('should exist the featuredPlaylists method', () => {
      expect(spotifood.browse.featuredPlaylists).to.exist;
    });
  });

  describe('Featured Playlists', () => {
    it('should call featuredPlaylists function', () => {
      spotifood.browse.featuredPlaylists(filters);

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call featuredPlaylists when passing correct filters function', () => {
      spotifood.browse.featuredPlaylists(filters);

      const url = 'https://api.spotify.com/v1/browse/featured-playlists';

      expect(fetchedStub).to.have.been.calledWith(parseURL(url, filters));
    });
  });
});
