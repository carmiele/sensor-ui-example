# Sensor UI Example

This is a sample dashboard to display a a basic list of sensors of one type (temperature, at this moment), the data of which is stored locally in this repo. This contains both the API endpoints to read/write the data to the file, as well as the UI to display and interact this data. This currently only supports one type of sensor (temperature), but the application is designed to support many in the future.

Stack Used:
- UI Framework and API - Next.js 13 (min Node version: 14.18.0)
- Language - Typescript
- Form Library - `react-hook-form`
- Database - JSON file (`/json/---.json`)
- Styling - Tailwind CSS
- Testing - Jest

### Next Steps to implement:
- Actual database to persist the data (possibly SQL)
- Ability to search/filter for multiple terms for each input field
- Support for multiple types of sensors - filtering, listing, etc.
- Ability to add a whole new sensor, with CREATE/UPDATE/DELETE for each sensor itself, not just its metadata
- Support for more complex input group logic. Current app supports simple fields with no dependencies on other fields, and one type of grouping.

## Getting Started

To run the app locally:

```
npm install
npm run dev
```

You should now be able to access the application at http://localhost:3000/dashboard.

To run tests locally:

```
npm run test
```

To build for production:

```
npm run build
```