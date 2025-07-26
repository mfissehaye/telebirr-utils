import fs from 'node:fs'

export interface FetchOptions {
  mock?: boolean
  mockFilePath?: string
}

/**
 * Fetches HTML content from Telebirr transaction API
 * @param transactionRef - The transaction reference number
 * @param options - Fetch options including mock configuration
 * @returns Promise<string> - The HTML content
 */
export async function fetchTelebirrReceipt(transactionRef: string, options: FetchOptions = {}): Promise<string> {
  const { mock = false, mockFilePath = './telebirr.html' } = options

  if (mock) {
    // Return mock HTML content from local file
    try {
      return fs.readFileSync(mockFilePath, 'utf-8')
    } catch (error) {
      throw new Error(`Failed to read mock file: ${mockFilePath}. Error: ${error}`)
    }
  }

  // Fetch from actual API
  const url = `https://transactioninfo.ethiotelecom.et/receipt/${transactionRef}`
  
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const htmlContent = await response.text()
    return htmlContent
  } catch (error) {
    throw new Error(`Failed to fetch receipt from ${url}. Error: ${error}`)
  }
}

export default fetchTelebirrReceipt 