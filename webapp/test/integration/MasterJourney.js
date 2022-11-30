sap.ui.define(['sap/ui/test/opaQunit', './pages/Master'], function (e) {
  'use strict'
  QUnit.module('Master List')
  e('Should see the master list with all entries', function (e, t, i) {
    e.iStartMyApp()
    i.onTheMasterPage
      .iShouldSeeTheList()
      .and.theListShouldHaveAllEntries()
      .and.theHeaderShouldDisplayAllEntries()
  })
  e(
    'Search for the First object should deliver results that contain the firstObject in the name',
    function (e, t, i) {
      var s = 'B'
      t.onTheMasterPage.iSearchFor(s)
      i.onTheMasterPage.theListShowsOnlyObjectsContaining(s)
    }
  )
  e(
    "Entering something that cannot be found into search field and pressing search field's refresh should leave the list as it was",
    function (e, t, i) {
      t.onTheMasterPage.iSearchForNotFound().and.iClearTheSearch()
      i.onTheMasterPage.theListHasEntries()
    }
  )
  e(
    "Entering something that cannot be found into search field and pressing 'search' should display the list's 'not found' message",
    function (e, t, i) {
      t.onTheMasterPage.iSearchForNotFound()
      i.onTheMasterPage
        .iShouldSeeTheNoDataText()
        .and.theListHeaderDisplaysZeroHits()
    }
  )
  e(
    'Should display items again if the searchfield is emptied',
    function (e, t, i) {
      t.onTheMasterPage.iClearTheSearch()
      i.onTheMasterPage.theListShouldHaveAllEntries()
    }
  )
  e('MasterList Filtering on Shipped Orders', function (e, t, i) {
    t.onTheMasterPage.iFilterTheListOn('masterFilterShipped')
    i.onTheMasterPage.theListShouldBeFilteredOnShippedOrders()
  })
  e('MasterList remove filter should display all items', function (e, t, i) {
    t.onTheMasterPage.iResetFilters()
    i.onTheMasterPage.theListShouldHaveAllEntries()
  })
  e('MasterList grouping created group headers', function (e, t, i) {
    t.onTheMasterPage.iGroupTheList()
    i.onTheMasterPage.theListShouldContainAGroupHeader()
  })
  e(
    'Remove grouping from MasterList delivers initial list',
    function (e, t, i) {
      t.onTheMasterPage.iResetGrouping()
      i.onTheMasterPage
        .theListShouldNotContainGroupHeaders()
        .and.theListShouldHaveAllEntries()
      i.iTeardownMyApp()
    }
  )
})
