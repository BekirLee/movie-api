
import server from '../../app.js';
import { use } from 'chai'
import chaiHttp from 'chai-http'
const chai = use(chaiHttp);
const should = chai.should();

let token, movieId;


describe('Node server tests', () => {
  it("GET / - should return the main page", (done) => {
    chai.request.execute(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


// all movies test
describe('/api/movies tests', () => {
  before((done) => {
    chai.request.execute(server) // Corrected line here
      .post('/authenticate')
      .send({ username: "BekirLee", password: "12nf19hv" })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200); // Correct method to check status
        done()
      });
  });

  // get movies test
  describe('get movies', () => {
    it('it should get all movies!', (done) => {
      chai.request.execute(server)
        .get('/api/movies')
        .set('x-acces-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        })
    });
  });

  // post movies test
  describe('post movies ', () => {
    it('it should get post movies!', (done) => {
      const movie = {
        title: 'ders',
        director_id: '66f2d9ad495ad68f56bf6fb2',
        country: 'Azerbaijan',
        year: 2024,
        category: 'crime',
        imdb: 8
      };

      chai.request.execute(server)
        .post('/api/movies')
        .send(movie)
        .set('x-acces-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('director_id');
          res.body.should.have.property('country');
          res.body.should.have.property('imdb');
          res.body.should.have.property('category');
          res.body.should.have.property('year');
          movieId = res.body._id;
          done();
        })

    })
  })

  // get movie by id test
  describe('get director id movie', () => {
    it('it should get director id movie!', (done) => {
      chai.request.execute(server)
        .get('/api/movies/' + movieId)
        .set('x-acces-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('director_id');
          res.body.should.have.property('country');
          res.body.should.have.property('imdb');
          res.body.should.have.property('category');
          res.body.should.have.property('year');
          res.body.should.have.property('_id').eql(movieId);
          done();
        })
    })
  })

  //update movies
  describe('put movies ', () => {
    it('it should update movie given by id!', (done) => {
      const movie = {
        title: 'Yarali yuz',
        director_id: '66f2d9ad495ad68f56bf6fb1',
        country: 'Azerbaijan',
        year: 2024,
        category: 'crime',
        imdb: 8 
      };

      chai.request.execute(server)
        .put('/api/movies/' + movieId)
        .send(movie)
        .set('x-acces-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title').eql(movie.title);
          res.body.should.have.property('director_id').eql(movie.director_id);
          res.body.should.have.property('country').eql(movie.country);
          res.body.should.have.property('imdb').eql(movie.imdb);
          res.body.should.have.property('category').eql(movie.category);
          res.body.should.have.property('year').eql(movie.year);

          done();
        })

    })
  })
});
