import { getTelebirrReceipt, extractTelebirrReceiptData, TelebirrReceipt, FetchOptions } from './utils'

// Example usage with mock data
async function main() {
  try {
    // Using mock data for testing (since the API is not reachable)
    const receiptData = await getTelebirrReceipt('CGP5Q3APB5', { 
      mock: true,
      mockFilePath: './telebirr.html'
    })

    console.log('Extracted Telebirr Receipt Data:')
    console.log(JSON.stringify(receiptData, null, 2))
  } catch (error) {
    console.error('Error extracting receipt data:', error)
  }
}

// Run the example
main()

// Export public APIs only
export { getTelebirrReceipt, extractTelebirrReceiptData, TelebirrReceipt, FetchOptions }