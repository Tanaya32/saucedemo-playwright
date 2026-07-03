export const CUSTOMER = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
} as const;

export interface CheckoutValidationScenario {
  description: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  expectedError: string;
}

export const checkoutValidationScenarios: CheckoutValidationScenario[] = [
  {
    description: 'first name is missing',
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345',
    expectedError: 'Error: First Name is required',
  },
  {
    description: 'last name is missing',
    firstName: 'John',
    lastName: '',
    postalCode: '12345',
    expectedError: 'Error: Last Name is required',
  },
  {
    description: 'postal code is missing',
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
    expectedError: 'Error: Postal Code is required',
  },
];