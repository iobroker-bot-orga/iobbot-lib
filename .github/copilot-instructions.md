# ioBroker Bot Library

ioBroker Bot Library is a Node.js library that provides tools for accessing ioBroker adapter data from external repositories. It fetches adapter information from live ioBroker repositories and provides utilities for extracting and processing adapter metadata.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Initial Setup and Dependencies
- Ensure Node.js 18+ is available: `node --version` (current environment should show v20+)
- Install dependencies: `npm install` -- takes ~12 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- Verify installation: `npm run test:package` -- takes <1 second

### Build and Validation
- Run linting: `npm run lint` -- takes <1 second. NEVER CANCEL. Set timeout to 30+ seconds.
- Test package functionality: `npm run test:package` -- takes <1 second. Outputs "module has been loaded successfully"
- No traditional unit tests exist; manual testing required for validation

### Development Workflow
- Always run `npm run lint` before committing changes or the CI (.github/workflows/test-and-release.yml) will fail
- The main CI workflow uses `ioBroker/testing-action-check@v1` which runs linting
- Code must pass ESLint validation with the configuration in `.eslintrc.json`

## Library Functionality

### Core Functions Available
1. `extractAdapterName(url)` - Extracts adapter name from GitHub URL (offline function)
2. `getLatestRepoLive()` - Fetches latest repository data from repo.iobroker.live (requires network)
3. `getStableRepoLive()` - Fetches stable repository data from repo.iobroker.live (requires network)
4. `getLatestAdapters()` - Processes latest adapters with metadata (requires network)
5. `getStableAdapters()` - Processes stable adapters with metadata (requires network)
6. `getAdapterUrls(adapters)` - Extracts GitHub URLs from adapter objects

### Network Dependencies
- Functions requiring network access will fail without internet connectivity to `repo.iobroker.live`
- Network functions fetch JSON data from:
  - Latest: `http://repo.iobroker.live/sources-dist-latest.json`
  - Stable: `http://repo.iobroker.live/sources-dist.json`
- Results are cached in context objects to avoid repeated network calls

## Validation

### Manual Testing Process
- ALWAYS manually test changes by running: `node index.js`
- For offline testing, use the `extractAdapterName` function with test URLs
- For network testing, use any of the `get*` functions (requires internet access)
- Test adapter name extraction with URLs like: `https://github.com/user/ioBroker.adaptername`

### Validation Scenarios
- Basic library loading: Run `node index.js` and verify "module has been loaded successfully"
- Function export verification: Test `require('./index.js').extractAdapterName` exists
- URL parsing: Test with format `https://github.com/user/ioBroker.adaptername`
- Network functions: Test in environments with internet access to repo.iobroker.live

## Network Limitations
- In sandboxed environments without internet access, only `extractAdapterName` can be fully tested
- Network-dependent functions will throw "ENOTFOUND repo.iobroker.live" errors without connectivity
- For development, mock data or offline testing strategies may be needed

## Common Tasks

### Available npm Scripts
```bash
npm run test:package  # Run basic package test (node index.js)
npm run lint         # Run ESLint validation
npm run release      # Run release process (requires setup)
```

### Repository Structure
```
/home/runner/work/iobbot-lib/iobbot-lib/
├── .github/                    # GitHub workflows and configuration
│   ├── workflows/
│   │   ├── test-and-release.yml   # Main CI/CD pipeline
│   │   ├── codeql.yml             # Security scanning
│   │   └── dependabot-auto-merge.yml
├── lib/                        # Core library code
│   ├── iobrokerTools.js           # Main adapter processing functions
│   └── iobrokerRepositories.js   # Repository data fetching
├── index.js                    # Main entry point and exports
├── package.json               # Dependencies and scripts
├── .eslintrc.json            # ESLint configuration
└── README.md                 # Basic project documentation
```

### Key Dependencies
- `axios ^1.7.9` - HTTP client for repository data fetching
- `eslint ^8.57.0` - Code linting and style enforcement
- Node.js 18+ required (configured in package.json engines)

### Development Guidelines
- Follow ESLint rules defined in `.eslintrc.json`
- Use single quotes for strings, semicolons required
- 4-space indentation
- No console.log restrictions (library uses console output)
- Use `'use strict';` directive in all files

## Testing Commands That Work
```bash
# Basic setup (always run first)
npm install                    # ~12 seconds

# Validation commands
npm run lint                   # <1 second
npm run test:package          # <1 second

# Manual testing
node index.js                 # Basic library load test
node -e "console.log(require('./index.js').extractAdapterName('https://github.com/user/ioBroker.test'))"  # Test specific function
```

## Testing Commands That Require Network
```bash
# These will fail in network-isolated environments
node -e "require('./index.js').getLatestRepoLive().then(d => console.log(Object.keys(d).length))"
node -e "require('./index.js').getStableRepoLive().then(d => console.log(Object.keys(d).length))"
```

## Expected Timings
- npm install: 12 seconds - NEVER CANCEL, set timeout to 60+ seconds
- npm run lint: <1 second - NEVER CANCEL, set timeout to 30+ seconds  
- npm run test:package: <1 second
- Library function calls: <1 second (offline), variable for network calls
- CI pipeline: Uses standard ioBroker testing actions, typically 2-5 minutes

## Environment Requirements
- Node.js 18+ (package.json engines field)
- npm 8+ recommended
- Internet access for live repository data (optional for basic development)
- Unix-like environment preferred (tested on Ubuntu in CI)