import { getTelebirrReceipt, extractTelebirrReceiptData } from '../src'
import fs from 'fs'

async function demonstrateUsage() {
  console.log('=== Telebirr Receipt Extractor Examples ===\n')

  try {
    // Example 1: Using mock mode (for testing)
    console.log('1. Using mock mode:')
    const mockReceipt = await getTelebirrReceipt('CGP5Q3APB5', { 
      mock: true,
      mockFilePath: './telebirr.html'
    })
    console.log('   Invoice Number:', mockReceipt.invoiceNumber)
    console.log('   Payer Name:', mockReceipt.payerName)
    console.log('   Amount:', mockReceipt.totalPaidAmount)
    console.log()

    // Example 2: Direct HTML processing
    console.log('2. Direct HTML processing:')
    const htmlContent = fs.readFileSync('./telebirr.html', 'utf-8')
    const directReceipt = extractTelebirrReceiptData(htmlContent)
    console.log('   Payment Date:', directReceipt.paymentDate)
    console.log('   Payment Channel:', directReceipt.paymentChannel)
    console.log()

    // Example 3: Real API call (commented out since API is not reachable)
    console.log('3. Real API call (commented out):')
    console.log('   // const realReceipt = await getTelebirrReceipt("CGP5Q3APB5")')
    console.log('   // This would fetch from: https://transactioninfo.ethiotelecom.et/receipt/CGP5Q3APB5')
    console.log()

    console.log('=== All extracted data ===')
    console.log(JSON.stringify(mockReceipt, null, 2))

  } catch (error) {
    console.error('Error:', error)
  }
}

// Run the examples
demonstrateUsage() 