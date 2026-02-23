# Playwright TypeScript - eBay Testing Project

A comprehensive Playwright TypeScript automation framework with Page Object Model (POM) for cross-browser testing of eBay.

## 📁 Project Structure
```
playwright-ebay/
├── docs/                   # Documentation files
├── pages/                  # Page Object Model (TypeScript)
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── SearchResultsPage.ts
│   ├── ProductPage.ts
│   └── AdvancedSearchPage.ts
├── tests/                  # Test specifications (TypeScript)
│   └── ebay.spec.ts       # All test cases
├── utils/                  # Utilities and helpers
│   ├── TestHelpers.ts
│   └── testData.ts        # Centralized test data
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

## 📄 Documentation

Comprehensive documentation available in `/Manual documentation` which includes Manual Testing part:
-Q3.Manual Tesing - Test Suite.xlsx
-QA Skills Assessment - Manual tesing.pdf


## ✨ Features
- **TypeScript** - Type safety and better IDE support
- **Page Object Model** - Maintainable test architecture
- **Cross-Browser Testing** - Chromium, Firefox, WebKit
- **Independent Tests** - Each test runs independently
- **Centralized Test Data** - Easy data management
- **Before/After Hooks** - Setup and teardown
- **HTML Reports** - Screenshots and videos on failure
- **Retry Mechanism** - Handles flaky tests

## 🚀 Installation

### Prerequisites
- Node.js 16+
- npm

### Setup
```bash
cd playwright-ebay
npm install
npx playwright install
```

## 🧪 Running Tests

### Basic Commands
```bash
# Run all tests (headless)
npm test

# Run in headed mode
npm run test:headed
npx playwright test --headed

# Run in debug mode
npm run test:debug
```

### Browser-Specific
```bash
# Run on specific browser
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Run specific browser in headed mode
npx playwright test --project=chromium --headed
```

### Test File Execution
```bash
# Run specific test file
npx playwright test tests/ebay.spec.ts

# Run specific test by name
npx playwright test -g "should load eBay home page"
```

### View Reports
```bash
npm run report
```

## 🌐 Cross-Browser Configuration

Configured browsers:
- **Chromium** - Runs in headed mode
- **Firefox** - Runs headless
- **WebKit** - Runs headless

Modify `playwright.config.ts` to change browser settings.

## 📊 Test Data Management

Centralized test data in `utils/testData.ts`:

```typescript
import { testData } from '../utils/testData';

// Usage in tests
await homePage.searchProduct(testData.searchKeywords.laptop);
```

## 🧩 Page Objects

### BasePage
Common methods: navigate, click, fill, getText, isVisible, waitForSelector

### HomePage
Search functionality, navigation, category selection

### SearchResultsPage
View results, get titles/prices, filter options

### ProductPage
Product details, add to cart, seller information

### AdvancedSearchPage
Keyword search, price range, exclude words

## ⚙️ Configuration

### Sequential Execution (One Browser)
```typescript
// playwright.config.ts
workers: 1,
fullyParallel: false,
```

### Parallel Execution
```typescript
// playwright.config.ts
workers: undefined,
fullyParallel: true,
```

## 📈 Reports
- **HTML Report**: `playwright-report/index.html`
- **JSON Report**: `test-results.json`
- **Screenshots**: Captured on failure
- **Videos**: Retained on failure
- **Traces**: Available on first retry

## 🔧 Utilities

### TestHelpers
- `generateRandomString(length)`
- `generateRandomNumber(min, max)`
- `takeScreenshot(page, name)`
- `waitForPageLoad(page)`
- `formatPrice(price)`

## 📝 Test Hooks

```typescript
test.beforeAll() - Runs once before all tests
test.afterAll() - Runs once after all tests
test.beforeEach() - Runs before each test
```

## 🎯 TypeScript Benefits
- Type safety for page objects and methods
- Better IDE autocomplete
- Compile-time error detection
- Improved maintainability

## 📚 Resources
- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
