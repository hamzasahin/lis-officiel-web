import { supabase } from '../contexts/supabase';

// Tax rates by state (example rates)
const STATE_TAX_RATES = {
  'AL': 0.04, 'AK': 0.00, 'AZ': 0.056, 'AR': 0.065, 'CA': 0.0725,
  'CO': 0.029, 'CT': 0.0635, 'DE': 0.00, 'FL': 0.06, 'GA': 0.04,
  'HI': 0.04, 'ID': 0.06, 'IL': 0.0625, 'IN': 0.07, 'IA': 0.06,
  'KS': 0.065, 'KY': 0.06, 'LA': 0.0445, 'ME': 0.055, 'MD': 0.06,
  'MA': 0.0625, 'MI': 0.06, 'MN': 0.06875, 'MS': 0.07, 'MO': 0.04225,
  'MT': 0.00, 'NE': 0.055, 'NV': 0.0685, 'NH': 0.00, 'NJ': 0.06625,
  'NM': 0.05125, 'NY': 0.04, 'NC': 0.0475, 'ND': 0.05, 'OH': 0.0575,
  'OK': 0.045, 'OR': 0.00, 'PA': 0.06, 'RI': 0.07, 'SC': 0.06,
  'SD': 0.045, 'TN': 0.07, 'TX': 0.0625, 'UT': 0.061, 'VT': 0.06,
  'VA': 0.053, 'WA': 0.065, 'WV': 0.06, 'WI': 0.05, 'WY': 0.04
};

// Special tax rates for luxury items (additional tax)
const LUXURY_TAX_RATE = 0.03;

// Price threshold for luxury items
const LUXURY_THRESHOLD = 1000;

export class TaxService {
  static async calculateTax(orderDetails) {
    try {
      const { items, shipping } = orderDetails;
      const state = shipping.state.toUpperCase();
      
      // Get base state tax rate
      const stateTaxRate = STATE_TAX_RATES[state] || 0;
      
      // Calculate tax for each item
      const itemTaxes = items.map(item => {
        const basePrice = item.price * item.quantity;
        const stateTax = basePrice * stateTaxRate;
        
        // Apply luxury tax if applicable
        const luxuryTax = item.price >= LUXURY_THRESHOLD ? 
          basePrice * LUXURY_TAX_RATE : 0;
        
        return {
          itemId: item.id,
          name: item.name,
          basePrice,
          stateTax,
          luxuryTax,
          totalTax: stateTax + luxuryTax
        };
      });

      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const totalStateTax = itemTaxes.reduce((sum, item) => sum + item.stateTax, 0);
      const totalLuxuryTax = itemTaxes.reduce((sum, item) => sum + item.luxuryTax, 0);
      const totalTax = totalStateTax + totalLuxuryTax;

      // Get tax breakdown from tax API for verification (if available)
      try {
        const { data: taxApiData, error } = await supabase.functions.invoke('calculate-tax', {
          body: {
            items: items.map(item => ({
              price: item.price,
              quantity: item.quantity,
              type: item.type
            })),
            shipping_address: shipping
          }
        });

        if (!error && taxApiData) {
          // Use the more accurate tax calculation from the API if available
          return {
            ...taxApiData,
            calculationMethod: 'api'
          };
        }
      } catch (error) {
        console.warn('Tax API unavailable, using local calculation:', error);
      }

      // Return local calculation if API is unavailable
      return {
        items: itemTaxes,
        summary: {
          subtotal,
          stateTax: totalStateTax,
          luxuryTax: totalLuxuryTax,
          totalTax,
          total: subtotal + totalTax
        },
        taxRates: {
          state: stateTaxRate,
          luxury: LUXURY_TAX_RATE
        },
        calculationMethod: 'local'
      };
    } catch (error) {
      console.error('Tax calculation error:', error);
      throw error;
    }
  }

  static isTaxExempt(orderDetails) {
    // Check for tax-exempt states
    const taxExemptStates = ['AK', 'DE', 'MT', 'NH', 'OR'];
    return taxExemptStates.includes(orderDetails.shipping.state.toUpperCase());
  }

  static async validateTaxExemptionCertificate(certificateNumber) {
    try {
      const { data, error } = await supabase.functions.invoke('validate-tax-exemption', {
        body: { certificateNumber }
      });

      if (error) throw error;
      return data.isValid;
    } catch (error) {
      console.error('Tax exemption validation error:', error);
      throw error;
    }
  }

  static getEstimatedTax(subtotal, state) {
    // Quick tax estimation for display purposes
    const stateTaxRate = STATE_TAX_RATES[state.toUpperCase()] || 0;
    const estimatedTax = subtotal * stateTaxRate;
    
    // Add estimated luxury tax if applicable
    const luxuryTax = subtotal >= LUXURY_THRESHOLD ? subtotal * LUXURY_TAX_RATE : 0;
    
    return {
      estimatedTax: estimatedTax + luxuryTax,
      breakdown: {
        stateTax: estimatedTax,
        luxuryTax
      }
    };
  }
} 