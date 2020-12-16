const enhancer = require('./enhancer.js');

// test away!
describe('sanity check', () => {
  it('works', () => {
      expect(2 + 2).toBe(4)
  })
  it('everything working', () => {
      expect({}).not.toBe({})
      expect({}).toEqual({})
  })
})
describe('functions are available', () => {
  it('success function exists', () => {
    expect(enhancer.success).toBeDefined()
  })
  it('fail function exists', () => {
    expect(enhancer.fail).toBeDefined()
  })
  it('repair function exists', () => {
    expect(enhancer.repair).toBeDefined()
  })
  it('get function exists', () => {
    expect(enhancer.get).toBeDefined()
  })
})

describe("repair an item", () => {
  let item, item2
  beforeEach(() => {
    item = {
      name: "bagel",
      durability: 70,
      enhancement: 16
    }
    item2 = {
      name: "tim",
      durability: 55,
      enhancement: 16
    }
  })
  it("repair function run on item", () => {
    expect(enhancer.repair(item)).toEqual({
      name: "bagel",
      durability: 100,
      enhancement: 16
    })
  })
  it("repair function run on item", () => {
    expect(enhancer.repair(item2)).toEqual({
      name: "tim",
      durability: 100,
      enhancement: 16
    })
  })
})

describe("succeed at enhancement increase", () => {
  let item, item2
  beforeEach(() => {
    item = {
      name: "bagel",
      durability: 70,
      enhancement: 16
    }
    item2 = {
      name: "tim",
      durability: 55,
      enhancement: 20
    }
  })
  it("increase durability", () => {
    expect(enhancer.success(item)).toEqual({
      name: "bagel",
      durability: 70,
      enhancement: 17
    })
  })
  it("do not increase durability because it is already 20", () => {
    expect(enhancer.success(item2)).toEqual({
      name: "tim",
      durability: 55,
      enhancement: 20
    })
  })
})

describe("failed at enhancement increase", () => {
  let item, item2, item3
  beforeEach(() => {
    item = {
      name: "bagel",
      durability: 50,
      enhancement: 13
    }
    item2 = {
      name: "tim",
      durability: 70,
      enhancement: 16
    }
    item3 = {
      name: "mike",
      durability: 30,
      enhancement: 18
    }
  })
  it("fail with enhancement below 15", () => {
    expect(enhancer.fail(item)).toEqual({
      name: "bagel",
      durability: 45,
      enhancement: 13
    })
  })
  it("fail with enhancement at 16", () => {
    expect(enhancer.fail(item2)).toEqual({
      name: "tim",
      durability: 60,
      enhancement: 16
    })
  })
  it("fail with enhancement over 16", () => {
    expect(enhancer.fail(item3)).toEqual({
      name: "mike",
      durability: 20,
      enhancement: 17
    })
  })
})