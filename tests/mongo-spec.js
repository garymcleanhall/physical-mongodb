'use strict';

const physical = {
  mongodb: require('../index')
}

function testAsync(runAsync) {
  return done => {
    runAsync()
      .then(done, error => {
        fail(error)
        done()
      })
  }
}

describe('Physical MongoDB', () => {

  it('is not ok when cannot connect to mongo db', testAsync(async () => {
    let connectionString = "mongodb://localhost:6666/_test"
    let mongoResult = await physical.mongodb.check(connectionString)
    expect(mongoResult.isOk).toBe(false)
  }))

  it('includes error message when cannot connect to mongo db', testAsync(async () => {
    let connectionString = "mongodb://localhost:6666/_test"
    let mongoResult = await physical.mongodb.check(connectionString)
    expect(mongoResult.error).toBeDefined()
  }))

  it('is ok when can connect to mongo db', testAsync(async () => {
    let connectionString = "mongodb://localhost:27017/_test"
    let mongoResult = await physical.mongodb.check(connectionString)
    expect(mongoResult.isOk).toBe(true)
  }))

})