import { FinancialData } from "../types/FinancialData.type";

export const saveQuotationToLocalStorage = (quotation: FinancialData) => {
	localStorage.setItem('quotation', JSON.stringify(quotation));
};
  
export const getQuotationFromLocalStorage = (id: string) => {
	const stored = localStorage.getItem('quotation');
	if (!stored) return null;
	const quotation = JSON.parse(stored);

	return quotation.id === id ? quotation : null;
};
  