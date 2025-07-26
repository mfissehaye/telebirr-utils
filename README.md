# Telebirr Receipt Extractor

A TypeScript library for extracting transaction data from Telebirr receipt HTML files using jsdom. Supports both local HTML files and fetching from the Telebirr API.

## Features

- Extract transaction details from Telebirr receipt HTML
- Fetch receipts directly from Telebirr API using transaction references
- Mock mode for testing and development
- Type-safe TypeScript implementation
- Modular architecture with separate utility functions
- Support for different HTML table structures

## Installation

```bash
npm install
```

## Usage

### Basic Usage with Transaction Reference

```typescript
import { getTelebirrReceipt } from './src'

// Fetch and extract data from Telebirr API
const receiptData = await getTelebirrReceipt('CGP5Q3APB5')

console.log(receiptData)
```

### Using Mock Mode (for testing)

```typescript
import { getTelebirrReceipt } from './src'

// Use mock data for testing (since API might not be reachable)
const receiptData = await getTelebirrReceipt('CGP5Q3APB5', { 
  mock: true,
  mockFilePath: './telebirr.html'
})

console.log(receiptData)
```

### Direct HTML Processing

```typescript
import { extractTelebirrReceiptData } from './src'
import fs from 'fs'

// Read HTML file and extract data
const htmlContent = fs.readFileSync('./telebirr.html', 'utf-8')
const receiptData = extractTelebirrReceiptData(htmlContent)

console.log(receiptData)
```

### Fetch Options

The `getTelebirrReceipt` function accepts an optional `FetchOptions` object:

```typescript
interface FetchOptions {
  mock?: boolean        // Use mock data instead of fetching from API
  mockFilePath?: string // Path to mock HTML file (default: './telebirr.html')
}
```

## Available Data Fields

The extractor returns a `TelebirrReceipt` object with the following fields:

- `creditPartyAccountNumber`: The credited party's account number
- `payerTelebirrNo`: The payer's Telebirr number (masked)
- `payerName`: The payer's full name
- `paymentDate`: The payment date and time
- `totalPaidAmount`: The total amount paid
- `invoiceNumber`: The invoice/receipt number
- `paymentChannel`: The payment channel used
- `paymentReason`: The reason for the payment

## Project Structure

```
src/
├── index.ts                 # Main entry point and public API exports
├── utils/
│   ├── index.ts            # Utils module exports
│   ├── types.ts            # TypeScript interfaces and types
│   ├── extractors.ts       # Helper functions for HTML extraction
│   ├── fetcher.ts          # HTTP fetching and mock functionality
│   └── telebirrExtractor.ts # Main extraction logic
```

## API Reference

### `getTelebirrReceipt(transactionRef: string, options?: FetchOptions): Promise<TelebirrReceipt>`

Fetches and extracts transaction data from Telebirr API using a transaction reference.

**Parameters:**
- `transactionRef` (string): The transaction reference number
- `options` (FetchOptions, optional): Fetch configuration including mock settings

**Returns:**
- `Promise<TelebirrReceipt>`: Promise resolving to object containing extracted transaction data

### `extractTelebirrReceiptData(htmlContent: string): TelebirrReceipt`

Extracts transaction data from Telebirr receipt HTML content.

**Parameters:**
- `htmlContent` (string): The HTML content of the Telebirr receipt

**Returns:**
- `TelebirrReceipt`: Object containing extracted transaction data

### `fetchTelebirrReceipt(transactionRef: string, options?: FetchOptions): Promise<string>`

Fetches HTML content from Telebirr transaction API.

**Parameters:**
- `transactionRef` (string): The transaction reference number
- `options` (FetchOptions, optional): Fetch configuration

**Returns:**
- `Promise<string>`: Promise resolving to HTML content

### Utility Functions

#### `findValueByPartialLabel(document, labelText)`
Finds values by partial label text matching.

#### `findValueInInvoiceTable(document, labelText)`
Finds values in the invoice details table (3-column structure).

#### `findValueInPaymentTable(document, labelText)`
Finds values in the payment details table with exact label matching.

## Example Output

```json
{
  "creditPartyAccountNumber": "111222",
  "payerTelebirrNo": "2519****4429",
  "payerName": "Firiat Fisha Gebremeskel",
  "paymentDate": "25-07-2025 13:22:34",
  "totalPaidAmount": "63.00 Birr",
  "invoiceNumber": "CGP5Q3APB5",
  "paymentChannel": "API/App",
  "paymentReason": "CRM Buy Package Mini APP"
}
```

## Development

```bash
# Run the example (uses mock mode)
npx tsx src/index.ts

# Type checking
npx tsc --noEmit
```

## Error Handling

The library includes comprehensive error handling:

- Network errors when fetching from API
- File system errors when reading mock files
- HTML parsing errors
- Missing data fields (returns empty strings)

## License

MIT # Test commit to trigger workflow

## Workflow Fixed Sat Jul 26 07:03:24 PM UTC 2025

## Test workflow without tests Sat Jul 26 07:09:06 PM UTC 2025
