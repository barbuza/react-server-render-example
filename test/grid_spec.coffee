{test, makeDriver, expect, assert} = require "./client"

describe "grid on index page", ->

  [driver, sleep, $] = [null, null, null]

  before -> {driver, $, sleep} = makeDriver("http://react-example.herokuapp.com")

  after -> driver.quit()

  it "should have title", ->
    expect(driver.getTitle()).to.eventually.equal("node render")

  it "should have grid", ->
    expect(".grid").dom.to.be.visible()

  it "should have 3 items", ->
    expect(".grid .gridItem").dom.to.have.count(3)

  it "should not show rate helper by default", ->
    $(".grid h1:first").mouseMove()
    sleep 1000
    expect(".grid .gridItemRate").dom.to.have.count(0)

  it "should show rate helper on hover", ->
    $(".grid .gridItem:first").mouseMove()
    sleep 100
    expect(".grid .gridItem:first .gridItemRate").dom.to.be.visible()

    $(".grid .gridItem:nth-child(2)").mouseMove()
    sleep 1000
    expect(".grid .gridItem:first .gridItemRate").dom.to.have.count(0)

  it "should highlight rate helper stars on hover", ->
    $(".grid .gridItem:nth-child(3)").mouseMove()
    sleep 100

    $(".grid .gridItem:nth-child(3) .gridItemRate span:nth-child(5)").mouseMove()
    sleep 500
    expect(".grid .gridItem:nth-child(3) .gridItemRate .gridItemRateStarActive").dom.to.have.count(5)

    $(".grid .gridItem:nth-child(3) .gridItemRate span:nth-child(3)").mouseMove()
    sleep 500
    expect(".grid .gridItem:nth-child(3) .gridItemRate .gridItemRateStarActive").dom.to.have.count(3)
