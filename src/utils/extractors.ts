import { JSDOM } from 'jsdom'

/**
 * Helper function to find value by partial label text
 */
export function findValueByPartialLabel(document: JSDOM['window']['document'], labelText: string): string {
  const allTds = document.querySelectorAll('td')
  for (let i = 0; i < allTds.length; i++) {
    const td = allTds[i]
    const text = td.textContent?.trim()
    if (text && text.includes(labelText)) {
      // Get the next sibling td that contains the value
      const nextTd = allTds[i + 1]
      if (nextTd) {
        const value = nextTd.textContent?.trim() || ''
        // Make sure we're not returning the label itself
        if (value && value !== text && !value.includes('/')) {
          return value
        }
      }
    }
  }
  return ''
}

/**
 * Helper function to find value in the invoice details table (3-column structure)
 */
export function findValueInInvoiceTable(document: JSDOM['window']['document'], labelText: string): string {
  const allTds = document.querySelectorAll('td')
  for (let i = 0; i < allTds.length; i++) {
    const td = allTds[i]
    const text = td.textContent?.trim()
    if (text === labelText) {
      // Find the corresponding value in the next row, same column position
      const row = td.closest('tr')
      if (row && row.nextElementSibling) {
        const nextRow = row.nextElementSibling
        const cells = nextRow.querySelectorAll('td')
        // Find the cell at the same position as the label
        const labelIndex = Array.from(row.querySelectorAll('td')).indexOf(td)
        if (labelIndex >= 0 && cells[labelIndex]) {
          return cells[labelIndex].textContent?.trim() || ''
        }
      }
    }
  }
  return ''
}

/**
 * Helper function to find value in the payment details table (exact match)
 */
export function findValueInPaymentTable(document: JSDOM['window']['document'], labelText: string): string {
  const allTds = document.querySelectorAll('td')
  for (let i = 0; i < allTds.length; i++) {
    const td = allTds[i]
    const text = td.textContent?.trim()
    if (text === labelText) {
      // Get the next sibling td that contains the value
      const nextTd = allTds[i + 1]
      if (nextTd) {
        const value = nextTd.textContent?.trim() || ''
        // Make sure we're not returning the label itself
        if (value && value !== text) {
          return value
        }
      }
    }
  }
  return ''
}

export default {
  findValueByPartialLabel,
  findValueInInvoiceTable,
  findValueInPaymentTable
} 