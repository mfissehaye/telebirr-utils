import { JSDOM } from 'jsdom'
import { TelebirrReceipt } from './types'
import { 
  findValueByPartialLabel, 
  findValueInInvoiceTable, 
  findValueInPaymentTable 
} from './extractors'
import { fetchTelebirrReceipt, FetchOptions } from './fetcher'

/**
 * Extracts telebirr receipt data from HTML content
 * @param htmlContent - The HTML content of the telebirr receipt
 * @returns TelebirrReceipt object containing extracted data
 */
export function extractTelebirrReceiptData(htmlContent: string): TelebirrReceipt {
  const dom = new JSDOM(htmlContent)
  const document = dom.window.document

  // Extract data using the exact patterns from the HTML
  const payerName = findValueByPartialLabel(document, 'የከፋይ ስም/Payer Name')
  const payerTelebirrNo = findValueByPartialLabel(document, 'የከፋይ ቴሌብር ቁ./Payer telebirr no.')
  const creditPartyAccountNumber = findValueByPartialLabel(document, 'የገንዘብ ተቀባይ ቴሌብር ቁ./Credited party account no')
  const totalPaidAmount = findValueByPartialLabel(document, 'ጠቅላላ የተከፈለ/Total Paid Amount')
  const paymentReason = findValueByPartialLabel(document, 'የክፍያ ምክንያት/Payment Reason')
  const paymentChannel = findValueInPaymentTable(document, 'የክፍያ መንገድ/Payment channel')

  // For invoice details table (different structure - headers in one row, values in next row)
  const invoiceNumber = findValueInInvoiceTable(document, 'የክፍያ ቁጥር/Invoice No.')
  const paymentDate = findValueInInvoiceTable(document, 'የክፍያ ቀን/Payment date')

  return {
    creditPartyAccountNumber,
    payerTelebirrNo,
    payerName,
    paymentDate,
    totalPaidAmount,
    invoiceNumber,
    paymentChannel,
    paymentReason
  }
}

/**
 * Fetches and extracts telebirr receipt data by transaction reference
 * @param transactionRef - The transaction reference number
 * @param options - Fetch options including mock configuration
 * @returns Promise<TelebirrReceipt> - Object containing extracted data
 */
export async function getTelebirrReceipt(transactionRef: string, options: FetchOptions = {}): Promise<TelebirrReceipt> {
  const htmlContent = await fetchTelebirrReceipt(transactionRef, options)
  return extractTelebirrReceiptData(htmlContent)
}

export default extractTelebirrReceiptData 