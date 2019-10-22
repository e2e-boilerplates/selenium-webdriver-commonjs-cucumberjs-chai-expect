Feature: Search-key should be included in the title of a search-result page.
  I want to see my search-key included in the title of the search-result page.

  Scenario: Finding some cheese
    Given I am on the Google search page
    When I search for "Cheese!"
    Then the page title should start with "Cheese!"
