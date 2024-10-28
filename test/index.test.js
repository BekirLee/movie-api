// import * as chai from 'chai';
// import * as chaiHttp from 'chai-http';
// import server from '../app.js';

// chai.use(chaiHttp);
// // const { expect } = chai;

// describe('Node server tests', () => {
//     it("(GET/ ) for the main page!", (done) => {
//         chai.request(server)
//             .get('/')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 done();
//             });
//     });
// });

import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { request } from 'chai-http';
import server from '../app.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Node server tests', () => {
  it("GET / - should return the main page", done => {
    request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});



// import * as chai from 'chai';
// import * as chaiHttp from 'chai-http';
// chai.use(chaiHttp)

// describe('Chat', () => {
//     it('should return all data',async()=>{
//                 request("https://google.com")
//                 .get('/')
//                 .end((err, res) => {
//                  expect(res).to.have.status(200);
//                  done();
//                  });
//             })
//      })

// import * as chai from 'chai';
// import * as chaiHttp from 'chai-http';
// import server from "../app.js";

// chai.use(chaiHttp);
// const should = chai.should();

// describe('Node server tests', () => {
//     it("(GET/ ) for the main page!", (done) => {
//         chai.request(server)
//             .get('/')
//             .end((err, res) => {
//                 res.should.have.status(200); // Durum kodu 200'ü kontrol et
//                 done();
//             });
//     });
// });
